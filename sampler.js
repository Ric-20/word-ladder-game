const wordBox1 = document.getElementById('word-box1');
const wordBox2 = document.getElementById('word-box2');
const messageElement = document.getElementById('message');

let activeWord = 1;

const validWords = ['BAT', 'BAD'];

function updateWordBox(wordBox, letter) {
  let currentText = wordBox.textContent;
  const underscoreIndex = currentText.indexOf('_'); 

  if (underscoreIndex !== -1) {
    currentText = currentText.substring(0, underscoreIndex) + letter + currentText.substring(underscoreIndex + 1);
    wordBox.textContent = currentText;
  }
}

function checkWord() {
  const word1 = wordBox1.textContent.trim();
  const word2 = wordBox2.textContent.trim();


  if (validWords.includes(word1) && validWords.includes(word2)) {
    messageElement.textContent = `Correct! Word 1: ${word1} and Word 2: ${word2}. Congratulations! Both words are correct!`;
  } else if (validWords.includes(word1)) {
    messageElement.textContent = `Correct! Word 1: ${word1}`;
  } else if (validWords.includes(word2)) {
    messageElement.textContent = `Correct! Word 2: ${word2}`;
  } else {
    messageElement.textContent = "Try again!";
  }
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
  key.addEventListener('click', () => {
    const letter = key.getAttribute('data-letter');

    if (activeWord === 1 && wordBox1.textContent.includes('_')) {
      updateWordBox(wordBox1, letter);
    } else if (activeWord === 2 && wordBox2.textContent.includes('_')) {
      updateWordBox(wordBox2, letter);
    }

    if (!wordBox1.textContent.includes('_') && activeWord === 1) {
      activeWord = 2;
      checkWord();
    }

    if (!wordBox2.textContent.includes('_') && activeWord === 2) {
      activeWord = 1;
      checkWord(); 
    }
  });
});
