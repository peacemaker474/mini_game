const KoreanApi = `69C1A75986C675AEFEC60B73B2DF3193`;

function getKorea() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", `https://stdict.korean.go.kr/api/search.do?key=${KoreanApi}q=별밤&num=50&advanced=y&method=start&pos=1`, false);
    xmlHttp.send();
    if(xmlHttp.status == 200) {
        const data = Array.from(xmlHttp.responseXML.all);
        const word = data.filter(item => item.tagName === "word");
        let i = Math.round(Math.random() * 10);
        console.log(word[i].textContent);
        console.log("통신 성공");
    } else {
        console.log("통신 실패");
    }
}

getKorea();