const form = document.querySelector("#input_word");
const input = form.querySelector(".word");
const human = document.querySelector(".human_word");
const computer = document.querySelector(".computer_word");

const pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g; // 한글만 입력, 정규표현식
let whosWin = false; // 내가 입력한 단어 사전 유무체크
let wordList = [];

// 사전 유무 체크
const checkWord = (inputWord) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", `https://opendict.korean.go.kr/api/search?key=${KoreanApi}&q=${inputWord}&advanced=y&pos=1`, false);
    xmlHttp.send(null);
    if (xmlHttp.status == 200) {
        const data = Array.from(xmlHttp.responseXML.all);
        const checkInput = data.filter(item => item.tagName === "total");
        const sameWord = data.filter(item => item.tagName === "word");
        const expectWord = sameWord.map(item => item.textContent = item.textContent.replace(pattern, ''));
        if (checkInput[0].textContent !== "0") {
            const inputCheck = expectWord.map(item => item === inputWord);
            const LastCheck = inputCheck.filter(item => item === true);
            if (LastCheck[0]) {
                wordList.push(inputWord);
                return whosWin = true;
            }
        } else {
            return whosWin = false;
        }
    }
}

// 컴퓨터 입력시 ul 반영
const paintComputer = (text) => {
    const li = document.createElement("li");
    text = text.replace(pattern, '');
    li.textContent = text;
    computer.appendChild(li);
}
// 사람 입력시 ul 반영
const paintHuman = (text) => {
    const li = document.createElement("li");
    li.textContent = text;
    human.appendChild(li);
}

const handleSubmitWord = (event) => {
    event.preventDefault();
    let currentValue = input.value;
    let checking;
    if (wordList.length >= 2) {
        const againWordCheck = wordList.find(item => item === currentValue);
        checking = againWordCheck;
    }
    if (!checking) { // 중복 단어 체크
        checkWord(currentValue);
        if (whosWin) {
            paintHuman(currentValue);
            const lastWord = currentValue.slice(-1);
            input.value = lastWord;
            computerInput(lastWord);
        } else {
            location.reload(alert("컴퓨터 승리"));
        }
    } else {
        currentValue = "";
        input.value = "";
    }
}

const handleOnlyKorea = () => {
    input.value = input.value.replace(pattern, '');
}

function startGame() {
    input.addEventListener("keyup", handleOnlyKorea);
    form.addEventListener("submit", handleSubmitWord);
}

startGame();