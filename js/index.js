const KoreanApi = `9CDF171804A5CDD8F44958CB030FC0FE`;

async function getKoreanApi () {
    let data = await fetch(`http://stdict.korean.go.kr/api/search.do?key=${KoreanApi}&q=나무`)
    .then(response => {
        return response.json();
    })
    .then(function app(json) {
        console.log(json);
    });
}
getKoreanApi();