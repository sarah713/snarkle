const calculateScore = (attempts, correctGuess) => {
  const baseScore = 100; // You can adjust this as needed
  const deductionPerAttempt = 10; // You can adjust this as needed

  let score = baseScore;

  // Deduct points for each attempt
  score -= attempts * deductionPerAttempt;

  // If the guess is correct, add a bonus score
  if (correctGuess) {
    const bonusScore = 50; // You can adjust this as needed
    score += bonusScore;
  }

  // Ensure the score is not negative
  if (score < 0) {
    score = 0;
  }

  return score;
};

export default calculateScore;
