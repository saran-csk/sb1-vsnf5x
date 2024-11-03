import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const API_KEY = 'AIzaSyANsR1Qadh-Sl-hqmrEWomknctS4l93zY0';

if (!API_KEY) {
  throw new Error('Missing Gemini API key');
}

export const genAI = new GoogleGenerativeAI(API_KEY);
export const model = genAI.getGenerativeModel({ model: 'gemini-pro' });