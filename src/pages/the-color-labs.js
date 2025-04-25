import { useState, useEffect } from 'react';
import Image from "next/image";
import metaData from '../files/meta.json';
import colorBubbles from "@/../public/images/extras/color-bubble.webp";
import Head from "next/head";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export default function BrandColorQuiz() {
    
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null);
    const [shakeButton, setShakeButton] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [previousResponse, setPreviousResponse] = useState(null);
    const [score, setScore] = useState(1);
    const [streak, setStreak] = useState(0);
    const [highScore, setHighScore] = useState(0);

    // Function to determine difficulty level based on score
    const getDifficultyLevel = (score) => {
        if (score >= 8) return "hard";
        if (score >= 4 && score <= 7) return "medium";
        return "easy";
    };

    useEffect(() => {
        // Only access localStorage on the client-side (after the component mounts)
        if (typeof window !== 'undefined') {
            const storedHighScore = localStorage.getItem('brandColorQuizHighScoreStreak'); // Changed key
            setHighScore(parseInt(storedHighScore || '0', 10));
        }
    }, []); // Empty dependency array to run only once on mount


    useEffect(() => {
        // Update high score in local storage whenever the streak changes. Highscore = MAX streak!
        if (typeof window !== 'undefined' && streak > highScore) {
            setHighScore(streak);  //High score now tracks the *streak*
            localStorage.setItem('brandColorQuizHighScoreStreak', streak.toString()); //Changed key
        }
    }, [streak, highScore]);



    async function fetchNewQuestion() {
        setIsLoading(true);
        const difficulty = getDifficultyLevel(score);
        let prompt = `
        Create a unique quiz question about colors, ensuring variety in topics related to color psychology, branding, and marketing. Provide 4 answer options, including the correct one. Return ONLY the JSON object, with no extra text. Ensure each response is unique.
        Ask Which, What, When, Where, Why, How, or Other questions about colors.
        Ensure the JSON format follows this structure strictly:  
        {
          "question": "What is the question?",
          "options": [
            { "name": "Answer Name or Explanation", "hex": "#HEXCODE" , "correct": true/false },
            { "name": "Answer Name or Explanation", "hex": "#HEXCODE" , "correct": true/false },
            { "name": "Answer Name or Explanation", "hex": "#HEXCODE" , "correct": true/false },
            { "name": "Answer Name or Explanation", "hex": "#HEXCODE" , "correct": true/false }
          ]
        }
        name should be short and concise, and the question should be easy to understand. the hex value should be a real and relatable Matte, Glossy, Metallic, Satin, Pastel Colors, Neon Colors, Muted Colors, Deep Colors and not a solid based pure color
        `;
        if (previousResponse) {
            prompt += `  Avoid repeating the same or similar questions as in the previous response: ${previousResponse}. the next question should be different from the previous one completely.`;
        }
        prompt += `
         The question should be of ${difficulty}/10 difficulty level.  Focus on questions that align with the difficulty level
        `;
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: prompt
                                    }
                                ]
                            }
                        ],
                    }),
                }
            );
            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }
            const data = await response.json();
            let generatedQuiz = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!generatedQuiz) {
                throw new Error("No quiz data received from API.");
            }
            let parsedQuizData;
            try {
                generatedQuiz = generatedQuiz.trim().replace(/```json|```|\n|\r/g, '').replace(/\s*([:{\[,}])\s*/g, '$1');
                parsedQuizData = JSON.parse(generatedQuiz);
            } catch (parseError) {
                throw new Error("Error parsing JSON: " + parseError.message);
            }
            if (typeof parsedQuizData !== 'object' || parsedQuizData === null || !parsedQuizData.question || !Array.isArray(parsedQuizData.options) || parsedQuizData.options.length !== 4) {
                throw new Error("Invalid quiz data structure.  Missing data or invalid structure.");
            }
            if (!parsedQuizData.options.every(option => typeof option === 'object' && option !== null && typeof option.hex === 'string' && /^#([0-9A-Fa-f]{3}){1,2}$/.test(option.hex))) {
                throw new Error("Invalid quiz data structure. Missing or invalid 'hex' code in all the options. ALL OPTIONS MUST HAVE A HEX VALUE AND FOLLOW FORMAT!");
            }
            setCurrentQuestion(parsedQuizData);
            setPreviousResponse(JSON.stringify(parsedQuizData));
        } catch (error) {
            console.error("Error fetching or processing quiz:", error);
            setCurrentQuestion({
                question: "Oops! Something went wrong. Try again?",
                options: [
                    { name: 'Try Again', hex: '#808080', correct: false },
                    { name: 'Refresh', hex: '#808080', correct: false },
                    { name: 'Check API Key', hex: '#808080', correct: false },
                    { name: 'Contact Support', hex: '#808080', correct: false }
                ]
            });
        } finally {
            setIsLoading(false);
        }
    }

    const customMeta = {
        "title": "Color Game - How well do you know the colors - Comsci: Your Trusted Design & Development Partner",
        "description": "Test your knowledge of colors with our fun quiz! Answer questions about color psychology, branding, and marketing. Challenge yourself and learn more about the fascinating world of colors.",
        "keywords": [
            "color quiz", "color game", "color psychology", "branding quiz", "marketing quiz", "color knowledge", "color trivia"    
        ],
        "robots": "index, follow",
        "author": "Comsci"
      };
    
      const getMetaTags = (metaData, customMeta = {}) => {
        const mergedMeta = { ...metaData, ...customMeta };
        if (customMeta.og) {
          mergedMeta.og = { ...metaData.og, ...customMeta.og }
        }
        if (customMeta.twitter) {
          mergedMeta.twitter = { ...metaData.twitter, ...customMeta.twitter }
        }
        return Object.keys(mergedMeta).map((key) => {
          if (key === "title") {
            return <title key={key}>{mergedMeta[key]}</title>;
          }
    
          if (key === "og" || key === "twitter") {
            return Object.keys(mergedMeta[key]).map((property) => (
              <meta
                key={`${key}:${property}`}
                property={`${key}:${property}`}
                content={mergedMeta[key][property]}
              />
            ));
          }
          return <meta key={key} name={key} content={mergedMeta[key]} />;
        });
      };

    useEffect(() => {
        fetchNewQuestion();
    }, []);

    const handleAnswer = (isCorrect, hex) => {
        setSelectedAnswer(hex);
        setAnswerStatus(isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
            setScore(prevScore => Math.min(10, prevScore + 1));
            setStreak(prevStreak => prevStreak + 1); // Increment streak
        } else {
            setScore(prevScore => Math.max(0, prevScore - 1));
            setStreak(0); // Reset Streak
            setShakeButton(hex);
        }

        // Reset after a short delay
        setTimeout(() => {
            setSelectedAnswer(null);
            setAnswerStatus(null);
            setShakeButton(null);
            fetchNewQuestion();
        }, 2000);
    };

    const getButtonClassName = (option) => {
        let className = 'ui_btn';
        if (selectedAnswer === option.hex) {
            if (option.correct) {
                className += ' correct-answer';
            } else {
                className += ' wrong-answer';
            }
        } else if (answerStatus === 'wrong' && option.correct) {
            className += ' correct-answer';
        }
        if (shakeButton === option.hex) {
            className += ' shake';
        }
        return className;
    };

    if (isLoading) {
        return (
            <div className="quiz-wrapper">
                <div className="quiz-container">
                    <div className="quiz-content">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <Image src={colorBubbles} alt="Color Quiz" width={160} height={130} quality={100} className="quiz-logo" />
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentQuestion || !currentQuestion.question || !currentQuestion.options || currentQuestion.options.length !== 4) {
        return (
            <div className="quiz-wrapper">
                <div className="quiz-container">
                    <div className="quiz-content">
                        <p>Failed to load quiz. Check the console for errors and the API response format.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
              <Head>
        {getMetaTags(metaData, customMeta)}
      </Head>
        <div className="quiz-wrapper">
            <div className="quiz-container">
                <Image src={colorBubbles} alt="Color Quiz" width={160} height={130} quality={100} className="quiz-logo" />
                <div className="quiz-content">
                   <h3 className="quiz-title">
                    QUESTION -  Streak: {streak} | High Score: {highScore}
                  </h3>
                    <h2 className="quiz-question">{currentQuestion.question}</h2>
                    <div className="quiz-options">
                        <h3 className="quiz-title">SELECT THE CORRECT OPTION</h3>
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.correct, option.hex)}
                                className={getButtonClassName(option)}
                            >
                                <span className="color-dot" style={{ backgroundColor: option.hex }}></span>
                                {option.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}