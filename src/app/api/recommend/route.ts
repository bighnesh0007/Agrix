import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { soilType, location, timeInHand, rainfall, temperature, humidity } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Based on the following information, recommend suitable crops to grow:
    Soil Type: ${soilType}
    Location: ${location}
    Time Available: ${timeInHand} months
    Average Rainfall: ${rainfall} mm
    Average Temperature: ${temperature}°C
    Average Humidity: ${humidity}%

    Please provide a list of 3-5 recommended crops, along with a brief explanation for each recommendation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ recommendation: text });
  } catch (error) {
    console.error("Error generating crop recommendation:", error);
    return NextResponse.json({ error: "Failed to generate crop recommendation" }, { status: 500 });
  }
}