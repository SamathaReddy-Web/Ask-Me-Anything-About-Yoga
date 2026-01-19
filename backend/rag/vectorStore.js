// Simple cosine similarity search (FAISS replacement)

function cosineSimilarity(a, b) {
  let dot = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function buildIndex(embeddings) {
  if (!Array.isArray(embeddings) || embeddings.length === 0) {
    throw new Error("Invalid embeddings array");
  }

  console.log("Vector index ready. Total vectors:", embeddings.length);

  return embeddings; // index is just the embeddings list
}

export function searchIndex(index, queryEmbedding, k = 5) {
  if (!index || !Array.isArray(index)) {
    throw new Error("Index not initialized");
  }

  const scores = index.map((vector, i) => ({
    id: i,
    score: cosineSimilarity(vector, queryEmbedding)
  }));

  scores.sort((a, b) => b.score - a.score);

  return scores.slice(0, k).map(s => s.id);
}
