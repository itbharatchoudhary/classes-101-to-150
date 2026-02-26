export function getDominantEmotion(expressions) {
  return Object.entries(expressions).reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  )[0];
}

/*
Utility helper:
Finds emotion with highest probability.
Useful for analytics or alerts.
*/