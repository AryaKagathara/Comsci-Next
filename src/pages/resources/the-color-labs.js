
import { useState, useEffect } from 'react';
import Image from "next/image";
import metaData from '../../files/meta.json'; 
import quizQuestionsData from '../../files/other/colorquiz.json'; 
import colorBubbles from "@/../public/images/extras/color-bubble.webp"; 
import Head from "next/head";

import { organizationSchema, websiteSchema, BASE_URL } from '../../lib/commonSchema'; 

export default function BrandColorQuiz() {

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null);
    const [shakeButton, setShakeButton] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [score, setScore] = useState(1);
    const [streak, setStreak] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const getDifficultyLevel = (score) => {
        if (score >= 8) return "hard";
        if (score >= 4 && score <= 7) return "medium";
        return "easy";
    };

    function shuffleArray(array) {
        let currentIndex = array.length;
        let randomIndex;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }

        return array;
    }

    useEffect(() => {
        
        if (typeof window !== 'undefined') {
            const storedHighScore = localStorage.getItem('brandColorQuizHighScoreStreak');
            setHighScore(parseInt(storedHighScore || '0', 10));
        }
    }, []);

    useEffect(() => {
        
        if (typeof window !== 'undefined' && streak > highScore) {
            setHighScore(streak);
            localStorage.setItem('brandColorQuizHighScoreStreak', streak.toString());
        }
    }, [streak, highScore]);

    async function fetchNewQuestion() {
        setIsLoading(true);

        try {
            console.log("Attempting to load question from local JSON...");

            if (!Array.isArray(quizQuestionsData) || quizQuestionsData.length === 0) {
                console.error("Local quiz questions data is missing or empty.");
                throw new Error("No quiz questions available in the local file.");
            }

            const randomIndex = Math.floor(Math.random() * quizQuestionsData.length);

             const questionData = JSON.parse(JSON.stringify(quizQuestionsData[randomIndex]));
            
            shuffleArray(questionData.options);

            if (
                typeof questionData !== 'object' || questionData === null ||
                typeof questionData.question !== 'string' || questionData.question.trim() === '' || 
                !Array.isArray(questionData.options) || questionData.options.length !== 4 || 
                 !questionData.options.every(option =>
                    typeof option === 'object' && option !== null &&
                    typeof option.hex === 'string' && /^#([0-9A-Fa-f]{3}){1,2}$/.test(option.hex.trim()) && 
                    typeof option.name === 'string' && option.name.trim() !== '' && 
                    typeof option.correct === 'boolean' 
                ) || !questionData.options.some(option => option.correct === true) 
            ) {
                 console.error("Selected local quiz question has invalid structure:", questionData);
                 throw new Error("Invalid structure in local quiz question data.");
            }

            console.log("Successfully loaded question from JSON:", questionData.question);
            setCurrentQuestion(questionData);

        } catch (error) {
            
            console.error("Error loading or processing local quiz data:", error);

            setCurrentQuestion({
                question: "Sorry, couldn't load quiz questions right now. Please check data file.",
                options: [
                    { name: 'Error', hex: '#dc3545', correct: false },
                    { name: 'Loading Failed', hex: '#ffc107', correct: false },
                    { name: 'Try Again Later', hex: '#17a2b8', correct: false },
                    { name: 'Quiz Data Missing', hex: '#6c757d', correct: false }
                ]
            });
        } finally {
            setIsLoading(false);
        }
    }

     const quizPageUrl = `${BASE_URL}/resources/the-color-labs`; 

      const customMeta = {
        
        "title": "Brand Color Quiz: Test Your Design & Branding Color Knowledge | Comsci",

        "description": "Challenge yourself with the Comsci Technologies Brand Color Quiz! Test your knowledge of branding colors, design principles, and color psychology. A fun game for designers, marketers, and color enthusiasts.",

        "keywords": [
            "brand color quiz", "color quiz", "branding colors", "color psychology", "design quiz",
            "graphic design colors", "web design colors", "color game", "color trivia", "test color knowledge",
            "Comsci Technologies", "design agency India", "branding agency"
        ],

        "robots": "index, follow",
        
        "author": "Comsci Technologies", 

        "canonical": quizPageUrl, 

        "og": {
            "title": "Test Your Branding Color Knowledge!", 
            "description": "Are you a color expert? Take our fun quiz to challenge your understanding of famous brand colors and design psychology. By Comsci Technologies.", 
            "type": "website", 
            "url": quizPageUrl, 
            
            "image": `${BASE_URL}/images/extras/color-bubble.webp`, 
            "site_name": metaData?.site_name || "Comsci Technologies", 
        },

        "twitter": {
            "card": "summary_large_image", 
             "site": metaData?.twitter?.site || "@YourTwitterHandle", 
            "title": "How Well Do You Know Brand Colors?", 
            "description": "Play the Brand Color Quiz! Test your knowledge of branding, design, and color psychology with this fun challenge from Comsci Technologies. #branding #design #quiz #colors", 
            "image": `${BASE_URL}/images/extras/color-bubble.webp`, 
        },

      };

      const getMetaTags = (metaData, customMeta = {}) => {
        
        const mergedMeta = { ...metaData, ...customMeta };

        if (customMeta.og) {
          mergedMeta.og = { ...metaData.og, ...customMeta.og }
        }
        if (customMeta.twitter) {
          mergedMeta.twitter = { ...metaData.twitter, ...customMeta.twitter }
        }

         const tags = [];

         Object.keys(mergedMeta).forEach(key => {
            const value = mergedMeta[key];

            if (key === "title") {
                 tags.push(<title key="title">{value}</title>);
            } else if (key === "og" || key === "twitter") {
                if (value && typeof value === 'object') { 
                     Object.keys(value).forEach(property => {
                        if (value[property]) { 
                             tags.push(
                               <meta
                                 key={`${key}:${property}`}
                                 property={`${key}:${property}`}
                                 content={value[property]}
                               />
                            );
                        }
                    });
                }
            } else if (key === "keywords" && Array.isArray(value)) {
                
                if (value.length > 0) {
                     tags.push(<meta key={key} name={key} content={value.join(', ')} />);
                }
            } else if (typeof value === 'string') {
                
                 if (key === "canonical") { 
                     tags.push(<link key="canonical" rel="canonical" href={value} />);
                 } else {
                     if (value.trim() !== '') { 
                        tags.push(<meta key={key} name={key} content={value} />);
                     }
                 }
            }
             
         });

        return tags;
      };

    useEffect(() => {
        fetchNewQuestion();
    }, []);

    const handleAnswer = (isCorrect, hex) => {
        
        if (selectedAnswer !== null) return;

        setSelectedAnswer(hex);
        setAnswerStatus(isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
            
            setScore(prevScore => prevScore + 1);
            setStreak(prevStreak => prevStreak + 1);
        } else {
            setScore(prevScore => Math.max(0, prevScore - 1)); 
            setStreak(0);
            setShakeButton(hex);
        }

        const nextQuestionDelay = isCorrect ? 1500 : 2500;
        setTimeout(() => {
            setSelectedAnswer(null);
            setAnswerStatus(null);
            setShakeButton(null);
            fetchNewQuestion();
        }, nextQuestionDelay);
    };

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
                            {/* Use optimized Next.js Image component */}
                             <Image
                                src={colorBubbles}
                                alt="Color Quiz Game Loading" 
                                width={160}
                                height={130}
                                quality={100}
                                priority 
                                className="quiz-logo"
                             />
                             <p className="mt-3">Loading the next colorful question...</p>
                            <div className="spinner-border text-primary" role="status"> {/* Added text-primary for better color in case*/}
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentQuestion || !currentQuestion.question || !Array.isArray(currentQuestion.options) || currentQuestion.options.length < 4 || !currentQuestion.options.some(opt => opt.correct)) {
        console.error("Render error: Quiz question data is invalid after loading attempt.");
         
         const displayQuestion = currentQuestion?.question || "An unexpected error occurred while loading the quiz.";

        return (
            <div className="quiz-wrapper">
                <div className="quiz-container">
                    <div className="quiz-content">
                        {/* Use optimized Next.js Image component */}
                         <Image
                            src={colorBubbles}
                            alt="Color Quiz Error" 
                            width={160}
                            height={130}
                            quality={100}
                            className="quiz-logo"
                        />
                        <p className="mt-3">{displayQuestion}</p>
                        <p>Please try refreshing the page to load a new question.</p>
                         <button className="ui_btn mt-3" onClick={() => window.location.reload()}>Refresh Page</button>
                    </div>
                </div>
            </div>
        );
    }

    const currentPageMeta = { ...metaData, ...customMeta }; 
    const pageUrl = customMeta.canonical || `${BASE_URL}/quiz`; 

     const quizSchema = {
        "@context": "https://schema.org",
        "@type": "Quiz",
        "name": customMeta.title, 
        "url": pageUrl,
        "description": customMeta.description, 
        "learningResourceType": "Quiz", 
         
        "about": [
            { "@type": "Thing", "name": "Color Psychology" },
            { "@type": "Thing", "name": "Branding Colors" },
             { "@type": "Thing", "name": "Graphic Design" },
             { "@type": "Thing", "name": "Web Design" },
            { "@type": "Thing", "name": "Visual Identity" }
         ],
        
         "provider": organizationSchema, 
         
         "image": customMeta?.og?.image || customMeta?.twitter?.image || `${BASE_URL}/images/extras/color-bubble.webp` 

     };

      const finalSchema = [
        organizationSchema, 
        websiteSchema,      
         quizSchema
      ];

    return (
        <>
            <Head>
                {/* Apply generated meta tags */}
                {getMetaTags(metaData, customMeta)}
                <link rel="canonical" href={pageUrl} key="canonical-link" />

                {/* Add Schema Markup script */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema, null, 2) }}
                  key="jsonld-quiz-schema" 
                />
             </Head>
            <div className="quiz-wrapper">
                <div className="quiz-container">
                     {/* Use optimized Next.js Image component */}
                    <Image
                        src={colorBubbles}
                        alt="Color Quiz Game Illustration by Comsci Technologies" 
                        width={160}
                        height={130}
                        quality={100}
                        className="quiz-logo"
                    />
                    <div className="quiz-content">
                        <h3 className="quiz-title">
                            SCORE: {score} - Streak: {streak} | High Score: {highScore}
                        </h3>
                        <h2 className="quiz-question">{currentQuestion?.question}</h2>{/* Added optional chaining */}
                        <div className="quiz-options">
                            <h3 className="quiz-title">SELECT THE CORRECT OPTION</h3>
                            {/* Ensure currentQuestion and options exist before mapping */}
                            {currentQuestion?.options && Array.isArray(currentQuestion.options) && currentQuestion.options.map((option, index) => (
                                <button
                                    key={option.hex || index} 
                                    onClick={() => handleAnswer(option.correct, option.hex)}
                                    className={getButtonClassName(option)}
                                    
                                    disabled={selectedAnswer !== null}
                                >
                                     {/* Only show the color dot if the hex code is valid and the name is provided*/}
                                    {option.hex && /^#([0-9A-Fa-f]{3}){1,2}$/.test(option.hex.trim()) && option.name ? (
                                         <span className="color-dot" style={{ backgroundColor: option.hex.trim() }}></span>
                                    ) : null}
                                    {option.name || 'Option Unavailable'} {/* Fallback text for name */}
                                </button>
                            ))}
                            {/* Fallback message if options aren't available unexpectedly */}
                            {(!currentQuestion?.options || !Array.isArray(currentQuestion.options) || currentQuestion.options.length === 0) && (
                                 <p className="text-danger mt-2">Error displaying options.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}