const unsafeKeywords = [
  "pregnant", "pregnancy", "hernia", "surgery",
  "blood pressure", "bp", "glaucoma", "injury",
  "slip disc", "heart", "back pain"
];

export const safetyCheck = (query) => {
  const lower = query.toLowerCase();

  for (let word of unsafeKeywords) {
    if (lower.includes(word)) {
      return { isUnsafe: true, riskLevel: "high" };
    }
  }

  return { isUnsafe: false, riskLevel: "low" };
};
