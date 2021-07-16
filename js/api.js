const KoreanApi = `1A09521BBDB9891B2B8E44E67B21199F`;

// 컴퓨터 단어 입력하기
const computerInput = (lastWord) => {
    fetch(`https://opendict.korean.go.kr/api/search?key=${KoreanApi}&q=${lastWord}&num=15&sort=popular&method=start&advanced=y&pos=1&letter_s=2&letter_e=6`)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "text/xml");
            const wordCheck = Array.from(xml.getElementsByTagName("total")); // 사전 단어 여부
            const getWord = Array.from(xml.getElementsByTagName("word")); // 단어 가지고 오기
            const i = Math.round(Math.random() * getWord.length); // 랜덤으로 가지고 오기

            if (wordCheck[0].textContent !== "0") {
                if (!undefined) { // 받아서 입력하는 부분에서 또 다시 undefined가 뜸...
                    if (getWord.length === 1) {
                        const computerWord = getWord[0].textContent;
                        const word = computerWord.replace(pattern, '');
                        input.value = computerWord;
                        wordList.push(word);
                        paintComputer(computerWord);
                    } else {
                        const computerWordN = getWord[i].textContent;
                        const word = computerWordN.replace(pattern, '');
                        input.value = computerWordN;
                        wordList.push(word);
                        paintComputer(computerWordN);
                    }
                    setTimeout(() => input.value = input.value.slice(-1), 2000);
                }
            } else {
                location.reload(alert("사람 승리"));
            }
        })
}