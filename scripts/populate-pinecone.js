import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const campaignData = [
  {
    title: "How can I vote for Inky?",
    content:
      "You can vote for Inky by going to the De Anza Student Government Candidate voting website and voting for Inky. You can also vote for Inky by going to the De Anza Student Government Candidate voting website and voting for Inky. https://deanza.edu/studentvote/ is the official website for the voting.",
  },
  
  
];

async function populatePinecone() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const index = pc.Index(process.env.PINECONE_INDEX);

  console.log("Creating embeddings and upserting to Pinecone...");

  for (const data of campaignData) {
    const text = `${data.title}\n${data.content}`;

    // Create embedding
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      dimensions: 1024,
      input: text,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // Upsert to Pinecone
    await index.upsert([
      {
        id: data.title.toLowerCase().replace(/ /g, "-"),
        values: embedding,
        metadata: {
          title: data.title,
          text: text,
        },
      },
    ]);

    console.log(`Upserted: ${data.title}`);
  }

  console.log("Finished populating Pinecone!");
}

populatePinecone().catch(console.error);
