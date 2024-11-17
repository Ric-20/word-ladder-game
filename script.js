let level = "easy";
let startWord = "cat";
let endWord = "dog";
let score = 0;
let timeLeft = 60; // 60 seconds per level

// Timer setup
function startTimer() {
  const timer = document.getElementById("timer");
  const interval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timer.textContent = timeLeft;
    } else {
      clearInterval(interval);
      document.getElementById("message").textContent = "Time's up! You lost.";
      document.getElementById("submit-word").disabled = true;
    }
  }, 1000);
}

startTimer();

// Submit word handler with scoring
document.getElementById("submit-word").addEventListener("click", async () => {
  const inputWord = document.getElementById("input-word").value.trim().toLowerCase();

  if (await validateWord(inputWord)) {
    if (isOneLetterChange(startWord, inputWord)) {
      startWord = inputWord;
      document.getElementById("start-word").textContent = startWord;

      // Award points
      score += 10;
      document.getElementById("score").textContent = score;

      if (startWord === endWord) {
        document.getElementById("message").textContent = "Congratulations! You completed the puzzle.";
        clearInterval(interval);
      } else {
        document.getElementById("message").textContent = "Good! Keep going.";
      }
    } else {
      document.getElementById("message").textContent = "Word must change by exactly one letter.";
      score -= 5; // Deduct points for invalid moves
      document.getElementById("score").textContent = score;
    }
  } else {
    document.getElementById("message").textContent = "Invalid word. Try again.";
    score -= 5; // Deduct points for invalid moves
    document.getElementById("score").textContent = score;
  }
});

// Dynamic level handling (optional feature)
function setLevel(newLevel) {
  level = newLevel;
  document.getElementById("level").textContent = level.charAt(0).toUpperCase() + level.slice(1);
  // Update the words based on level
}

// Backend word validation
async function validateWord(word) {
  const response = await fetch("/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word })
  });
  const data = await response.json();
  return data.valid;
}

function isOneLetterChange(word1, word2) {
  if (word1.length !== word2.length) return false;
  let changes = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) changes++;
  }
  return changes === 1;
}
