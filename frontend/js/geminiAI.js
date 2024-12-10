const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  async function initGeminiAI() {
    try {
      // Explicitly check for API key
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set");
      }
      const apiKey = process.env.GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
      });
      const generationConfig = {
        temperature: 2,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };
  
      return { model, generationConfig };
    } catch (error) {
      console.error("Error initializing Gemini AI:", error.message);
      throw error;
    }
  }
  
  async function startGeminiChat(input) {
    try {
      const { model, generationConfig } = await initGeminiAI();
      
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [{ text: "hi\n" }],
          },
          {
            role: "model",
            parts: [{ text: "Hi there! How can I help you today?\n" }],
          },
        ],
      });
  
      const result = await chatSession.sendMessage(input);
      return result.response.text();
    } catch (error) {
      console.error("Error in Gemini chat:", error.message);
      throw error;
    }
  }
  
  // Export functions if using modules, otherwise they'll be global
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { startGeminiChat, initGeminiAI };
  }