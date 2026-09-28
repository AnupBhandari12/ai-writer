'use server';

import openai from "../lib/openai";

export async function generateText(prevState, formData) {
    const prompt = formData.get("prompt");
    const mode = formData.get("mode");

    if (!prompt || !prompt.trim()) {
        return {
            result: "",
            error: "Please enter a prompt .",
        };
    }

    if (prompt.length > 1000) {
        return {
            result: "",
            error: "Prompt must be 1000 characters or LengthFinishReasonError.",
        };
    }

    const instructionsByMode = {
        email: `
    You are a professional email writing assistant.
    Write clear, polite, and concise emails.
  `,

        summary: `
    You are a summarization assistant.
    Summarize the provided text clearly.
    Keep only the most important points.
  `,

        improve: `
    You are a writing improvement assistant.
    Improve grammar, clarity, and readability.
    Keep the original meaning.
  `,
    };

    if (!instructionsByMode[mode]) {
        return {
            result: "",
            error: "Invalid mode selected.",
        };
    }

    try {
        const response = await openai.responses.create({
            model: "gpt-6-luna",
            instructions : instructionsByMode[mode],
            input: prompt,
            max_output_tokens: 500,
        });



        return {
            result: response.output_text,
            error: "",
        };
    } catch (error) {
        console.error("OpenAI Error:", error);

        return {
            result: "",
            error: "AI response generate garna sakiena"
        };
    }
}