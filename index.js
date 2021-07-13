const form = document.querySelector("#input_word");
const input = form.querySelector(".word");
const human = document.querySelector(".human_word");
const computer = document.querySelector("computer_word");

const KoreanApi = `EE719FB21746F0F92434ACD6A929FC13`;

const humanInputWord = (text) => {

}

const handleSubmitWord = (event) => {
    event.preventDefault();
    const currentValue = input.value;
    humanInputWord(currentValue);
    const lastWord = currentValue.slice(-1);
    input.value = lastWord;

    function getKorea() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", `https://stdict.korean.go.kr/api/search.do?key=${KoreanApi}&q=${lastWord}&num=15&advanced=y&method=start&pos=1&letter_s=2`, false);
        xmlHttp.send();
        if (xmlHttp.status == 200) {
            const data = Array.from(xmlHttp.responseXML.all);
            const word = data.filter(item => item.tagName === "word");
            let i = Math.round(Math.random() * word.length);
            if (word[i].textContent.length === 1) {
                input.value = word[0].textContent;
                console.log(word[0].text, "성공");
            } else {
                input.value = word[i].textContent;
                console.log(word, "실패");
            }
            setTimeout(() => { input.value = input.value.slice(-1) }, 2000);
        } else {
            console.log("통신 실패");
        }
    }

    getKorea();

}

function startGame() {
    form.addEventListener("submit", handleSubmitWord);
}

startGame();