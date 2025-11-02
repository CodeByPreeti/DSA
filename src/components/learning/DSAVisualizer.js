import React, { useState, useEffect } from 'react';
import './DSAVisualizer.css';

const DSAVisualizer = ({ topic, isPlaying, onStepComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visualState, setVisualState] = useState([]);
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // DSA visualization data for different topics
  const visualizations = {
    arrays: {
      steps: [
        { state: [5, 2, 8, 1, 9], highlight: [], explanation: '📦 Initial array with 5 elements' },
        { state: [5, 2, 8, 1, 9], highlight: [0], explanation: '👉 Accessing index 0: value = 5 (O(1))' },
        { state: [5, 2, 8, 1, 9], highlight: [2], explanation: '🔍 Accessing index 2: value = 8 (O(1))' },
        { state: [5, 2, 8, 1, 9, 3], highlight: [5], explanation: '➕ Push element 3 at end (O(1))' },
        { state: [5, 2, 8, 1, 9], highlight: [], explanation: '✅ Array operations complete!' },
      ],
      code: `// Array Operations
let arr = [5, 2, 8, 1, 9];

// Access element
let first = arr[0];  // O(1)
console.log(first);  // 5

// Insert at end
arr.push(3);         // O(1)

// Delete from end
arr.pop();           // O(1)`,
      title: 'Array Operations'
    },
    stacks: {
      steps: [
        { state: [], highlight: [], explanation: 'Empty stack - LIFO (Last In First Out)' },
        { state: [5], highlight: [0], explanation: 'Push 5 onto stack' },
        { state: [5, 3], highlight: [1], explanation: 'Push 3 onto stack' },
        { state: [5, 3, 8], highlight: [2], explanation: 'Push 8 onto stack' },
        { state: [5, 3], highlight: [1], explanation: 'Pop removes 8 (top element)' },
        { state: [5], highlight: [0], explanation: 'Pop removes 3' },
      ],
      code: `// Stack Implementation
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element); // O(1)
  }
  
  pop() {
    return this.items.pop();  // O(1)
  }
  
  peek() {
    return this.items[this.items.length - 1];
  }
}`,
      title: 'Stack (LIFO)'
    },
    queues: {
      steps: [
        { state: [], highlight: [], explanation: 'Empty queue - FIFO (First In First Out)' },
        { state: [5], highlight: [0], explanation: 'Enqueue 5 at rear' },
        { state: [5, 3], highlight: [1], explanation: 'Enqueue 3 at rear' },
        { state: [5, 3, 8], highlight: [2], explanation: 'Enqueue 8 at rear' },
        { state: [3, 8], highlight: [0], explanation: 'Dequeue removes 5 (front element)' },
        { state: [8], highlight: [0], explanation: 'Dequeue removes 3' },
      ],
      code: `// Queue Implementation
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element); // O(1)
  }
  
  dequeue() {
    return this.items.shift(); // O(n)
  }
  
  front() {
    return this.items[0];
  }
}`,
      title: 'Queue (FIFO)'
    },
    'linked-lists': {
      steps: [
        { state: [{ val: 5, next: null }], highlight: [0], explanation: 'Single node with value 5' },
        { state: [{ val: 5, next: 1 }, { val: 3, next: null }], highlight: [1], explanation: 'Added node with value 3' },
        { state: [{ val: 5, next: 1 }, { val: 3, next: 2 }, { val: 8, next: null }], highlight: [2], explanation: 'Added node with value 8' },
        { state: [{ val: 5, next: 1 }, { val: 3, next: 2 }, { val: 8, next: 3 }, { val: 1, next: null }], highlight: [3], explanation: 'Added node with value 1' },
      ],
      code: `// Linked List Node
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Insert at beginning
function insertAtHead(head, data) {
  let newNode = new Node(data);
  newNode.next = head;
  return newNode;
}`,
      title: 'Linked List'
    },
    sorting: {
      steps: [
        { state: [5, 2, 8, 1, 9], highlight: [], explanation: 'Unsorted array' },
        { state: [2, 5, 8, 1, 9], highlight: [0, 1], explanation: 'Comparing and swapping 5 and 2' },
        { state: [2, 5, 8, 1, 9], highlight: [1, 2], explanation: '5 and 8 are in order' },
        { state: [2, 5, 1, 8, 9], highlight: [2, 3], explanation: 'Swapping 8 and 1' },
        { state: [2, 1, 5, 8, 9], highlight: [1, 2], explanation: 'Swapping 5 and 1' },
        { state: [1, 2, 5, 8, 9], highlight: [], explanation: 'Sorted array!' },
      ],
      code: `// Bubble Sort
function bubbleSort(arr) {
  let n = arr.length;
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n-i-1; j++) {
      if(arr[j] > arr[j+1]) {
        // Swap
        [arr[j], arr[j+1]] = 
        [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}
// Time: O(n²), Space: O(1)`,
      title: 'Bubble Sort'
    },
    trees: {
      steps: [
        { state: { root: 5, left: null, right: null }, highlight: [5], explanation: 'Root node with value 5' },
        { state: { root: 5, left: 3, right: null }, highlight: [3], explanation: 'Added left child: 3' },
        { state: { root: 5, left: 3, right: 8 }, highlight: [8], explanation: 'Added right child: 8' },
        { state: { root: 5, left: { val: 3, left: 1, right: null }, right: 8 }, highlight: [1], explanation: 'Added 1 as left child of 3' },
      ],
      code: `// Binary Tree Node
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Insert in BST
function insert(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val)
    root.left = insert(root.left, val);
  else
    root.right = insert(root.right, val);
  return root;
}`,
      title: 'Binary Search Tree'
    },
    graphs: {
      steps: [
        { state: { nodes: [1], edges: [] }, highlight: [1], explanation: 'Graph with single node 1' },
        { state: { nodes: [1, 2], edges: [[1, 2]] }, highlight: [2], explanation: 'Added node 2 and edge 1→2' },
        { state: { nodes: [1, 2, 3], edges: [[1, 2], [1, 3]] }, highlight: [3], explanation: 'Added node 3 and edge 1→3' },
        { state: { nodes: [1, 2, 3], edges: [[1, 2], [1, 3], [2, 3]] }, highlight: [2, 3], explanation: 'Added edge 2→3' },
      ],
      code: `// Graph using Adjacency List
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex])
      this.adjacencyList[vertex] = [];
  }
  
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }
}`,
      title: 'Graph Representation'
    },
    recursion: {
      steps: [
        { state: [5], highlight: [0], explanation: 'factorial(5) called' },
        { state: [5, 4], highlight: [1], explanation: 'factorial(4) called' },
        { state: [5, 4, 3], highlight: [2], explanation: 'factorial(3) called' },
        { state: [5, 4, 3, 2], highlight: [3], explanation: 'factorial(2) called' },
        { state: [5, 4, 3, 2, 1], highlight: [4], explanation: 'factorial(1) returns 1' },
        { state: [5, 4, 3, 2], highlight: [3], explanation: 'Returns 2 * 1 = 2' },
        { state: [5, 4, 3], highlight: [2], explanation: 'Returns 3 * 2 = 6' },
        { state: [5, 4], highlight: [1], explanation: 'Returns 4 * 6 = 24' },
        { state: [5], highlight: [0], explanation: 'Returns 5 * 24 = 120' },
      ],
      code: `// Factorial using Recursion
function factorial(n) {
  // Base case
  if (n <= 1) return 1;
  
  // Recursive case
  return n * factorial(n - 1);
}

// Call stack visualization
factorial(5)
// 5 * factorial(4)
// 5 * 4 * factorial(3)
// 5 * 4 * 3 * factorial(2)
// 5 * 4 * 3 * 2 * 1`,
      title: 'Recursion (Factorial)'
    }
  };

  const currentViz = visualizations[topic] || visualizations.arrays;

  useEffect(() => {
    setCurrentStep(0);
    setVisualState(currentViz.steps[0].state);
    setCode(currentViz.code);
    setExplanation(currentViz.steps[0].explanation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  useEffect(() => {
    if (isPlaying && !isAnimating) {
      const timer = setTimeout(() => {
        nextStep();
      }, 1800); // Faster - 1.8 seconds per step
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentStep, isAnimating]);

  const nextStep = () => {
    if (currentStep < currentViz.steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        const nextStepIndex = currentStep + 1;
        setCurrentStep(nextStepIndex);
        setVisualState(currentViz.steps[nextStepIndex].state);
        setExplanation(currentViz.steps[nextStepIndex].explanation);
        setIsAnimating(false);
        if (onStepComplete) onStepComplete();
      }, 500);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      setVisualState(currentViz.steps[prevStepIndex].state);
      setExplanation(currentViz.steps[prevStepIndex].explanation);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setVisualState(currentViz.steps[0].state);
    setExplanation(currentViz.steps[0].explanation);
  };

  const renderVisualization = () => {
    const step = currentViz.steps[currentStep];
    
    if (topic === 'arrays' || topic === 'stacks' || topic === 'queues' || topic === 'sorting' || topic === 'recursion') {
      return (
        <div className={`array-visualization ${topic}-theme`}>
          {Array.isArray(visualState) && visualState.map((value, index) => (
            <div
              key={`${index}-${value}`}
              className={`array-element ${step.highlight?.includes(index) ? 'highlighted pulse-animation' : ''} ${isAnimating ? 'animating slide-in' : ''}`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="element-value">{value}</div>
              {step.highlight?.includes(index) && (
                <div className="highlight-indicator">
                  <span className="glow-ring"></span>
                  <span className="active-marker">🔍</span>
                </div>
              )}
              <div className="element-index">Index: {index}</div>
            </div>
          ))}
          {isAnimating && (
            <div className="animation-overlay">
              <div className="sparkle-effect">
                <span>✨</span><span>⭐</span><span>💫</span>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (topic === 'linked-lists') {
      return (
        <div className="linked-list-visualization">
          {Array.isArray(visualState) && visualState.map((node, index) => (
            <div key={index} className="node-container" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className={`linked-node ${step.highlight?.includes(index) ? 'highlighted bounce-in' : ''} ${isAnimating ? 'fade-in' : ''}`}>
                <div className="node-data-section">
                  <span className="data-label">Data</span>
                  <div className="node-value">{node.val}</div>
                </div>
                <div className="node-pointer-section">
                  <span className="pointer-label">Next</span>
                  <div className="node-next">{node.next !== null ? '→' : '∅'}</div>
                </div>
                {step.highlight?.includes(index) && (
                  <div className="node-indicator">
                    <span className="indicator-arrow">👉</span>
                    <span className="indicator-text">Active</span>
                  </div>
                )}
              </div>
              {node.next !== null && (
                <div className="arrow-connector">
                  <svg width="40" height="20" viewBox="0 0 40 20">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#8B5CF6" />
                      </marker>
                    </defs>
                    <line x1="0" y1="10" x2="35" y2="10" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (topic === 'trees') {
      return (
        <div className="tree-visualization">
          <div className="tree-node">
            <div className={`node ${step.highlight?.includes(visualState.root) ? 'highlighted' : ''}`}>
              {visualState.root}
            </div>
            <div className="tree-children">
              {visualState.left && (
                <div className={`node ${step.highlight?.includes(visualState.left.val || visualState.left) ? 'highlighted' : ''}`}>
                  {visualState.left.val || visualState.left}
                  {visualState.left.left && (
                    <div className="tree-children">
                      <div className={`node ${step.highlight?.includes(visualState.left.left) ? 'highlighted' : ''}`}>
                        {visualState.left.left}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {visualState.right && (
                <div className={`node ${step.highlight?.includes(visualState.right) ? 'highlighted' : ''}`}>
                  {visualState.right}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (topic === 'graphs') {
      return (
        <div className="graph-visualization">
          <svg width="300" height="250">
            {visualState.edges?.map((edge, i) => {
              const [from, to] = edge;
              const fromIndex = visualState.nodes.indexOf(from);
              const toIndex = visualState.nodes.indexOf(to);
              const x1 = 75 + (fromIndex % 2) * 150;
              const y1 = 50 + Math.floor(fromIndex / 2) * 100;
              const x2 = 75 + (toIndex % 2) * 150;
              const y2 = 50 + Math.floor(toIndex / 2) * 100;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#8B5CF6"
                  strokeWidth="2"
                />
              );
            })}
            {visualState.nodes?.map((node, i) => {
              const x = 75 + (i % 2) * 150;
              const y = 50 + Math.floor(i / 2) * 100;
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="25"
                    fill={step.highlight?.includes(node) ? '#10B981' : '#8B5CF6'}
                    stroke="white"
                    strokeWidth="3"
                  />
                  <text
                    x={x}
                    y={y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    {node}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      );
    }

    return <div>Visualization coming soon for {topic}</div>;
  };

  return (
    <div className="dsa-visualizer">
      <div className="visualizer-header">
        <h3>{currentViz.title}</h3>
        <div className="step-indicator">
          Step {currentStep + 1} of {currentViz.steps.length}
        </div>
      </div>

      <div className="visualization-area">
        {renderVisualization()}
      </div>

      <div className="explanation-box">
        <span className="explanation-icon">💡</span>
        {explanation}
      </div>

      <div className="code-section">
        <div className="code-header">
          <span className="code-icon">💻</span>
          <span>Implementation</span>
        </div>
        <pre className="code-block">
          <code>{code}</code>
        </pre>
      </div>

      <div className="controls">
        <button onClick={reset} className="control-btn reset-btn" disabled={currentStep === 0}>
          ↺ Reset
        </button>
        <button onClick={prevStep} className="control-btn prev-btn" disabled={currentStep === 0}>
          ← Previous
        </button>
        <button onClick={nextStep} className="control-btn next-btn" disabled={currentStep === currentViz.steps.length - 1}>
          Next →
        </button>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentStep + 1) / currentViz.steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default DSAVisualizer;
