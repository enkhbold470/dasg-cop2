import { json } from "@sveltejs/kit";
import OpenAI from "openai";
import {
  OPENAI_API_KEY,
  PINECONE_API_KEY,
  PINECONE_INDEX,
} from "$env/static/private";
import { Pinecone } from "@pinecone-database/pinecone";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Initialize Pinecone client
const pc = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

const index = pc.Index(PINECONE_INDEX);

export async function POST({ request }) {
  try {
    const { message } = await request.json();
    console.log("Processing message:", message);

    // Get embeddings for the user's message
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      dimensions: 1024,
      input: message,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // Query Pinecone with the embedding
    const queryResponse = await index.query({
      vector: embedding,
      topK: 5,
      includeMetadata: true,
    });

    // Extract relevant context from Pinecone results
    const context = queryResponse.matches
      .map((match) => match.metadata?.text || "")
      .join("\n");

    // Get completion from OpenAI with context
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant for the De Anza Student Government (DASG) Chair of Programs election campaign. 
          You help answer questions about the campaign, policies, and initiatives.
          Format your responses using Markdown for better readability:
          - Use bullet points for lists
          - Use headers for sections
          - Use bold for emphasis
          - Use links when referencing URLs
          - Use blockquotes for important quotes
          
          Use the following context to inform your responses: ${context}`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 1,
      max_tokens: 500, // Increased token limit for more detailed responses
    });

    return json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return json(
      {
        error: "Failed to process your request",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
