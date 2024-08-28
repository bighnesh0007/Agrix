import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Validate the incoming form data
      const {
        cropType,
        region,
        soilType,
        season,
        sowingDate,
        expectedHarvestDate,
      } = req.body;

      if (!cropType || !region || !soilType || !season || !sowingDate || !expectedHarvestDate) {
        return res.status(400).json({ error: 'Please fill out all required fields.' });
      }

      // Define the prompt for generating the crop roadmap
      const prompt = `
        Generate a detailed crop roadmap based on the following information:
        ${JSON.stringify(req.body, null, 2)}
        
        Please provide a comprehensive roadmap including:
        1. Pre-planting preparations
        2. Planting process
        3. Growth stages and care instructions
        4. Pest and disease management
        5. Irrigation and fertilization schedule
        6. Harvest preparation and timing
        7. Post-harvest handling and storage
        
        Format the roadmap in HTML for easy display.
      `;

      // Call the Google Gemini model to generate the content
      const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);

      if (!result) {
        throw new Error('Failed to generate roadmap content.');
      }

      const roadmap = result; // Assuming `result.text` contains the response text

      res.status(200).json({ result: roadmap });
    } catch (error) {
      console.error('Error generating roadmap:', error);
      res.status(500).json({ error: 'Failed to generate roadmap. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
