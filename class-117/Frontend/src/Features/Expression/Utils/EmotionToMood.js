
/**
 * Maps an emotion to a mood.
 * @param {string} emotion - The emotion to map.
 * @return {string} The corresponding mood.
 */

export function emotionToMood(emotion) {

  if (emotion === "happy") return "happy";

  if (emotion === "sad" || emotion === "fearful")
    return "sad";

  if (emotion === "surprised")
    return "surprised";

  return "happy";
}