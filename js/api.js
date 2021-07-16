const KoreanApi = `EE719FB21746F0F92434ACD6A929FC13`;

// 컴퓨터 단어 입력하기
const computerInput = (lastWord) => {
    fetch(`https://stdict.korean.go.kr/api/search.do?key=${KoreanApi}&q=${lastWord}&num=15&advanced=y&method=start&pos=1&letter_s=2&letter_e=6`)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "text/xml");
            const wordCheck = Array.from(xml.getElementsByTagName("total")); // 사전 단어 여부
            const getWord = Array.from(xml.getElementsByTagName("word")); // 단어 가지고 오기
            const i = Math.round(Math.random() * getWord.length); // 랜덤으로 가지고 오기

            if (wordCheck[0].textContent !== "0") {
                if (!undefined) {
                    if (getWord.length === 1) {
                        const computerWord = getWord[0].textContent;
                        const word = computerWord.replace(pattern, '');
                        input.value = computerWord;
                        computerList.push(word);
                        paintComputer(computerWord);
                    } else {
                        const computerWordN = getWord[i].textContent;
                        const word = computerWordN.replace(pattern, '');
                        input.value = computerWordN;
                        computerList.push(word);
                        paintComputer(computerWordN);
                    }
                    setTimeout(() => input.value = input.value.slice(-1), 2000);
                }
            } else {
                location.reload(alert("사람 승리"));
            }

        })
}