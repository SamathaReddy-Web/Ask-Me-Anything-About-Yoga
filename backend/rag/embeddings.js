import { pipeline } from "@xenova/transformers";

let embedder = null;

export async function loadEmbedder() {
  try {
    console.log("Loading embedding model...");

    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
      { quantized: true }   // makes it faster + stable on Windows
    );

    console.log("Embedding model loaded successfully.");
  } catch (err) {
    console.error("Failed to load embedding model:", err);
    throw err;
  }
}

export async function embedChunks(chunks) {
  if (!embedder) {
    throw new Error("Embedder not loaded. Call loadEmbedder() first.");
  }

  if (!chunks || chunks.length === 0) {
    throw new Error("No text chunks provided for embedding.");
  }

  const embeddings = [];

  for (let chunk of chunks) {
    if (!chunk || chunk.trim().length === 0) continue;

    const output = await embedder(chunk, {
      pooling: "mean",
      normalize: true
    });

    embeddings.push(Array.from(output.data));
  }

  if (embeddings.length === 0) {
    throw new Error("No embeddings generated.");
  }

  return embeddings;
}
