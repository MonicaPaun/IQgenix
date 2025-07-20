document.addEventListener("DOMContentLoaded", () => {
  console.log("JS script loaded!");

 
const fromText = document.querySelector(".from-text"),
      toText = document.querySelector(".to-text"),
      exchageIcon = document.querySelector(".exchange"),
      selectTag = document.querySelectorAll("select"),
      icons = document.querySelectorAll(".row i");
 const translateBtn = document.getElementById("translate-btn");





selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? (country_code == "ro-RO" ? "selected" : "") : (country_code == "en-GB" ? "selected" : "");
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});
fromText.addEventListener("keyup", () => {
    if(!fromText.value) {
        toText.value = "";
    }
});
 translateBtn.addEventListener("click", () => {
      console.log("Translate button clicked!");
      let text = fromText.value.trim(),
          translateFrom = selectTag[0].value,
          translateTo = selectTag[1].value;
      if (!text) return;
      toText.setAttribute("placeholder", "Translating...");
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      fetch(apiUrl).then(res => res.json()).then(data => {
          toText.value = data.responseData.translatedText;
          data.matches.forEach(data => {
              if (data.id === 0) {
                  toText.value = data.translation;
              }
          });
          toText.setAttribute("placeholder", "Translation");
      });
  });

   

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(!fromText.value || !toText.value) return;
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});

 const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu-list');

  btn.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
  // Obține numele paginii curente
  const currentPage = window.location.pathname.split("/").pop();

  // Selectează toate linkurile din meniu
  const menuLinks = document.querySelectorAll("#menu-list a");

  menuLinks.forEach(link => {
    // Compară href-ul fiecărui link cu pagina curentă
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });



});