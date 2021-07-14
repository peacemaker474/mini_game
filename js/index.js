const form = document.querySelector("#input_word");
const input = form.querySelector(".word");
const human = document.querySelector(".human_word");
const computer = document.querySelector(".computer_word");

const KoreanApi = `EE719FB21746F0F92434ACD6A929FC13`;

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

const getKorea = (lastWord) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", `https://stdict.korean.go.kr/api/search.do?key=${KoreanApi}&q=${lastWord}&num=15&advanced=y&method=start&pos=1&letter_s=2&letter_e=6`, false);
    xmlHttp.send();
    if (xmlHttp.status == 200) {
        const data = Array.from(xmlHttp.responseXML.all);
        const check = data.filter(item => item.tagName === "total");
        const word = data.filter(item => item.tagName === "word");
        let i = Math.round(Math.random() * word.length);
        if (check[0].textContent !== "0") {
            if (!undefined) {
                if (word.length === 1) {
                    const computerWord = word[0].textContent;
                    input.value = computerWord;
                    computerInputWord(computerWord)
                } else {
                    const computerWordN = word[i].textContent;
                    input.value = computerWordN;
                    computerInputWord(computerWordN);
                }
                setTimeout(() => { input.value = input.value.slice(-1) }, 2000);
            } else {
                input.value = "승리자"
            }
        } else {
            input.value = "승리자";
        }
    } else {
        console.log("통신 실패");
    }
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