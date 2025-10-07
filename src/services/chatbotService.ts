export const getBotResponse = (userMessage: string): string => {
  const responses: { [key: string]: string } = {
    'hello': "Hello! How can I help you with your AI and automation needs?",
    'how are you': "I'm a bot, but I'm doing great! Thanks for asking. How can I assist you?",
    'what do you do': "I'm a smart assistant for Guptally. I can help you with questions about our Generative AI, Machine Learning, and automation solutions. What would you like to know?",
    'tell me about your services': "Guptally offers services in Generative AI, Machine Learning, custom software development, and contact centre chatbot building. We're here to help you automate and innovate!",
    'thanks': "You're welcome! Let me know if you need anything else.",
  };
  const normalizedMessage = userMessage.toLowerCase().trim();
  return responses[normalizedMessage] || "I'm sorry, I don't have a specific response for that. Would you like to know about our services or projects?";
};