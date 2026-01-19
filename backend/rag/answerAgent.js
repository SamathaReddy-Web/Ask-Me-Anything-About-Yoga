import Groq from "groq-sdk";
import { webSearch } from "./searchAgent.js";
import { scrapePage } from "./scraper.js";
import { chunkText } from "./chunker.js";
import { loadEmbedder, embedChunks } from "./embeddings.js";
import { buildIndex, searchIndex } from "./vectorStore.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

let embedderLoaded = false;

// Load embedder safely (prevents backend crash)
async function ensureEmbedder() {
  if (!embedderLoaded) {
    console.log("Initializing embedder...");
    await loadEmbedder();
    embedderLoaded = true;
    console.log("Embedder ready.");
  }
}

export async function runRAGPipeline(query, profile) {
  try {
    await ensureEmbedder();

    console.log("Running RAG pipeline for:", query);

    const results = await webSearch(query);

    if (!results || results.length === 0) {
      throw new Error("No web search results found.");
    }

    let documents = [];

    for (let r of results) {
      try {
        const text = await scrapePage(r.url);
        if (text && text.trim().length > 100) {
          documents.push({ text, source: r.url });
        }
      } catch (err) {
        console.warn("Scrape failed:", r.url);
      }
    }

    if (documents.length === 0) {
      throw new Error("No valid documents scraped.");
    }

    let chunks = [];

    documents.forEach(d => {
      const c = chunkText(d.text);
      c.forEach(chunk => {
        if (chunk.trim().length > 50) {
          chunks.push({ content: chunk, source: d.source });
        }
      });
    });

    if (chunks.length === 0) {
      throw new Error("No valid chunks created.");
    }

    const texts = chunks.map(c => c.content);
    const embeddings = await embedChunks(texts);

    if (!embeddings || embeddings.length === 0) {
      throw new Error("Embeddings generation failed.");
    }

    const index = buildIndex(embeddings);

    const queryEmbedding = (await embedChunks([query]))[0];
    const ids = searchIndex(index, Array.from(queryEmbedding), 5);

    const validIds = ids.filter(id => id >= 0 && id < chunks.length);

    const context = validIds.map(id => chunks[id].content).join("\n\n");
    const sources = [...new Set(validIds.map(id => chunks[id].source))];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a professional yoga wellness assistant. Use only the given context."
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${query}`
        }
      ]
    });

    const answer = completion.choices[0].message.content;

    return { answer, sources };

  } catch (err) {
    console.error("RAG Pipeline Error:", err.message);
    throw err;
  }
}
