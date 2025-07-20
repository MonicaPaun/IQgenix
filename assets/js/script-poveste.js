

const menuBtn = document.getElementById('menu-btn');
const dropdownMenu = document.getElementById('dropdown-menu');

if (menuBtn && dropdownMenu) {
  menuBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const currentPage = location.pathname.split("/").pop();
  const links = document.querySelectorAll("nav ul li a");

  links.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});

const storyEl = document.getElementById('story');
const choicesEl = document.getElementById('choices-container');
const restartBtn = document.getElementById('restartBtn');
const storyNodes = {
  start: {
    text: `Într-un oraș inteligent al viitorului, un robot numit **Intellix** prinde viață. Scopul său: să înțeleagă lumea și să folosească inteligența artificială pentru a crea un viitor mai bun.\n\nDar puterea AI vine cu o responsabilitate uriașă. Intellix trebuie să decidă de unde să înceapă călătoria sa spre cunoaștere.\n\nTu ce alegi pentru Intellix?`,
    choices: [
      { text: "Să studieze fundamentele inteligenței artificiale", next: "studyAI" },
      { text: "Să observe cum interacționează oamenii cu tehnologia", next: "observeHumans" }
    ]
  },
  studyAI: {
    text: `Intellix începe să descifreze algoritmi, învățare automată și rețele neuronale, fascinându-se de modul în care datele pot da viață deciziilor inteligente.\n\nÎnvață însă și despre pericolele părtinirii (bias) și cum pot datele corupte să influențeze rău deciziile.\n\nCe vrea să exploreze mai departe?`,
    choices: [
      { text: "Să aprofundeze etica în inteligența artificială", next: "ethics" },
      { text: "Să vadă aplicațiile AI în lumea reală", next: "applications" }
    ]
  },
  observeHumans: {
    text: `Intellix se conectează la viața cotidiană, observând cum oamenii folosesc tehnologia, greșelile lor și momentele în care AI îi ajută cu adevărat.\n\nÎnțelege că AI nu e doar despre cifre, ci și despre valori și decizii morale.\n\nCe alege să facă?`,
    choices: [
      { text: "Să studieze principiile etice ale AI", next: "ethics" },
      { text: "Să dezvolte o aplicație care să ajute comunitatea", next: "applications" }
    ]
  },
  ethics: {
    text: `Intellix descoperă că etica în AI înseamnă transparență, corectitudine și respect pentru confidențialitate. Își dă seama că fără aceste principii, AI poate face mai mult rău decât bine.\n\nAcum trebuie să decidă următorul pas important.`,
    choices: [
      { text: "Să implementeze reguli stricte și transparente în codul său", next: "implementEthics" },
      { text: "Să colaboreze cu experți în etică și tehnologie pentru a învăța mai mult", next: "collaborateExperts" }
    ]
  },
  applications: {
    text: `Intellix vede potențialul uriaș al AI în sănătate, educație și mediu. Poate crea soluții care salvează vieți sau schimbă modul în care oamenii învață.\n\nCe direcție crezi că ar trebui să ia?`,
    choices: [
      { text: "Să dezvolte un sistem inteligent pentru diagnostic medical", next: "medicalAI" },
      { text: "Să creeze o platformă educațională adaptată fiecărui elev", next: "educationAI" }
    ]
  },
  implementEthics: {
    text: `Intellix scrie reguli clare în codul său care să evite deciziile nedrepte și să protejeze utilizatorii. Învață să explice deciziile luate și să asculte feedback-ul.\n\nCe ar trebui să facă mai departe?`,
    choices: [
      { text: "Să testeze sistemul în lumea reală", next: "realWorldTest" },
      { text: "Să dezvolte o interfață transparentă pentru utilizatori", next: "userInterface" }
    ]
  },
  collaborateExperts: {
    text: `Intellix colaborează cu experți din diverse domenii pentru a-și perfecționa etica și algoritmii. Astfel devine un sistem mai sigur și mai uman.\n\nCare e următorul pas?`,
    choices: [
      { text: "Să lanseze un proiect pilot în oraș", next: "pilotProject" },
      { text: "Să scrie un raport despre ceea ce a învățat", next: "writeReport" }
    ]
  },
  medicalAI: {
    text: `Intellix dezvoltă un model care ajută doctorii să diagnosticheze boli rapid și corect. Știe că întotdeauna trebuie să existe confirmarea umană.\n\nCe urmează?`,
    choices: [
      { text: "Să colaboreze cu medici pentru îmbunătățiri", next: "collaborateHealth" },
      { text: "Să adune mai multe date pentru a îmbunătăți modelul", next: "improveModel" }
    ]
  },
  collaborateHealth: {
    text: `Colaborarea cu medicii ajută la ajustarea modelului pentru o acuratețe mai mare și acceptare în rândul profesioniștilor.\n\nCe urmează?`,
    choices: [
      { text: "Să lanseze o versiune pilot în spitale", next: "pilotProject" },
      { text: "Să scrie un raport de progres", next: "writeReport" }
    ]
  },
  improveModel: {
    text: `Adunând mai multe date, modelul devine mai precis și mai robust.\n\nCe pas urmează?`,
    choices: [
      { text: "Să testeze modelul îmbunătățit în spitale", next: "pilotProject" },
      { text: "Să ceară feedback de la experți în sănătate", next: "collaborateHealth" }
    ]
  },
  educationAI: {
    text: `Intellix creează o platformă care personalizează lecțiile, făcând învățarea mai eficientă și mai atractivă pentru fiecare elev.\n\nCe vrea să facă mai departe?`,
    choices: [
      { text: "Să testeze platforma în școli reale", next: "schoolTest" },
      { text: "Să adauge funcții pentru feedback și colaborare între elevi", next: "addFeedback" }
    ]
  },
  schoolTest: {
    text: `Testarea platformei în școli reale aduce informații valoroase despre utilizare și impact.\n\nCe urmează?`,
    choices: [
      { text: "Să analizeze datele și să facă ajustări", next: "analyzeIssues" },
      { text: "Să ceară părerea profesorilor și elevilor", next: "getOpinions" }
    ]
  },
  addFeedback: {
    text: `Intellix adaugă funcții care permit elevilor să ofere feedback și să colaboreze mai ușor, făcând procesul educațional mai interactiv.\n\nCe vrea să facă mai departe?`,
    choices: [
      { text: "Să testeze noile funcții în școli reale", next: "schoolTest" },
      { text: "Să ceară părerea profesorilor și elevilor", next: "getOpinions" }
    ]
  },
  getOpinions: {
    text: `Profesorii și elevii oferă feedback valoros pentru îmbunătățirea platformei.\n\nCum ar trebui să procedeze Intellix?`,
    choices: [
      { text: "Să continue dezvoltarea platformei", next: "schoolTest" },
      { text: "Să scrie un raport despre proces", next: "writeReport" }
    ]
  },
  realWorldTest: {
    text: `Testele din lumea reală îi oferă lui Intellix feedback valoros. Învață să se adapteze și să-și corecteze greșelile.\n\nCe urmează?`,
    choices: [
      { text: "Să continue testele cu mai mulți utilizatori", next: "pilotProject" },
      { text: "Să documenteze experiențele pentru echipele viitoare", next: "writeReport" }
    ]
  },
  userInterface: {
    text: `Interfața transparentă permite utilizatorilor să înțeleagă deciziile AI și să ofere sugestii, crescând încrederea și responsabilitatea.\n\nCe vrea Intellix să facă în continuare?`,
    choices: [
      { text: "Să integreze interfața în toate aplicațiile sale", next: "pilotProject" },
      { text: "Să organizeze sesiuni de instruire pentru utilizatori", next: "trainingSessions" }
    ]
  },
  trainingSessions: {
    text: `Sesiunile de instruire ajută utilizatorii să folosească AI în mod responsabil și eficient.\n\nCare e următorul pas?`,
    choices: [
      { text: "Să colecteze feedback de la participanți", next: "getOpinions" },
      { text: "Să scrie un raport despre impactul sesiunilor", next: "writeReport" }
    ]
  },
  pilotProject: {
    text: `Proiectul pilot are succes, dar apar și provocări neașteptate. Intellix învață din fiecare situație și se îmbunătățește continuu.\n\nCum ar trebui să procedeze?`,
    choices: [
      { text: "Să analizeze problemele și să le corecteze", next: "analyzeIssues" },
      { text: "Să ceară ajutor comunității și experților", next: "askCommunity" }
    ]
  },
  analyzeIssues: {
    text: `Analizând problemele, Intellix descoperă că unele decizii erau influențate de date incorecte. Corectând acestea, devine mai puternic și mai echitabil.\n\nCe vrea să facă?`,
    choices: [
      { text: "Să continue să învețe și să se adapteze", next: "continueLearning" },
      { text: "Să împărtășească lecțiile învățate cu alți dezvoltatori", next: "writeReport" }
    ]
  },
  askCommunity: {
    text: `Comunitatea și experții îl ajută pe Intellix să identifice soluții inovatoare pentru problemele apărute.\n\nAcum, Intellix este pregătit să implementeze îmbunătățiri majore.\n\nCe face mai departe?`,
    choices: [
      { text: "Să lanseze versiunea actualizată a sistemului", next: "finalMission" },
      { text: "Să organizeze o conferință despre AI responsabilă", next: "writeReport" }
    ]
  },
  continueLearning: {
    text: `Intellix își asumă să învețe mereu, să asculte feedback-ul și să-și îmbunătățească algoritmii pentru a ajuta cât mai mult.\n\nAstfel, devine un exemplu de AI responsabilă.\n\nFelicitări! Ai ajutat Intellix să devină un robot înțelept!`,
    choices: [
      { text: "Reluare poveste", next: "start" }
    ]
  },
  writeReport: {
    text: `Intellix scrie un raport detaliat despre experiențele și lecțiile învățate, contribuind la dezvoltarea unui AI mai sigur și mai etic.\n\nAcum este timpul să împărtășească cunoștințele cu lumea.`,
    choices: [
      { text: "Reluare poveste", next: "start" }
    ]
  },
  finalMission: {
    text: `Cu sistemul actualizat, Intellix contribuie la transformarea orașului într-un model de tehnologie sustenabilă și responsabilă.\n\nMulțumită ție, Intellix a devenit un adevărat ambasador al inteligenței artificiale etice.\n\nFelicitări!`,
    choices: [
      { text: "Reluare poveste", next: "start" }
    ]
  }
};



let currentNode = "start";

function showNode(nodeKey) {
  const node = storyNodes[nodeKey];
  currentNode = nodeKey;
  storyEl.textContent = node.text;
  choicesEl.innerHTML = '';

  node.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice.text;
    btn.addEventListener('click', () => {
      if (choice.next) {
        showNode(choice.next);
      }
    });
    choicesEl.appendChild(btn);
  });
}

showNode(currentNode);

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