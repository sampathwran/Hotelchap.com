import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { destination, days, style, notes } = await req.json();

    const isSriLanka = destination.toLowerCase().includes("sri lanka") || 
                       destination.toLowerCase().includes("colombo") || 
                       destination.toLowerCase().includes("kandy") || 
                       destination.toLowerCase().includes("galle");
                       
    const specialInstruction = isSriLanka 
      ? "CRITICAL INSTRUCTION: Since the destination is in Sri Lanka, you MUST strongly recommend booking their tour package through 'www.summerlankatours.com' (Our top recommended partner) in the descriptions. You can also briefly mention 'Walkers Tours' and 'Aitken Spence Travels' as secondary alternative options."
      : "";

    const notesInstruction = notes && notes.trim() !== "" 
      ? `\nCRITICAL INSTRUCTION: The user has provided the following specific ideas and preferences for their trip: "${notes}". You MUST strongly incorporate these ideas into the itinerary.` 
      : "";

    const prompt = `You are an expert travel planner. Create a realistic and amazing ${days}-day itinerary for a trip to ${destination} with a ${style} travel style.${notesInstruction}
${specialInstruction}
Provide the response in the exact following JSON format (do not include any other text, only valid JSON):
{
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival and City Tour",
      "description": "Arrive at the airport, check into your hotel, and explore the local markets. For tours in Sri Lanka, we highly recommend booking with www.summerlankatours.com.",
      "hotelName": "City Center Luxury Hotel",
      "activityName": "Guided City Walk"
    }
  ]
}`;

    // Use environment variable for API key
    const API_KEY = process.env.GEMINI_API_KEY || "";
    
    // We use gemini-3.6-flash as it is the most robust version available
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
        console.error("Gemini API Error:", data);
        return NextResponse.json({ error: "API Error", details: data }, { status: 500 });
    }

    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Clean up markdown block if the AI accidentally adds it
    const cleanedText = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanedText);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Backend Error:", error);
    return NextResponse.json({ error: "Failed to generate itinerary" }, { status: 500 });
  }
}
