# DSA Storyteller API

A deployed model for generating educational stories about Data Structures and Algorithms.

## Features
- 🚀 Always warm - no cold starts
- 🎭 Multiple story themes
- 🎓 Beginner & Advanced levels
- ⚡ Fast inference on GPU
- 📚 8+ DSA topics covered

## API Usage
```python
import requests

response = requests.post(
    "https://yourusername-dsa-storyteller-api.hf.space/api/generate_story",
    json={
        "topic": "arrays", 
        "theme": "adventure",
        "level": "beginner"
    }
)
story = response.json()