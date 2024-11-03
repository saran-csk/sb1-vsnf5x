import { Level, Question } from '../types';
import { model } from '../config/gemini';

export async function getTopicsFromAI(courseTitle: string, level: Level): Promise<string[]> {
  try {
    const prompt = `Generate a list of 5 main topics for a ${level} level course titled "${courseTitle}". Return only the topic names, one per line, without numbers or bullets.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const topics = response.text().trim().split('\n');
    
    return topics.filter(topic => topic.length > 0);
  } catch (error) {
    console.error('Error getting topics:', error);
    throw new Error('Failed to fetch topics. Please try again.');
  }
}

export async function getQuestionsFromAI(topic: string): Promise<Question[]> {
  try {
    const prompt = `Generate 10 multiple choice questions about "${topic}". For each question:
1. Start with the question text
2. Then provide 4 options labeled A, B, C, D
3. Separate each question with a blank line
Format example:
What is X?
A) First option
B) Second option
C) Third option
D) Fourth option`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const questionBlocks = response.text().trim().split('\n\n');
    
    return questionBlocks
      .filter(block => block.trim().length > 0)
      .slice(0, 10)
      .map(block => {
        const lines = block.trim().split('\n');
        const questionText = lines[0].trim();
        const options = lines.slice(1, 5).map((line, index) => ({
          label: String.fromCharCode(65 + index) as 'A' | 'B' | 'C' | 'D',
          text: line.substring(3).trim()
        }));

        return {
          text: questionText,
          options,
          userAnswer: ''
        };
      });
  } catch (error) {
    console.error('Error getting questions:', error);
    throw new Error('Failed to fetch questions. Please try again.');
  }
}

export async function getAnswersFromAI(questions: Question[]): Promise<string[]> {
  try {
    const prompt = `For each of these multiple choice questions, provide the correct answer as a single letter (A, B, C, or D). Return only the letters, one per line:

${questions.map(q => `${q.text}
${q.options.map(opt => `${opt.label}) ${opt.text}`).join('\n')}`).join('\n\n')}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answers = response.text().trim().split('\n');
    
    return answers
      .filter(answer => /^[A-D]$/i.test(answer.trim()))
      .map(answer => answer.trim().toUpperCase());
  } catch (error) {
    console.error('Error getting answers:', error);
    throw new Error('Failed to fetch answers. Please try again.');
  }
}