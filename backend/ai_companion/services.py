import google.generativeai as genai
import os

class GeminiService:
    def __init__(self):
        # Configure the Gemini API
        genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
        
        # Set up the model
        self.model = genai.GenerativeModel('gemini-pro')
    
    def generate_response(self, prompt):
        try:
            # Generate response from Gemini
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Error generating response: {e}")
            return "I'm having trouble processing that right now."

gemini_service = GeminiService()
