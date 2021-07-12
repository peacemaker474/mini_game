const KoreanApi = `DB74236416D14FAB8B49DDFA5E21B246`;

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