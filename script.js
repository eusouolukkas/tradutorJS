const textareaFrom = document.querySelector("#text-area-from");
const textareaTo = document.querySelector("#text-area-to");
const btnTranslate = document.querySelector("#btn-translate");
const selects = document.querySelectorAll("select");

const countries = {
    "en-GB": "Inglês",
    "es-ES": "Espanhol",
    "pt-BR": "Português",
};

selects.forEach((tag) => {
    for (let country in countries) {
        let selected;
        if (tag.className.includes("select-from") && country == "pt-BR") {
            selected = "selected";
        } else if (tag.className.includes("select-to") && country == "en-GB") {
            selected = "selected";
        }

        const option = `<option value="${country}" ${selected}>${countries[country]}</option>`;

        tag.insertAdjacentHTML("beforeEnd", option);
    }
});

btnTranslate.addEventListener("click", () => {
    if(textareaFrom.value) {
        loadTranslation()
    } else {
        textareaTo.value = "";
    }
})

function loadTranslation() {
    fetch(
        `https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
    )
    .then((res) => res.json()
    .then((data) => {
        textareaTo.value = data.responseData.translatedText;
    }))
}