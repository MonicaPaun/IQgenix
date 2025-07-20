
 const correctAnswers = {
  q1: 'a',
  q2: 'b',
  q3: 'd',
  q4: 'a',
  q5: 'c',
  q6: 'b',
  q7: 'a',
  q8: 'd',
  q9: 'b',
  q10: 'c'
};

const explanations = {
  q1: {
    b: "Greșit: Atât IA îngustă cât și IA generală pot învăța din experiență, diferența e că IA generală poate generaliza pentru sarcini diverse.",
    c: "Greșit: IA generală nu este limitată doar la robotică, iar IA îngustă nu este doar software.",
    d: "Greșit: IA generală nu este doar o versiune mai puternică a IA îngustă, ci poate aborda orice sarcină intelectuală umană."
  },
  q2: {
    a: "Greșit: Rețelele neuronale nu folosesc reguli rigide scrise manual, ci se ajustează automat prin învățare.",
    c: "Greșit: Rețelele neuronale sunt modele matematice, nu interfețe grafice.",
    d: "Greșit: Ele pot face predicții bazate pe date, nu doar să stocheze informații."
  },
  q3: {
    a: "Greșit: Transparanța nu influențează viteza de procesare a datelor.",
    b: "Greșit: Nu are legătură directă cu consumul de energie.",
    c: "Greșit: Scopul explicabilității este să crească încrederea și nu să înlocuiască complet oamenii."
  },
  q4: {
    b: "Greșit: IA superinteligentă teoretic poate funcționa autonom, fără supraveghere constantă umană.",
    c: "Greșit: IA superinteligentă are aplicabilitate mult mai largă decât jocurile video.",
    d: "Greșit: Ea nu este limitată la un domeniu specific."
  },
  q5: {
    a: "Greșit: Prejudecățile AI afectează calitatea deciziilor, nu performanța hardware.",
    b: "Greșit: Nu este legat de consumul de memorie.",
    d: "Greșit: Bias-ul AI nu influențează conectivitatea la internet."
  },
  q6: {
    a: "Greșit: Machine Learning nu presupune programarea manuală a tuturor regulilor.",
    c: "Greșit: ML analizează și prelucrează date pentru a învăța modele.",
    d: "Greșit: Există mulți algoritmi ML, nu doar unul singur."
  },
  q7: {
    b: "Greșit: AI nu transformă toate produsele în software.",
    c: "Greșit: AI susține angajații, nu îi elimină complet.",
    d: "Greșit: Nu poate reduce toate costurile la zero."
  },
  q8: {
    a: "Greșit: IA generală are nevoie de date și experiență pentru a învăța.",
    b: "Greșit: Crearea de conținut nou este o abilitate și a IA înguste, dar IA generală are capacități mult mai largi.",
    c: "Greșit: IA generală nu este limitată la sarcini specializate."
  },
  q9: {
    a: "Greșit: Transparanța nu înseamnă acces nelimitat la date personale.",
    c: "Greșit: Nu reduce viteza deciziilor, ci crește claritatea lor.",
    d: "Greșit: Transparanța ajută să dezvăluie erorile, nu să le ascundă."
  },
  q10: {
    a: "Greșit: AI ajută la accesul mai bun la informații medicale, nu îl reduce.",
    b: "Greșit: AI susține medicii, nu îi înlocuiește complet.",
    d: "Greșit: AI poate analiza date medicale complexe și mari."
  }
};
const quizForm = document.getElementById('quizForm');
const diploma = document.getElementById('diploma');
const errorMsg = document.getElementById('errorMsg');
const nameInput = document.getElementById('name');
const downloadBtn = document.getElementById('downloadBtn');

quizForm.addEventListener('submit', function(e) {
  e.preventDefault();
  errorMsg.style.display = 'none';

  const name = nameInput.value.trim();
  if (!name) {
    errorMsg.textContent = 'Te rog introdu numele tău.';
    errorMsg.style.display = 'block';
    return;
  }

  const genderEls = document.getElementsByName('gender');
  let gender = null;
  for (let el of genderEls) {
    if (el.checked) {
      gender = el.value;
      break;
    }
  }
  if (!gender) {
    errorMsg.textContent = 'Te rog selectează genul.';
    errorMsg.style.display = 'block';
    return;
  }

  // Verifică toate întrebările
  for (let i = 1; i <= 10; i++) {
    const qName = 'q' + i;
    const options = document.getElementsByName(qName);
    let answered = false;
    for (let opt of options) {
      if (opt.checked) {
        answered = true;
        break;
      }
    }
    if (!answered) {
      errorMsg.textContent = `Te rog răspunde la întrebarea ${i}.`;
      errorMsg.style.display = 'block';
      return;
    }
  }

  // Resetează stilurile și elimină explicațiile anterioare
  for (let i = 1; i <= 10; i++) {
    const qDiv = document.querySelector(`.question:nth-child(${i})`);
    if (!qDiv) continue;
    const labels = qDiv.querySelectorAll('label');
    labels.forEach(label => {
      label.style.backgroundColor = '';
      const exp = label.querySelector('.explanation');
      if (exp) exp.remove();
    });
  }

  // Calculează punctajul și evidențiază răspunsurile
  let score = 0;
  for (let i = 1; i <= 10; i++) {
    const qName = 'q' + i;
    const options = document.getElementsByName(qName);
    for (let opt of options) {
      const label = opt.parentElement;
      const val = opt.value;
      if (val === correctAnswers[qName]) {
        label.style.backgroundColor = '#c8e6c9'; // verde deschis pentru corect
      }
      if (opt.checked) {
        if (val === correctAnswers[qName]) {
          score++;
        } else {
          label.style.backgroundColor = '#ffcdd2'; // roșu deschis pentru greșit
        }
      }
      // Afișează explicația doar pentru opțiunea selectată sau corectă
      if ((opt.checked || val === correctAnswers[qName]) && explanations[qName] && explanations[qName][val]) {
        const explanationText = explanations[qName][val];
        const span = document.createElement('div');
        span.classList.add('explanation');
        span.style.fontStyle = 'italic';
        span.style.marginTop = '5px';
        span.style.fontSize = '0.9em';
        span.textContent = explanationText;
        if (!label.querySelector('.explanation')) {
          label.appendChild(span);
        }
      }
    }
  }

  // Afișează diploma
  diploma.style.display = 'block';
  diploma.className = 'diploma ' + gender;
  diploma.querySelector('.name').textContent = name;
  diploma.querySelector('.text').textContent = `Ai obținut ${score} puncte din 10 la testul de inteligență artificială. Continuă să înveți și să explorezi!`;

  downloadBtn.style.display = 'inline-block';
});

// Butonul de download - generează imagine PNG a diplomei
downloadBtn.addEventListener('click', () => {
  // html2canvas trebuie inclus în HTML înainte, vezi mai jos
  html2canvas(diploma).then(canvas => {
    const link = document.createElement('a');
    link.download = 'IQgenix.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }).catch(error => {
    console.error('Eroare la generarea diplomei:', error);
    alert('Nu s-a putut genera diploma pentru download.');
  });
});
// Când se schimbă un input radio, schimbăm clasa selected pe labelul corespunzător
document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const name = radio.name; // grupează pe întrebare
    // Scoatem clasa selected de pe toate labelurile din acea întrebare
    document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
      input.parentElement.classList.remove('selected');
    });
    // Adăugăm clasa selected pe labelul bifat
    if (radio.checked) {
      radio.parentElement.classList.add('selected');
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