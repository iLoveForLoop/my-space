import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "./prompt";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request. Messages array is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    // Check if the API key is not set or remains the default placeholder
    if (!apiKey || apiKey === "your_openrouter_api_key_here") {
      return NextResponse.json({
        choices: [
          {
            message: {
              role: "assistant",
              content: "⚠️ **API Key Not Configured**: Please configure your OpenRouter API key inside the `.env.local` file by setting `OPENROUTER_API_KEY=your_actual_key` and restarting the Next.js server to enable the live chatbot!",
            },
          },
        ],
      });
    }

    // Call OpenRouter completions endpoint
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        // "HTTP-Referer": "http://localhost:3000",
        // "X-Title": "Jeferson Bayking Portfolio",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free", // Standard, fast, and highly capable model
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API Error Response:", errorText);
      return NextResponse.json(
        { error: `OpenRouter returned an error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Backend Chat Handler Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
