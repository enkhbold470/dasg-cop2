import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const campaignData = [
  {
    title: "Q1 2024: Foundations and Exploration",
    content:
      "Focused on foundational coursework at De Anza College and exploring introductory concepts in AI and IoT. Participated in initial hackathons, gaining experience in teamwork and project development. Began exploring 3D printing and its applications in sustainable technology.",
  },
  {
    title: "Q2 2024: Hackathon Season and Professional Development",
    content:
      "Immersed in the hackathon circuit, participating in numerous events across various universities. Secured initial top placements, demonstrating growing technical skills. Attended Apple Developer Meetups and gained insights into Apple's ecosystem. Started working on Bloom AI and Electronic Caffeine projects.",
  },
  {
    title: "Q3 2024:  Deepening Technical Skills and Industry Immersion",
    content:
      "Continued active participation in hackathons and expanded technical expertise by integrating Flask, Next.js, and TypeScript in projects. Attended Google I/O and participated in The Silicon Valley Laboratory (TSVL) bootcamp, gaining valuable industry exposure and entrepreneurial insights.  Made significant progress on GitHub projects and began introducing Neurofocus to a wider audience.",
  },
  {
    title: "Q4 2024:  Academic Advancement and Future Planning",
    content:
      "Focused on advanced coursework at San Jose State University, including Discrete Mathematics and Assembly Language.  Continued contributing to research in machine learning and IoT through the Big Brain Computational Neuroscience Club. Submitted Y Combinator application and reflected on the year's achievements, setting goals for future growth and collaboration in 2025.",
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
        id: data.title,
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
