import React, { useState, useEffect, useCallback } from 'react';
import huggingFaceService from '../../services/huggingFaceService';
import speechService from '../../services/speechService';
import audioService from '../../services/audioService';
import DSAVisualizer from './DSAVisualizer';
import Quiz from './Quiz';
import './StoryViewer.css';

const StoryViewer = ({ userPreferences, currentTopic }) => {
  const [story, setStory] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [backgroundSound, setBackgroundSound] = useState('');
  const [isVisualizerPlaying, setIsVisualizerPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.3);
  const [selectedFont, setSelectedFont] = useState('Georgia');
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [isNarrating, setIsNarrating] = useState(false);

  const generateStory = useCallback(async () => {
    if (!userPreferences || !currentTopic) return;

    // Force clear everything first
    setStory('');
    setGeneratedCode('');
    setIsLoading(true);
    setError('');
    setShowQuiz(false);
    
    // Add a small delay to ensure UI updates
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      const timestamp = Date.now();
      const randomSeed = Math.random();
      console.log('🚀 Generating NEW AI-powered story for:', currentTopic);
      console.log('⏰ Timestamp:', timestamp);
      console.log('🎲 Random Seed:', randomSeed);
      console.log('📋 Preferences:', userPreferences);
      console.log('🤖 Using Groq/Gemini/HuggingFace AI...');
      
      const result = await huggingFaceService.generateStory(currentTopic, {
        ...userPreferences,
        timestamp,
        randomSeed,
        forceNew: true
      });
      
      console.log('📦 AI Story generation result:', result);
      
      // Extract story text from result
      const storyText = typeof result === 'string' ? result : (result.story || result);
      
      if (storyText && storyText.length > 50) {
        setStory(storyText);
        
        // Generate story-aware code with plot-integrated comments
        const dynamicCode = generateStoryBasedCode(currentTopic, storyText, userPreferences.theme);
        setGeneratedCode(dynamicCode);
        
        console.log('✅ AI Story generated successfully! Length:', storyText.length);
        console.log('📝 First 100 chars:', storyText.substring(0, 100));
        console.log('💻 Dynamic code generated for topic:', currentTopic);
      } else {
        throw new Error('Story too short or empty');
      }
    } catch (err) {
      console.error('❌ AI Story generation error:', err);
      const fallbackStory = getFallbackStory();
      setStory(fallbackStory);
      
      // Generate code even for fallback story
      const dynamicCode = generateStoryBasedCode(currentTopic, fallbackStory, userPreferences.theme);
      setGeneratedCode(dynamicCode);
      
      setError('Using educational content. AI services may be loading...');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPreferences, currentTopic]);

  const getFallbackStory = () => {
    const fallbackStories = {
      arrays: `In the ${userPreferences.theme} Kingdom of Data, you discover an ancient treasure vault with numbered chests lined up in perfect order. Each chest has a unique index number, making it incredibly easy to find any treasure instantly! 

The Elder explains: "Arrays are like these numbered treasure chests. Want the third item? Just use index 2 (we start counting from 0). Finding items is blazingly fast - O(1) time complexity! But beware, inserting items in the middle requires shifting all subsequent chests, which takes O(n) time."

You practice: arr[0] gives you the first treasure, arr.push() adds a new chest at the end. This ${userPreferences.level} knowledge will serve you well in your ${userPreferences.theme} quest!`,

      stacks: `Deep in the ${userPreferences.theme} Tower of Computation, you encounter a magical pile of scrolls. The ancient rule is clear: "Last scroll in, first scroll out!"

The wise sage demonstrates: "This is a Stack - LIFO principle in action! Push operations add scrolls to the top (O(1)), pop operations remove from the top (O(1)). Perfect for tracking function calls, undo operations, or checking if parentheses are balanced!"

You watch in amazement as scrolls appear and disappear from the top only. "The bottom scrolls remain untouched until all above them are removed," the sage notes. Your ${userPreferences.level} mind grasps the elegant simplicity of this ${userPreferences.theme} structure.`,

      queues: `The ${userPreferences.theme} Marketplace teaches you patience and fairness. Citizens line up in an orderly queue - first come, first served!

"This is the Queue data structure," announces the market master. "FIFO - First In, First Out! Enqueue adds people at the rear (O(1)), dequeue removes from the front (O(1) with proper implementation). Essential for breadth-first search, task scheduling, and printer queues!"

You observe how the line moves naturally forward. Everyone waits their turn. No cutting allowed! This fair system becomes clear to your ${userPreferences.level} understanding in this ${userPreferences.theme} adventure.`,

      'linked-lists': `In the ${userPreferences.theme} Forest of Connections, each magical stone points to the next stone in the path. Unlike the rigid arrays, these stones can be rearranged dynamically!

The forest spirit explains: "Each node has data and a 'next' pointer. Insertion at head? O(1)! Deletion at head? O(1)! But finding the middle element requires traversing from the start - O(n). The trade-off for dynamic size!"

You trace the path: head → node1 → node2 → ... → null. Breaking and reconnecting links lets you insert or delete without moving other elements. Perfect for your ${userPreferences.level} ${userPreferences.theme} journey where flexibility matters!`,

      graphs: `The ${userPreferences.theme} world spreads before you as an interconnected web of cities, roads, and relationships. Each city is a vertex, each road an edge. This is the mighty Graph!

The cartographer reveals: "Graphs model real relationships! Social networks, maps, dependencies - all graphs! We represent them with adjacency lists or matrices. Use BFS for shortest paths, DFS for connectivity, Dijkstra's for weighted paths!"

You see nodes connected in complex patterns - cycles, multiple paths, weights. Unlike trees, graphs can have cycles! Your ${userPreferences.level} mind expands to grasp these ${userPreferences.theme} connections.`,

      trees: `Rising before you in the ${userPreferences.theme} Garden stands the Tree of Hierarchy. One root at the top, branches spreading downward, leaves at the bottom.

The gardener teaches: "Binary trees have at most 2 children per node. Binary Search Trees keep left < parent < right, enabling O(log n) search! Balanced trees maintain height, preventing worst-case O(n) degradation."

You trace the structure: root → left subtree, right subtree. Inorder traversal gives sorted data. Preorder for copying, postorder for deletion. Your ${userPreferences.level} skills grow in this ${userPreferences.theme} garden of organized data!`,

      sorting: `The ${userPreferences.theme} Library of Order overwhelms you with chaos - books scattered everywhere! But you learn the ancient sorting arts...

The librarian demonstrates: "Bubble Sort compares neighbors, O(n²) but simple. Quick Sort uses divide-and-conquer, O(n log n) average. Merge Sort is stable, O(n log n) guaranteed. Each has its place!"

You practice arranging numbers: [5,2,8,1,9]. Bubble sort bubbles large values right. Quick sort picks pivots. Merge sort splits and merges. Your ${userPreferences.level} ${userPreferences.theme} training makes you a sorting master!`,

      recursion: `In the ${userPreferences.theme} Hall of Mirrors, reflections create infinite reflections. Each mirror shows a smaller version of the same scene - this is Recursion!

The mystic explains: "A function calling itself with smaller inputs! Base case stops infinite recursion. Recursive case breaks problems down. Perfect for trees, backtracking, and divide-and-conquer!"

You compute factorial(5): 5 * factorial(4) → 4 * factorial(3) → ... → base case 1. The call stack unwinds, returning results upward. Your ${userPreferences.level} mind sees the ${userPreferences.theme} elegance of self-reference!`
    };
    
    return fallbackStories[currentTopic] || `Welcome to your ${userPreferences.theme} adventure learning ${currentTopic}! Prepare for an interactive journey through data structures and algorithms.`;
  };

  const generateStoryBasedCode = (topic, storyText, theme) => {
    // Extract key story elements for comments
    const storySnippet = storyText.substring(0, 150).replace(/\n/g, ' ');
    const timestamp = new Date().toLocaleTimeString();
    
    const codeTemplates = {
      arrays: `// 🎭 Story Context: ${storySnippet}...
// 📖 Generated at: ${timestamp} | Theme: ${theme}
// 
// CONCEPT: Arrays - Fixed-size, indexed collection
// COMPLEXITY: Access O(1), Search O(n), Insert/Delete O(n)

class ${theme}TreasureVault {
  constructor(size) {
    // Like numbered treasure chests in our ${theme} tale
    this.treasures = new Array(size);
    this.count = 0;
  }
  
  // Store treasure at specific index (O(1) - instant access!)
  storeTreasure(index, treasure) {
    if (index >= 0 && index < this.treasures.length) {
      this.treasures[index] = treasure;
      this.count++;
      return true;
    }
    return false;
  }
  
  // Retrieve treasure by index (O(1) - direct access)
  getTreasure(index) {
    // In our story, each chest has a number
    // Arrays give us instant access to any position!
    return this.treasures[index];
  }
  
  // Search for specific treasure (O(n) - must check each)
  findTreasure(treasureName) {
    // Like searching through all chests in the ${theme} vault
    for (let i = 0; i < this.treasures.length; i++) {
      if (this.treasures[i] === treasureName) {
        return i; // Found it!
      }
    }
    return -1; // Not found
  }
}

// Example from our ${theme} story
const vault = new ${theme}TreasureVault(5);
vault.storeTreasure(0, "Golden Crown");
vault.storeTreasure(2, "Ruby Gem");
console.log(vault.getTreasure(0)); // "Golden Crown"`,

      stacks: `// 🎭 Story Context: ${storySnippet}...
// 📖 Generated at: ${timestamp} | Theme: ${theme}
//
// CONCEPT: Stack - Last In, First Out (LIFO)
// COMPLEXITY: Push O(1), Pop O(1), Peek O(1)

class ${theme}BookStack {
  constructor() {
    // Like stacking books in our ${theme} adventure
    this.stack = [];
  }
  
  // Add to top (O(1) - constant time)
  push(book) {
    // In our story, we stack items one on top of another
    this.stack.push(book);
    console.log(\`📚 Pushed: \${book}\`);
  }
  
  // Remove from top (O(1) - only access top)
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty!";
    }
    // Last one in is first one out - LIFO principle
    const removed = this.stack.pop();
    console.log(\`📖 Popped: \${removed}\`);
    return removed;
  }
  
  // View top without removing (O(1))
  peek() {
    // Like peeking at the top book in our ${theme} tale
    return this.stack[this.stack.length - 1];
  }
  
  isEmpty() {
    return this.stack.length === 0;
  }
  
  size() {
    return this.stack.length;
  }
}

// Example from our ${theme} story
const bookStack = new ${theme}BookStack();
bookStack.push("Ancient Scroll");
bookStack.push("Magic Tome");
bookStack.push("Dragon Encyclopedia");
bookStack.pop(); // Returns "Dragon Encyclopedia"`,

      queues: `// 🎭 Story Context: ${storySnippet}...
// 📖 Generated at: ${timestamp} | Theme: ${theme}
//
// CONCEPT: Queue - First In, First Out (FIFO)
// COMPLEXITY: Enqueue O(1), Dequeue O(1), Front O(1)

class ${theme}QueueLine {
  constructor() {
    // Like people waiting in line in our ${theme} world
    this.queue = [];
  }
  
  // Add to back of line (O(1))
  enqueue(person) {
    // In our story, newcomers join the end of the line
    this.queue.push(person);
    console.log(\`👤 \${person} joined the queue\`);
  }
  
  // Remove from front (O(1))
  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty!";
    }
    // First person in line gets served first - FIFO!
    const served = this.queue.shift();
    console.log(\`✅ \${served} has been served\`);
    return served;
  }
  
  // Check who's first (O(1))
  front() {
    // Like seeing who's at the front in our ${theme} tale
    return this.queue[0];
  }
  
  isEmpty() {
    return this.queue.length === 0;
  }
  
  size() {
    return this.queue.length;
  }
}

// Example from our ${theme} story
const line = new ${theme}QueueLine();
line.enqueue("Hero");
line.enqueue("Merchant");
line.enqueue("Wizard");
line.dequeue(); // Returns "Hero" - first in, first out!`,

      'linked-lists': `// 🎭 Story Context: ${storySnippet}...
// 📖 Generated at: ${timestamp} | Theme: ${theme}
//
// CONCEPT: Linked List - Chain of nodes with pointers
// COMPLEXITY: Insert O(1), Delete O(1), Search O(n)

class ${theme}ChainLink {
  constructor(data) {
    // Each link in our ${theme} chain holds data
    this.data = data;
    this.next = null; // Points to next link
  }
}

class ${theme}LinkedChain {
  constructor() {
    // Start of our ${theme} adventure chain
    this.head = null;
    this.size = 0;
  }
  
  // Add to beginning (O(1) - no shifting needed!)
  addFirst(data) {
    // Like adding a new link to start of chain in our story
    const newLink = new ${theme}ChainLink(data);
    newLink.next = this.head;
    this.head = newLink;
    this.size++;
  }
  
  // Add to end (O(n) - must traverse)
  addLast(data) {
    const newLink = new ${theme}ChainLink(data);
    
    if (!this.head) {
      this.head = newLink;
    } else {
      // Walk the chain to find the last link
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newLink;
    }
    this.size++;
  }
  
  // Remove from beginning (O(1))
  removeFirst() {
    if (!this.head) return null;
    
    // In our ${theme} tale, we break the first link
    const removed = this.head.data;
    this.head = this.head.next;
    this.size--;
    return removed;
  }
  
  // Display chain
  display() {
    let current = this.head;
    const elements = [];
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    console.log(elements.join(" -> "));
  }
}

// Example from our ${theme} story
const chain = new ${theme}LinkedChain();
chain.addFirst("Link3");
chain.addFirst("Link2");
chain.addFirst("Link1");
chain.display(); // Link1 -> Link2 -> Link3`,

      trees: `// 🎭 Story Context: ${storySnippet}...
// 📖 Generated at: ${timestamp} | Theme: ${theme}
//
// CONCEPT: Binary Tree - Hierarchical structure
// COMPLEXITY: Search O(log n), Insert O(log n), Delete O(log n)

class ${theme}TreeNode {
  constructor(value) {
    // Each node in our ${theme} family tree
    this.value = value;
    this.left = null;  // Left child
    this.right = null; // Right child
  }
}

class ${theme}BinaryTree {
  constructor() {
    // Root of our ${theme} ancestral tree
    this.root = null;
  }
  
  // Insert value (maintains BST property)
  insert(value) {
    const newNode = new ${theme}TreeNode(value);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    // Navigate the tree branches like in our ${theme} story
    let current = this.root;
    while (true) {
      if (value < current.value) {
        // Go left for smaller values
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        // Go right for larger values
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }
  
  // Search for value (O(log n) on balanced tree)
  search(value) {
    let current = this.root;
    
    // Like navigating through branches in our ${theme} tale
    while (current) {
      if (value === current.value) {
        return true; // Found it!
      }
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }
  
  // In-order traversal (Left, Root, Right)
  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }
}

// Example from our ${theme} story
const tree = new ${theme}BinaryTree();
tree.insert(50);
tree.insert(30);
tree.insert(70);
tree.insert(20);
tree.insert(40);
console.log(tree.inOrder()); // [20, 30, 40, 50, 70]`,

      graphs: `// 🎭 Story Context: ${storySnippet}...
// 📖 Generated at: ${timestamp} | Theme: ${theme}
//
// CONCEPT: Graph - Network of connected nodes
// COMPLEXITY: Add Vertex O(1), Add Edge O(1), BFS/DFS O(V+E)

class ${theme}GraphNetwork {
  constructor() {
    // Network of locations in our ${theme} world
    this.adjacencyList = new Map();
  }
  
  // Add location (vertex)
  addVertex(vertex) {
    // Like adding a new city in our ${theme} map
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }
  
  // Connect two locations (edge)
  addEdge(v1, v2) {
    // Creating a path between places in our ${theme} adventure
    this.addVertex(v1);
    this.addVertex(v2);
    this.adjacencyList.get(v1).push(v2);
    this.adjacencyList.get(v2).push(v1); // Undirected graph
  }
  
  // Breadth-First Search - explore level by level
  bfs(start) {
    const visited = new Set();
    const queue = [start];
    const result = [];
    
    visited.add(start);
    
    // Like exploring our ${theme} world layer by layer
    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);
      
      // Visit all neighbors
      const neighbors = this.adjacencyList.get(vertex) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }
  
  // Depth-First Search - explore as far as possible
  dfs(start, visited = new Set(), result = []) {
    visited.add(start);
    result.push(start);
    
    // Dive deep into paths like in our ${theme} journey
    const neighbors = this.adjacencyList.get(vertex) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this.dfs(neighbor, visited, result);
      }
    }
    return result;
  }
  
  display() {
    for (const [vertex, edges] of this.adjacencyList) {
      console.log(\`\${vertex} -> \${edges.join(", ")}\`);
    }
  }
}

// Example from our ${theme} story
const network = new ${theme}GraphNetwork();
network.addEdge("Castle", "Village");
network.addEdge("Castle", "Mountain");
network.addEdge("Village", "Forest");
network.addEdge("Mountain", "Cave");
console.log(network.bfs("Castle"));`,

      sorting: `// 🎭 Story Context: ${storySnippet}...
// 📖 Generated at: ${timestamp} | Theme: ${theme}
//
// CONCEPT: Sorting Algorithms - Organizing data
// COMPLEXITY: QuickSort O(n log n), BubbleSort O(n²)

class ${theme}SortingSpells {
  
  // Quick Sort - Divide and Conquer (O(n log n) average)
  quickSort(arr, low = 0, high = arr.length - 1) {
    // Like organizing items in our ${theme} adventure
    if (low < high) {
      const pivotIndex = this.partition(arr, low, high);
      this.quickSort(arr, low, pivotIndex - 1);
      this.quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
  }
  
  partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    // Rearrange elements around pivot
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }
  
  // Bubble Sort - Simple but slow (O(n²))
  bubbleSort(arr) {
    const n = arr.length;
    
    // Like bubbles rising in our ${theme} potion
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap adjacent elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
  
  // Merge Sort - Stable divide and conquer (O(n log n))
  mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = this.mergeSort(arr.slice(0, mid));
    const right = this.mergeSort(arr.slice(mid));
    
    return this.merge(left, right);
  }
  
  merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    // Merge sorted halves like combining ${theme} artifacts
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
}

// Example from our ${theme} story
const sorter = new ${theme}SortingSpells();
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("QuickSort:", sorter.quickSort([...numbers]));
console.log("BubbleSort:", sorter.bubbleSort([...numbers]));`,

      recursion: `// 🎭 Story Context: ${storySnippet}...
// 📖 Generated at: ${timestamp} | Theme: ${theme}
//
// CONCEPT: Recursion - Function calling itself
// COMPLEXITY: Varies by problem (Factorial O(n), Fibonacci O(2^n))

class ${theme}RecursiveMagic {
  
  // Factorial - Classic recursion example
  factorial(n) {
    // Like breaking down a ${theme} spell into smaller parts
    // Base case: stop recursion
    if (n <= 1) return 1;
    
    // Recursive case: n! = n * (n-1)!
    return n * this.factorial(n - 1);
  }
  
  // Fibonacci - Elegant but exponential (without memoization)
  fibonacci(n) {
    // In our ${theme} tale, each generation builds on previous
    if (n <= 1) return n;
    
    // Each number is sum of two before it
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
  
  // Fibonacci with memoization (O(n) instead of O(2^n)!)
  fibMemo(n, memo = {}) {
    // Remember previously calculated values
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    // Store result to avoid recalculation
    memo[n] = this.fibMemo(n - 1, memo) + this.fibMemo(n - 2, memo);
    return memo[n];
  }
  
  // Tower of Hanoi - Famous recursion puzzle
  towerOfHanoi(n, from = 'A', to = 'C', aux = 'B') {
    if (n === 1) {
      console.log(\`Move disk 1 from \${from} to \${to}\`);
      return;
    }
    
    // Move n-1 disks to auxiliary peg
    this.towerOfHanoi(n - 1, from, aux, to);
    
    // Move largest disk to destination
    console.log(\`Move disk \${n} from \${from} to \${to}\`);
    
    // Move n-1 disks from auxiliary to destination
    this.towerOfHanoi(n - 1, aux, to, from);
  }
  
  // Sum of array - Simple recursion
  arraySum(arr, index = 0) {
    // Like counting treasures in our ${theme} adventure
    if (index >= arr.length) return 0;
    
    return arr[index] + this.arraySum(arr, index + 1);
  }
}

// Example from our ${theme} story
const magic = new ${theme}RecursiveMagic();
console.log("5! =", magic.factorial(5)); // 120
console.log("Fib(10) =", magic.fibMemo(10)); // 55
console.log("Array sum:", magic.arraySum([1, 2, 3, 4, 5])); // 15
magic.towerOfHanoi(3);`
    };
    
    return codeTemplates[topic] || `// Code for ${topic}\n// Generated from ${theme} story\nconsole.log("Learning ${topic}!");`;
  };

  // eslint-disable-next-line no-unused-vars
  const toggleListenMode = async () => {
    if (!isListening) {
      // Start text-to-speech
      setIsSpeaking(true);
      speechService.speak(story, 1, 1, 1);
      setIsListening(true);
    } else {
      // Stop text-to-speech
      speechService.stopSpeaking();
      setIsSpeaking(false);
      setIsListening(false);
    }
  };

  const handleVoiceInput = async () => {
    if (!isRecording) {
      // Start recording
      const started = await speechService.startRecording();
      if (started) {
        setIsRecording(true);
        setTranscribedText('🎤 Listening... Speak now!');
      } else {
        setTranscribedText('❌ Could not access microphone. Please allow microphone permissions.');
      }
    } else {
      // Stop recording and transcribe
      try {
        setTranscribedText('⏳ Processing your speech...');
        const text = await speechService.stopRecording();
        
        if (text && text.trim()) {
          setTranscribedText(`✅ You said: "${text}"`);
          setIsRecording(false);
          
          // Process the transcribed text to generate a DSA story
          await generateStoryFromVoice(text);
          audioService.playSoundEffect('complete');
        } else {
          setTranscribedText('❌ Could not understand. Please try again and speak clearly.');
          setIsRecording(false);
        }
      } catch (error) {
        console.error('Voice input error:', error);
        setTranscribedText('❌ Error: ' + error.message + '. Try using Web Speech fallback or check your microphone.');
        setIsRecording(false);
      }
    }
  };

  const generateStoryFromVoice = async (voiceInput) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Extract DSA topic from voice input
      const input = voiceInput.toLowerCase();
      
      // Map common phrases to DSA topics
      const topicMapping = {
        'array': 'arrays',
        'arrays': 'arrays',
        'list': 'arrays',
        'stack': 'stacks',
        'stacks': 'stacks',
        'queue': 'queues',
        'queues': 'queues',
        'linked list': 'linked-lists',
        'linked lists': 'linked-lists',
        'tree': 'trees',
        'trees': 'trees',
        'binary tree': 'trees',
        'graph': 'graphs',
        'graphs': 'graphs',
        'sort': 'sorting',
        'sorting': 'sorting',
        'recursion': 'recursion',
        'recursive': 'recursion'
      };
      
      // Find matching topic
      let detectedTopic = null;
      for (const [keyword, topic] of Object.entries(topicMapping)) {
        if (input.includes(keyword)) {
          detectedTopic = topic;
          break;
        }
      }
      
      if (detectedTopic) {
        // Generate story for the detected topic
        const prompt = huggingFaceService.createPrompt(userPreferences, detectedTopic);
        const generatedStory = await huggingFaceService.generateStory(prompt, userPreferences, detectedTopic);
        setStory(generatedStory);
        setTranscribedText(`✅ You said: "${voiceInput}" - Teaching you about ${detectedTopic.replace('-', ' ')}!`);
      } else {
        // Use fallback story for current topic
        setStory(getFallbackStory());
        setTranscribedText(`✅ You said: "${voiceInput}" - Couldn't detect a DSA topic. Try saying: "teach me arrays", "explain stacks", "show me trees", etc.`);
      }
    } catch (err) {
      console.error('Story generation from voice error:', err);
      setStory(getFallbackStory());
      setTranscribedText(`✅ You said: "${voiceInput}" - Generated a fallback story.`);
    } finally {
      setIsLoading(false);
    }
  };

  const playBackgroundSound = (soundType) => {
    if (soundType === backgroundSound) {
      audioService.stopBackgroundMusic();
      setBackgroundSound('');
    } else {
      audioService.playBackgroundMusic(soundType, audioVolume);
      setBackgroundSound(soundType);
    }
  };

  const toggleVisualizerPlay = () => {
    setIsVisualizerPlaying(!isVisualizerPlaying);
    audioService.playSoundEffect('click');
  };

  const handleQuizComplete = (score) => {
    setShowQuiz(false);
    audioService.playSoundEffect('complete');
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setAudioVolume(newVolume);
    audioService.setVolume(newVolume);
  };

  const handleNarrate = () => {
    if (isNarrating) {
      // Stop narration
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      setCurrentWordIndex(-1);
      return;
    }

    if (!story) return;

    setIsNarrating(true);
    // eslint-disable-next-line no-unused-vars
    const words = story.replace(/\n\n/g, ' ').split(' ');
    let wordIndex = 0;

    const utterance = new SpeechSynthesisUtterance(story);
    utterance.rate = 0.9; // Slightly slower for better sync
    utterance.pitch = 1;
    utterance.volume = audioVolume;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setCurrentWordIndex(wordIndex);
        wordIndex++;
      }
    };

    utterance.onend = () => {
      setIsNarrating(false);
      setCurrentWordIndex(-1);
    };

    utterance.onerror = () => {
      setIsNarrating(false);
      setCurrentWordIndex(-1);
    };

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    generateStory();
  }, [generateStory]);

  const formatTopicName = (topic) => {
    return topic.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="story-viewer-container">
      {/* Enhanced Header Section */}
      <div className="story-header">
        <div className="topic-info">
          <div className="topic-badge-wrapper">
            <div className="topic-badge">{formatTopicName(currentTopic)}</div>
          </div>
          <h1>Your {userPreferences.theme} Learning Adventure</h1>
          <p className="level-indicator">
            <span className="level-badge">{userPreferences.level}</span>
            <span className="theme-badge-small">{userPreferences.theme}</span>
          </p>
        </div>
        
        <div className="action-buttons">
          {/* Font Selector */}
          <select 
            className="font-selector"
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            title="Choose Font"
          >
            <option value="Georgia">Georgia</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
            <option value="Comic Sans MS">Comic Sans</option>
            <option value="Palatino">Palatino</option>
            <option value="Garamond">Garamond</option>
          </select>

          {/* Narrate Button */}
          <button 
            className={`btn-icon ${isNarrating ? 'narrating' : ''}`}
            onClick={handleNarrate}
            disabled={!story}
            title={isNarrating ? "Stop Narration" : "Narrate Story"}
          >
            <span className="icon">{isNarrating ? '⏸️' : '🔊'}</span>
            <span className="btn-text">{isNarrating ? 'Stop' : 'Narrate'}</span>
          </button>
          
          <button 
            className={`btn-icon ${isRecording ? 'recording' : ''}`}
            onClick={handleVoiceInput}
            title="Voice Input"
          >
            <span className="icon">🎤</span>
            <span className="btn-text">{isRecording ? 'Stop' : 'Voice'}</span>
          </button>
          
          <button 
            className={`btn-icon ${isVisualizerPlaying ? 'active' : ''}`}
            onClick={toggleVisualizerPlay}
            title="Auto-play visualization"
          >
            <span className="icon">{isVisualizerPlaying ? '⏸' : '▶'}</span>
            <span className="btn-text">{isVisualizerPlaying ? 'Pause' : 'Play'}</span>
          </button>
          
          <button 
            className="btn-icon btn-quiz"
            onClick={() => setShowQuiz(!showQuiz)}
            title="Take Quiz"
          >
            <span className="icon">📝</span>
            <span className="btn-text">Quiz</span>
          </button>
          
          <button 
            className="btn-icon btn-regenerate"
            onClick={generateStory}
            disabled={isLoading}
            title="Generate AI-powered story"
          >
            <span className="icon">{isLoading ? '⏳' : '✨'}</span>
            <span className="btn-text">{isLoading ? 'Generating...' : 'AI Story'}</span>
          </button>
        </div>
      </div>

      {/* Voice Input Feedback */}
      {transcribedText && (
        <div className="transcription-box">
          <span className="icon">🎙️</span>
          <div className="transcription-content">
            <strong>Voice Input:</strong>
            <p>{transcribedText}</p>
            <small style={{ marginTop: '8px', display: 'block', opacity: 0.7, fontSize: '0.85rem' }}>
              💡 <strong>Try saying:</strong> "teach me arrays", "explain stacks", "show me trees", "tell me about graphs", "sorting algorithms", etc.
            </small>
          </div>
          <button 
            className="btn-close-transcription"
            onClick={() => setTranscribedText('')}
          >
            ✕
          </button>
        </div>
      )}

      {/* Quiz Section */}
      {showQuiz && (
        <Quiz topic={currentTopic} onComplete={handleQuizComplete} />
      )}

      {/* Split Screen: Story + Visualizer */}
      <div className="split-view-container">
        {/* Story Content Panel */}
        <div className="story-content-panel">
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner-advanced">
                <div className="spinner-inner"></div>
              </div>
              <h3>🤖 Crafting Your AI Story...</h3>
              <p>Creating an engaging {userPreferences.theme} adventure about {formatTopicName(currentTopic)}</p>
              <div className="loading-dots">
                <span></span><span></span><span></span>
              </div>
              <p style={{marginTop: '15px', fontSize: '0.9em', opacity: 0.7}}>
                ✨ Powered by AI • No API key needed • Free to use
              </p>
            </div>
          ) : (
            <div className="story-card-advanced">
              <div className="story-header-card">
                <div className="floating-particles">
                  <span>✨</span><span>💫</span><span>⭐</span>
                </div>
                <h2>The Tale of {formatTopicName(currentTopic)}</h2>
                <div className="story-meta">
                  <span className="theme-tag">{userPreferences.theme}</span>
                  <span className="level-tag">{userPreferences.level}</span>
                </div>
              </div>
              
              <div className="story-text-content" style={{ fontFamily: selectedFont, fontWeight: '600', fontSize: '1.15rem', lineHeight: '1.8' }}>
                {story ? (
                  story.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="story-paragraph">
                      {paragraph.split(' ').map((word, wIndex) => {
                        const globalIndex = story.substring(0, story.indexOf(paragraph)).split(' ').length + wIndex;
                        const isHighlighted = isNarrating && globalIndex === currentWordIndex;
                        return (
                          <span
                            key={wIndex}
                            className={isHighlighted ? 'highlighted-word' : ''}
                            style={{
                              backgroundColor: isHighlighted ? '#FFD700' : 'transparent',
                              padding: isHighlighted ? '2px 4px' : '0',
                              borderRadius: isHighlighted ? '4px' : '0',
                              transition: 'all 0.2s ease',
                              fontWeight: isHighlighted ? '800' : '600'
                            }}
                          >
                            {word}{' '}
                          </span>
                        );
                      })}
                    </p>
                  ))
                ) : (
                  <div style={{textAlign: 'center', padding: '40px', opacity: 0.7}}>
                    <h3>👋 Welcome!</h3>
                    <p>Click the "AI Story" ✨ button above to generate your personalized AI story</p>
                  </div>
                )}
              </div>
              
              {error && (
                <div className="info-note" style={{
                  background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
                  border: '2px solid #fdcb6e',
                  borderRadius: '8px',
                  padding: '12px',
                  marginTop: '15px'
                }}>
                  <span className="icon">⚠️</span>
                  {error} <br/>
                  <small style={{opacity: 0.8}}>💡 The AI model may be loading. Stories are still educational and engaging!</small>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Visualizer Panel */}
        <div className="visualizer-panel">
          <DSAVisualizer 
            topic={currentTopic} 
            isPlaying={isVisualizerPlaying}
            onStepComplete={() => audioService.playSoundEffect('click')}
            generatedCode={generatedCode}
          />
        </div>
      </div>

      {/* Enhanced Audio Controls Section */}
      <div className="audio-section-advanced">
        <div className="audio-header">
          <h3>🎵 Immersive Audio Experience</h3>
          <div className="volume-control">
            <span className="volume-icon">🔊</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={audioVolume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <span className="volume-value">{Math.round(audioVolume * 100)}%</span>
          </div>
        </div>
        
        <div className="sound-grid-advanced">
          {[
            { type: 'nature', icon: '🌲', label: 'Nature', color: '#10B981' },
            { type: 'battle', icon: '⚔️', label: 'Battle', color: '#EF4444' },
            { type: 'sci-fi', icon: '🚀', label: 'Sci-Fi', color: '#3B82F6' },
            { type: 'mystery', icon: '🔮', label: 'Mystery', color: '#8B5CF6' },
            { type: 'adventure', icon: '🗺️', label: 'Adventure', color: '#F59E0B' },
            { type: 'fantasy', icon: '🧙', label: 'Fantasy', color: '#EC4899' }
          ].map(sound => (
            <button 
              key={sound.type}
              className={`sound-btn-advanced ${backgroundSound === sound.type ? 'active' : ''}`}
              onClick={() => playBackgroundSound(sound.type)}
              style={{ '--theme-color': sound.color }}
            >
              <div className="sound-icon-wrapper">
                <span className="sound-icon">{sound.icon}</span>
                {backgroundSound === sound.type && (
                  <div className="audio-wave">
                    <span></span><span></span><span></span>
                  </div>
                )}
              </div>
              <span className="sound-label">{sound.label}</span>
            </button>
          ))}
        </div>
        
        {backgroundSound && (
          <div className="current-sound-indicator">
            <div className="sound-playing-animation">
              <span></span><span></span><span></span><span></span>
            </div>
            <span className="sound-info">
              Playing <strong>{backgroundSound}</strong> ambiance
            </span>
            <button 
              className="btn-stop"
              onClick={() => {
                audioService.stopBackgroundMusic();
                setBackgroundSound('');
              }}
            >
              Stop ⏹
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;