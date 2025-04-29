import { useState, useEffect } from 'react';
import Image from "next/image";
import metaData from '../../files/meta.json'; // Assuming path
import quizQuestionsData from '../../files/other/colorquiz.json'; // <-- Renamed and used as primary source
import colorBubbles from "@/../public/images/extras/color-bubble.webp";
import Head from "next/head";

// No need for API key anymore
// const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export default function BrandColorQuiz() {

    // ... (state variables remain the same) ...
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null);
    const [shakeButton, setShakeButton] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // No need for previousResponse state as we're picking from a static list
    // const [previousResponse, setPreviousResponse] = useState(null);
    const [score, setScore] = useState(1); // Still track score, though difficulty isn't used for selecting JSON Q
    const [streak, setStreak] = useState(0);
    const [highScore, setHighScore] = useState(0);

    // Function to determine difficulty level based on score (kept for display or future use, but not used to fetch JSON)
    const getDifficultyLevel = (score) => {
        if (score >= 8) return "hard";
        if (score >= 4 && score <= 7) return "medium";
        return "easy";
    };

    // --- Local Storage Effects (remain the same) ---
    useEffect(() => {
        // Only access localStorage on the client-side (after the component mounts)
        if (typeof window !== 'undefined') {
            const storedHighScore = localStorage.getItem('brandColorQuizHighScoreStreak');
            setHighScore(parseInt(storedHighScore || '0', 10));
        }
    }, []);

    useEffect(() => {
        // Update high score in local storage whenever the streak changes. Highscore = MAX streak!
        if (typeof window !== 'undefined' && streak > highScore) {
            setHighScore(streak);
            localStorage.setItem('brandColorQuizHighScoreStreak', streak.toString());
        }
    }, [streak, highScore]);


    // --- Function to Fetch Question from JSON ---
    async function fetchNewQuestion() { // async is okay, although not strictly needed for sync file read
        setIsLoading(true);

        try {
            console.log("Attempting to load question from local JSON...");

            if (!Array.isArray(quizQuestionsData) || quizQuestionsData.length === 0) {
                console.error("Local quiz questions data is missing or empty.");
                // Throw to the catch block
                throw new Error("No quiz questions available in the local file.");
            }

            // Select a random question from the array
            const randomIndex = Math.floor(Math.random() * quizQuestionsData.length);
            const questionData = quizQuestionsData[randomIndex];

            // Basic Validation for selected JSON structure
            if (
                typeof questionData !== 'object' || questionData === null ||
                !questionData.question ||
                !Array.isArray(questionData.options) || questionData.options.length !== 4 ||
                 !questionData.options.every(option =>
                    typeof option === 'object' && option !== null &&
                    typeof option.hex === 'string' && /^#([0-9A-Fa-f]{3}){1,2}$/.test(option.hex) && // Basic HEX format check
                    typeof option.name === 'string' && // Ensure name is a string
                    typeof option.correct === 'boolean' // Ensure correct is boolean
                )
            ) {
                 console.error("Selected local quiz question has invalid structure:", questionData);
                 throw new Error("Invalid structure in local quiz question data.");
            }

            console.log("Successfully loaded question from JSON:", questionData.question);
            setCurrentQuestion(questionData);

        } catch (error) {
            // Handle errors during JSON loading or processing
            console.error("Error loading or processing local quiz data:", error);

            setCurrentQuestion({
                question: "Couldn't load the quiz questions right now. Please check the data file.",
                options: [
                     { name: 'Data Error', hex: '#cccccc', correct: false },
                    { name: 'File Missing', hex: '#cccccc', correct: false },
                    { name: 'Parse Failed', hex: '#cccccc', correct: false },
                     { name: 'Try Reload', hex: '#cccccc', correct: false }
                ]
            });
        } finally {
            setIsLoading(false);
        }
    }

    // --- Meta Tags Logic (remain the same) ---
      const customMeta = {
        "title": "Color Game - How well do you know the colors - Comsci: Your Trusted Design & Development Partner",
        "description": "Test your knowledge of colors with our fun quiz! Answer questions about color psychology, branding, and marketing. Challenge yourself and learn more about the fascinating world of colors.",
        "keywords": [
            "color quiz", "color game", "color psychology", "branding quiz", "marketing quiz", "color knowledge", "color trivia", "free online quiz" // Added "free online quiz"
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


    // --- Initial Fetch Effect (remain the same, just calls the new function) ---
    useEffect(() => {
        fetchNewQuestion();
    }, []);

    // --- Answer Handling Logic (remain the same) ---
    const handleAnswer = (isCorrect, hex) => {
        // Prevent selecting multiple answers while waiting
        if (selectedAnswer !== null) return;

        setSelectedAnswer(hex);
        setAnswerStatus(isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
            setScore(prevScore => Math.min(10, prevScore + 1)); // Cap score at 10
            setStreak(prevStreak => prevStreak + 1);
        } else {
            setScore(prevScore => Math.max(0, prevScore - 1)); // Minimum score 0
            setStreak(0);
            setShakeButton(hex);
        }

        // Reset after a short delay and fetch the next question
        const nextQuestionDelay = isCorrect ? 1500 : 2500; // Slightly longer delays for clarity
        setTimeout(() => {
            setSelectedAnswer(null);
            setAnswerStatus(null);
            setShakeButton(null);
            fetchNewQuestion(); // Fetch the next question from JSON
        }, nextQuestionDelay);
    };

    // --- Button Class Name Logic (remain the same, includes disabled state) ---
    const getButtonClassName = (option) => {
        let className = 'ui_btn';
         if (selectedAnswer !== null) {
            className += ' disabled';
         }

        if (selectedAnswer === option.hex) {
            if (option.correct) {
                className += ' correct-answer';
            } else {
                className += ' wrong-answer';
            }
        } else if (answerStatus === 'wrong' && option.correct) {
            className += ' correct-answer'; // Highlight correct answer when user was wrong
        }

         if (shakeButton === option.hex) {
             className += ' shake';
         }

        return className;
    };

    // --- Loading State Render ---
    if (isLoading) {
        return (
            <div className="quiz-wrapper">
                <div className="quiz-container">
                    <div className="quiz-content">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <Image src={colorBubbles} alt="Color Quiz" width={160} height={130} quality={100} className="quiz-logo" />
                             <p className="mt-3">Loading Question...</p> {/* Updated text */}
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Ultimate Error State Render ---
    // Check if the question is null or malformed after loading attempts
    if (!currentQuestion || !currentQuestion.question || !Array.isArray(currentQuestion.options) || currentQuestion.options.length !== 4) {
        console.error("Failed to load or parse quiz question from local JSON.");
        return (
            <div className="quiz-wrapper">
                <div className="quiz-container">
                    <div className="quiz-content">
                        <p>Sorry, we encountered an issue loading the quiz questions from the local data file. Please try refreshing the page.</p>
                         <button className="ui_btn mt-3" onClick={() => window.location.reload()}>Refresh Page</button> {/* Clearer text */}
                    </div>
                </div>
            </div>
        );
    }


    // --- Main Quiz Render ---
    return (
        <>
              <Head>
        {getMetaTags(metaData, customMeta)}
      </Head>
        <div className="quiz-wrapper">
            <div className="quiz-container">
                <Image src={colorBubbles} alt="Color Quiz" width={160} height={130} quality={100} className="quiz-logo" />
                <div className="quiz-content">
                   {/* Using score as display could still be interesting, even if not controlling JSON difficulty */}
                   <h3 className="quiz-title">
                     SCORE: {score} -  Streak: {streak} | High Score: {highScore}
                  </h3>
                    <h2 className="quiz-question">{currentQuestion.question}</h2>
                    <div className="quiz-options">
                        <h3 className="quiz-title">SELECT THE CORRECT OPTION</h3>
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.correct, option.hex)}
                                className={getButtonClassName(option)}
                                // Disable button click while processing answer/loading next Q
                                disabled={selectedAnswer !== null}
                            >
                                 {/* Only show the color dot if the hex code is valid */}
                                {option.hex && /^#([0-9A-Fa-f]{3}){1,2}$/.test(option.hex) ? (
                                     <span className="color-dot" style={{ backgroundColor: option.hex }}></span>
                                ) : null}
                                {option.name || 'N/A'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}