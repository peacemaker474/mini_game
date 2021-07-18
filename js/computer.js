const KoreanApi = `E12ACB776EEB4ADFB01C66EE3F4FC14E`;

// 컴퓨터 단어 입력하기
const computerInput = (lastWord) => {
    fetch(`https://opendict.korean.go.kr/api/search?key=${KoreanApi}&q=${lastWord}&num=15&sort=popular&method=start&advanced=y&pos=1&letter_s=2&letter_e=6`)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "text/xml");
            const wordCheck = Array.from(xml.getElementsByTagName("total")); // 사전 단어 여부
            const getWord = Array.from(xml.getElementsByTagName("word")); // 단어 가지고 오기
            const wordInfo = Array.from(xml.getElementsByTagName("definition")); // 설명 가지고 오기
            let i = 0; // 랜덤으로 번호 가지고 오기
            if (getWord.length === 1) {
                i = Math.round(Math.random() * getWord.length) - 1; // 랜덤으로 가지고 오기
            } else {
                i = Math.round(Math.random() * getWord.length); // 랜덤으로 가지고 오기
            }

            if (wordCheck[0].textContent !== "0") {
                const computerWordN = getWord[i].textContent;
                const wordInfoN = wordInfo[i].textContent;
                let wordDes; // 단어에 대한 설명이 길면, 줄이기 위한..
                if (wordInfoN.length > 40) {
                    const wordLength = `${wordInfoN.substring(0, 40)}...`;
                    wordDes = wordLength;
                } else {
                    wordDes = wordInfoN;
                }
                const word = computerWordN.replace(pattern, '');
                const againWordCheck = wordList.indexOf(word); // 중복 단어 체크
                if (againWordCheck === -1) { // 중복 단어 없을 시 게임은 계속,
                    wordList.push(word);
                    paintWord(computerWordN);
                    description.textContent = wordDes;
                    beforeAfter = word;
                    computerCheck.textContent = "";
                    setTimeout(() => input.value = computerWordN.slice(-1), 2000);
                } else { // 있을 시 다시 입력할 수 있도록.
                    computerInput(lastWord);
                    input.value = lastWord;
                }
            } else {
                location.reload(alert("사람 승리"));
            }
        })
        .catch((e) => { // 오류가 발생해도 마찬가지로 다시 입력하도록.
            computerInput(lastWord);
            input.value = lastWord;
            computerCheck.textContent = "중복된 단어로 다시 입력하겠습니다."
            wordList.pop();
        })
}