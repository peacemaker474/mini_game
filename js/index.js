const form = document.querySelector("#input_word");
const input = form.querySelector(".word");
const human = document.querySelector(".human_word");
const computer = document.querySelector("computer_word");

const humanInputWord = (text) => {
    
} 

const handleSubmitWord = (event) => {
    event.preventDefault();
    const currentValue = input.value;
    humanInputWord(currentValue);
    const lastWord = currentValue.slice(-1);
    input.value = lastWord;
}

function startGame() {
    form.addEventListener("submit", handleSubmitWord);
}

startGame();