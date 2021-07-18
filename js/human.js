const form = document.querySelector("#input_word");
const input = form.querySelector(".word"); // 단어 입력창
const currentWord = document.querySelector(".current_word"); // 단어
const description = document.querySelector(".word_description"); // 단어 설명
const humanCheck = document.querySelector(".human_check"); // 중복 단어 체크 li
const computerCheck = document.querySelector(".computer_check"); // 중복 단어 체크 li

const pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g; // 한글만 입력, 정규표현식
let myWordB = false; // 내가 입력한 단어 사전 유무체크
let wordList = []; // 중복 단어 체크
let beforeAfter = ""; // 단어 앞뒤 체크

// 사전 유무 체크
const checkWord = (inputWord) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", `https://wordvs.herokuapp.com/https://opendict.korean.go.kr/api/search?key=${KoreanApi}&q=${inputWord}&advanced=y&pos=1`, false);
    xmlHttp.send(null);
    if (xmlHttp.status == 200) {
        const data = Array.from(xmlHttp.responseXML.all);
        const checkInput = data.filter(item => item.tagName === "total");
        const sameWord = data.filter(item => item.tagName === "word");
        const expectWord = sameWord.map(item => item.textContent = item.textContent.replace(pattern, ''));
        if (checkInput[0].textContent !== "0") {
            const LastCheck = expectWord
                .map(item => item === inputWord)
                .filter(item => item === true);
            if (LastCheck[0]) {
                wordList.push(inputWord); // 중복 단어 체크를 위한 배열
                paintWord(inputWord); // 내가 입력한 단어 보여주기
                humanCheck.textContent = ""; // 만약 중복 단어가 있고, 다시 입력했을시 빈값으로 만들어줌.
                return myWordB = true;
            }
        } else {
            return myWordB = false;
        }
    } else {
        console.log("데이터를 받아오지 못 했수다.");
    }
}

// 현재 단어 및 설명 보여주기
const paintWord = (text) => {
    text = text.replace(pattern, '');
    currentWord.textContent = text;
}

const handleSubmitWord = (event) => {
    event.preventDefault();
    let currentValue = input.value;
    const sendValue = currentValue;
    const lastWord = currentValue.slice(-1); // 단어 뒷 글자
    const forWard = currentValue.slice(0, 1); // 단어 앞 글자
    let checking;
    if (wordList.length >= 2) {
        const againWordCheck = wordList.find(item => item === currentValue);
        checking = againWordCheck;
    }
    if (beforeAfter.length === 0 || forWard === beforeAfter.slice(-1)) { // 앞뒤 단어 체크
        if (!checking) { // 중복 단어 체크
            checkWord(currentValue);
            if (myWordB) { // 내가 입력한 단어가 사전에 있을시, 게임은 계속
                computerInput(lastWord, sendValue);
                description.textContent = "";
            } else { // 없을 시 게임은 끝
                location.reload(alert("컴퓨터 승리"));
            }
        } else {
            currentValue = "";
            input.value = "";
            humanCheck.textContent = "중복된 단어가 있습니다.";
        }
    } else {
        alert("다시 입력하세요");
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