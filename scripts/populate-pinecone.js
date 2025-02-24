import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const campaignData = [
  {
    title: "Candidate Platform - Mental Health & Gaming",
    content:
      "College can be stressful, but taking care of mental health is just as important as academics. Inky Ganbold will organize mental health workshops, gaming nights, and e-sports tournaments to give students a fun way to unwind, socialize, and de-stress. The goal is to build a campus where mental wellness and gaming go hand in hand.",
  },
  {
    title: "Candidate Platform - Startup Pitching Contest",
    content:
      "This contest will connect students with mentors, judges, and potential investors to help turn their ideas into real opportunities. Whether in tech, fashion, food, or social impact, students will have the chance to pitch and build something amazing.",
  },
  {
    title: "Candidate Platform - Resume & LinkedIn Workshops",
    content:
      "Resumes and LinkedIn profiles are crucial for job and internship applications. Inky Ganbold will organize resume-building workshops, mock interviews, and networking events with industry professionals to help students land opportunities and advance in their careers.",
  },
  {
    title: "Candidate Platform - Hackathon for All",
    content:
      "Hackathons are not just for coders! This event will welcome designers, business minds, writers, and problem-solvers to collaborate and create solutions for real-world challenges. Whether developing an app, a marketing strategy, or an art project, this hackathon is for everyone.",
  },
  {
    title: "Why Vote for Inky?",
    content:
      "Inky Ganbold is dedicated to bringing top-tier opportunities to De Anza students, building a strong, supportive community through events, and creating fun and meaningful experiences that prepare students for their future. Vote Inky Ganbold for DASG Chair of Programs – Let’s make De Anza a place of innovation, wellness, and success!",
  },
  {
    title: "Campaign Website",
    content: "https://cop.enk.icu",
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
