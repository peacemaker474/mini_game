const form = document.querySelector("#input_word");
const input = form.querySelector(".word");
const human = document.querySelector(".human_word");
const computer = document.querySelector(".computer_word");

const computerInputWord = (text) => {
    const li = document.createElement("li");
    const pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
    text = text.replace(pattern, '');
    li.textContent = text;
    computer.appendChild(li);
}

const humanInputWord = (text) => {
    const li = document.createElement("li");
    li.textContent = text;
    human.appendChild(li);
}

const handleSubmitWord = (event) => {
    event.preventDefault();
    const currentValue = input.value;
    humanInputWord(currentValue);
    const lastWord = currentValue.slice(-1);
    input.value = lastWord;
    getKorea(lastWord);

}

const handleOnlyKorea = () => {
    const pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
    input.value = input.value.replace(pattern, '');
}

function startGame() {
    input.addEventListener("keyup", handleOnlyKorea);
    form.addEventListener("submit", handleSubmitWord);
}

startGame();
