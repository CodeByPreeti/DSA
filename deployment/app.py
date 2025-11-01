import gradio as gr
from transformers import pipeline, set_seed
import time
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the model once at startup - this prevents cold starts!
logger.info("🚀 Loading DialoGPT-medium for DSA storytelling...")
try:
    story_generator = pipeline(
        'text-generation', 
        model='microsoft/DialoGPT-medium',
        device=0,  # Use GPU
        torch_dtype='auto'
    )
    set_seed(42)
    logger.info("✅ Model loaded successfully! Ready for stories.")
except Exception as e:
    logger.error(f"❌ Model loading failed: {e}")
    raise

def create_dsa_prompt(topic, theme, level):
    """Create optimized prompts for DSA storytelling"""
    
    topic_formatted = topic.replace('-', ' ').title()
    
    # Level-specific instructions
    level_instructions = {
        'beginner': f"Explain {topic_formatted} to a complete beginner using simple, everyday analogies. Avoid technical jargon. Make it fun and easy to understand for someone new to programming.",
        'advanced': f"Explain {topic_formatted} with technical depth. Include time/space complexity, real-world applications, and implementation details. Use proper computer science terminology."
    }
    
    # Theme-specific story frameworks
    theme_frameworks = {
        'adventure': f"Create an exciting adventure story where the hero must understand {topic_formatted} to overcome challenges and complete their quest. Include dramatic moments and character development.",
        'sci-fi': f"Write a science fiction story where {topic_formatted} is a crucial technology in a futuristic world. Use space, AI, and advanced technology concepts to explain the data structure.",
        'mystery': f"Craft a detective mystery where understanding {topic_formatted} helps solve an intriguing case. Include clues, puzzles, and revelations that teach the concept.",
        'fantasy': f"Create a fantasy tale with magical elements representing {topic_formatted}. Use wizards, spells, magical creatures, and kingdoms to explain the data structure in an enchanting way."
    }
    
    prompt = f"""{theme_frameworks[theme]}

{level_instructions[level]}

Story Requirements:
- Length: 250-350 words
- Include a clear analogy that explains {topic_formatted}
- Make it engaging and educational
- End with a key takeaway

Story:"""
    
    return prompt

def generate_dsa_story(topic, theme, level):
    """Generate DSA stories with error handling"""
    try:
        prompt = create_dsa_prompt(topic, theme, level)
        
        logger.info(f"Generating story: {topic}, {theme}, {level}")
        
        # Generate with optimized parameters for storytelling
        result = story_generator(
            prompt,
            max_length=450,
            temperature=0.85,  # More creative
            top_p=0.92,
            do_sample=True,
            num_return_sequences=1,
            pad_token_id=50256,
            repetition_penalty=1.15,
            no_repeat_ngram_size=3
        )
        
        # Extract and clean the story
        generated_text = result[0]['generated_text']
        story = generated_text.replace(prompt, '').strip()
        
        # Clean up any weird formatting
        story = '\n'.join([line.strip() for line in story.split('\n') if line.strip()])
        
        logger.info(f"✅ Story generated successfully! Length: {len(story)} chars")
        return story
        
    except Exception as e:
        error_msg = f"Error generating story: {str(e)}"
        logger.error(error_msg)
        return error_msg

# Enhanced fallback stories
FALLBACK_STORIES = {
    'arrays': {
        'beginner': "Imagine you have a row of numbered treasure chests in your adventure camp. Each chest has a number starting from 0, and you can instantly open any chest if you know its number! This is exactly how arrays work in programming - they let you store multiple items and access them quickly using their position (index). In your coding adventures, arrays help you organize data neatly for fast retrieval!",
        'advanced': "Arrays provide O(1) random access through contiguous memory allocation, making them ideal for scenarios requiring frequent element access. However, insertion and deletion operations cost O(n) due to element shifting. In memory, arrays occupy sequential blocks, enabling CPU cache optimization through spatial locality. This makes them fundamental for implementing other data structures and algorithms."
    },
    'linked-lists': {
        'beginner': "Picture a magical treasure hunt where each clue points to the next location! Linked lists work exactly like this - each piece of data (node) contains both the treasure (data) and a map to the next treasure (pointer). Unlike arrays, you don't need to know all positions in advance, making linked lists perfect for dynamic adventures where you're discovering new treasures along the way!",
        'advanced': "Linked lists utilize dynamic memory allocation with O(1) insertion/deletion at head, but O(n) access time. Each node contains data and a pointer to the next node, enabling efficient memory usage without pre-allocation. Ideal for implementing stacks, queues, and adjacency lists in graphs. Memory overhead exists for pointers, but flexibility in size adjustment provides significant advantages in dynamic scenarios."
    }
}

def get_fallback_story(topic, theme, level):
    """Enhanced fallback stories"""
    topic_key = topic.lower()
    level_key = level.lower()
    
    if topic_key in FALLBACK_STORIES and level_key in FALLBACK_STORIES[topic_key]:
        return FALLBACK_STORIES[topic_key][level_key]
    
    return f"Welcome to your {theme} adventure learning {topic}! As a {level} learner, you'll discover how this data structure works through engaging stories and practical examples that make complex concepts easy to understand."

# Create Gradio interface
with gr.Blocks(
    title="DSA Storyteller API",
    theme=gr.themes.Soft(),
    css="""
    .container { max-width: 800px; margin: 0 auto; }
    .story-output { min-height: 200px; }
    """
) as demo:
    gr.Markdown("""
    # 📚 DSA Storyteller API
    **Generate engaging educational stories for Data Structures & Algorithms**
    
    *Powered by Hugging Face Spaces • Always Warm • Instant Responses*
    """)
    
    with gr.Row():
        with gr.Column():
            topic = gr.Dropdown(
                choices=["arrays", "stacks", "queues", "linked-lists", "trees", "graphs", "sorting", "recursion"],
                label="📖 DSA Topic",
                value="arrays",
                info="Choose which data structure to learn about"
            )
            
            theme = gr.Dropdown(
                choices=["adventure", "sci-fi", "mystery", "fantasy"],
                label="🎭 Story Theme", 
                value="adventure",
                info="Select the storytelling style"
            )
            
            level = gr.Dropdown(
                choices=["beginner", "advanced"],
                label="🎓 Difficulty Level",
                value="beginner", 
                info="Choose your experience level"
            )
            
            generate_btn = gr.Button(
                "✨ Generate Story",
                variant="primary",
                size="lg"
            )
        
        with gr.Column():
            output = gr.Textbox(
                label="📖 Your DSA Story",
                lines=8,
                max_lines=12,
                show_copy_button=True,
                container=False
            )
    
    # Examples for users
    gr.Markdown("### 💡 Try These Examples:")
    gr.Examples(
        examples=[
            ["arrays", "adventure", "beginner"],
            ["linked-lists", "sci-fi", "advanced"],
            ["trees", "fantasy", "beginner"],
            ["graphs", "mystery", "advanced"]
        ],
        inputs=[topic, theme, level],
        outputs=output,
        fn=generate_dsa_story,
        cache_examples=True
    )
    
    # Connect the button
    generate_btn.click(
        fn=generate_dsa_story,
        inputs=[topic, theme, level],
        outputs=output,
        api_name="generate_story"
    )

# Health check endpoint
@app.route('/health')
def health_check():
    return {"status": "healthy", "model_loaded": True}

if __name__ == "__main__":
    demo.launch(
        server_name="0.0.0.0",
        server_port=7860,
        share=False,  # Set to True if you want public URL
        show_error=True
    )