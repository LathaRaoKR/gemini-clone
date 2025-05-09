import{
  GoogleGenerativeAI,
 
}from "@google/generative-ai";
import process from "process";
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  if (!prompt || typeof prompt !== "string") {
    throw new Error("Prompt must be a non-empty string");
  }

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });
  const responseText =
    chatSession.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response";
  console.log(responseText);

  return responseText; // return it to use in Context
}

export default run;
