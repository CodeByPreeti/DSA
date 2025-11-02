import React, { useState, useEffect } from 'react';
import audioService from '../../services/audioService';
import './Quiz.css';

const Quiz = ({ topic, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const quizData = {
    arrays: [
      {
        question: "What is the time complexity of accessing an element in an array by its index?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
        correct: 2,
        explanation: "Array access by index is O(1) because we can directly compute the memory address."
      },
      {
        question: "What happens when you insert an element at the beginning of an array?",
        options: [
          "Only the first element is affected",
          "All elements must be shifted right",
          "The array automatically resizes",
          "Nothing, it's O(1) operation"
        ],
        correct: 1,
        explanation: "Inserting at the beginning requires shifting all existing elements one position to the right, making it O(n)."
      }
    ],
    stacks: [
      {
        question: "What principle does a Stack follow?",
        options: ["FIFO", "LIFO", "Random Access", "Priority-based"],
        correct: 1,
        explanation: "Stack follows LIFO (Last In First Out) - the last element added is the first one to be removed."
      },
      {
        question: "Which of these is NOT a stack operation?",
        options: ["Push", "Pop", "Peek", "Dequeue"],
        correct: 3,
        explanation: "Dequeue is a Queue operation. Stack operations are Push, Pop, and Peek."
      }
    ],
    queues: [
      {
        question: "What principle does a Queue follow?",
        options: ["LIFO", "FIFO", "LILO", "Random"],
        correct: 1,
        explanation: "Queue follows FIFO (First In First Out) - the first element added is the first one to be removed."
      },
      {
        question: "In a standard queue implementation using an array, what is the time complexity of dequeue?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correct: 1,
        explanation: "Standard array-based dequeue is O(n) because all elements must shift. Circular queue or linked list can achieve O(1)."
      }
    ],
    'linked-lists': [
      {
        question: "What is the main advantage of a Linked List over an Array?",
        options: [
          "Faster access by index",
          "Less memory usage",
          "Dynamic size without reallocation",
          "Better cache performance"
        ],
        correct: 2,
        explanation: "Linked Lists can grow dynamically without needing to reallocate memory like arrays do."
      },
      {
        question: "What is the time complexity of inserting a node at the head of a linked list?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
        correct: 2,
        explanation: "Inserting at the head is O(1) - just update the head pointer and the new node's next pointer."
      }
    ],
    sorting: [
      {
        question: "What is the average time complexity of Quick Sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correct: 1,
        explanation: "Quick Sort has O(n log n) average case, though worst case is O(n²) with poor pivot selection."
      },
      {
        question: "Which sorting algorithm is stable and guarantees O(n log n)?",
        options: ["Quick Sort", "Bubble Sort", "Merge Sort", "Heap Sort"],
        correct: 2,
        explanation: "Merge Sort is stable (preserves relative order) and always runs in O(n log n) time."
      }
    ],
    trees: [
      {
        question: "In a Binary Search Tree, where would you find the minimum value?",
        options: [
          "At the root",
          "At the leftmost node",
          "At the rightmost node",
          "At any leaf node"
        ],
        correct: 1,
        explanation: "In a BST, smaller values go left, so the minimum is always at the leftmost node."
      },
      {
        question: "What is the time complexity of searching in a balanced BST?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correct: 1,
        explanation: "Balanced BST search is O(log n) because we eliminate half the tree at each step."
      }
    ],
    graphs: [
      {
        question: "Which algorithm would you use to find the shortest path in an unweighted graph?",
        options: ["DFS", "BFS", "Dijkstra's", "Bellman-Ford"],
        correct: 1,
        explanation: "BFS finds shortest path in unweighted graphs by exploring level by level."
      },
      {
        question: "What does a cycle in a graph mean?",
        options: [
          "A path exists between any two nodes",
          "A path that starts and ends at the same node",
          "The graph is disconnected",
          "All nodes have even degree"
        ],
        correct: 1,
        explanation: "A cycle is a path where you can start at a node and return to it by following edges."
      }
    ],
    recursion: [
      {
        question: "What is essential for a recursive function to avoid infinite recursion?",
        options: [
          "A loop statement",
          "A base case",
          "Multiple parameters",
          "Global variables"
        ],
        correct: 1,
        explanation: "A base case provides the stopping condition that prevents infinite recursion."
      },
      {
        question: "What data structure does the system use to manage recursive function calls?",
        options: ["Queue", "Stack", "Heap", "Array"],
        correct: 1,
        explanation: "The call stack manages function calls - each recursive call is pushed onto the stack."
      }
    ]
  };

  const questions = quizData[topic] || quizData.arrays;

  const handleAnswer = (index) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
      audioService.playSoundEffect('correct');
    } else {
      audioService.playSoundEffect('wrong');
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
      audioService.playSoundEffect('complete');
      if (onComplete) {
        onComplete(score + 1);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
  };

  const closeQuiz = () => {
    resetQuiz();
    if (onComplete) {
      onComplete(score);
    }
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 50;

    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <div className={`result-icon ${passed ? 'pass' : 'fail'}`}>
            {passed ? '🎉' : '📚'}
          </div>
          <h2>Quiz Complete!</h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-text">{percentage}%</span>
            </div>
          </div>
          <p className="score-details">
            You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
          </p>
          <p className="result-message">
            {passed 
              ? "Great job! You've mastered this topic! 🌟" 
              : "Keep learning! Review the topic and try again. 💪"}
          </p>
          <div className="result-actions">
            <button className="btn-continue" onClick={closeQuiz}>
              ← Back to Learn
            </button>
            <button className="btn-retry" onClick={resetQuiz}>
              More Questions 🔄
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress">
          <div className="progress-info">
            <span className="question-number">Question {currentQuestion + 1}/{questions.length}</span>
            <span className="score-tracker">Score: {score}/{questions.length}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="quiz-content">
        <div className="question-card">
          <h3 className="question-text">{question.question}</h3>
          
          <div className="options-grid">
            {question.options.map((option, index) => {
              let className = "option-button";
              
              if (answered) {
                if (index === question.correct) {
                  className += " correct";
                } else if (index === selectedAnswer) {
                  className += " incorrect";
                } else {
                  className += " disabled";
                }
              } else if (selectedAnswer === index) {
                className += " selected";
              }

              return (
                <button
                  key={index}
                  className={className}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                  {answered && index === question.correct && <span className="check-icon">✓</span>}
                  {answered && index === selectedAnswer && index !== question.correct && <span className="cross-icon">✗</span>}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="explanation-box">
              <div className="explanation-header">
                <span className="icon">💡</span>
                <strong>Explanation</strong>
              </div>
              <p>{question.explanation}</p>
            </div>
          )}
        </div>
      </div>

      {answered && (
        <div className="quiz-actions">
          <button className="btn-next" onClick={handleNext}>
            {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results 🎯'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
