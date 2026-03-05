export function getDominantEmotion(expressions) {
  return Object.entries(expressions).reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  )[0];
}

/*
UTILITY FUNCTION

✔ Returns highest probability emotion
✔ Reusable helper for analytics or alerts
*/