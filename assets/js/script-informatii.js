// Acordeon interactiv
const accordions = document.querySelectorAll(".accordion");

accordions.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const panel = button.nextElementSibling;

    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
});
document.querySelectorAll('.toggle-btn').forEach(button => {
  button.addEventListener('click', () => {
    const contentId = button.getAttribute('aria-controls');
    const content = document.getElementById(contentId);
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      button.setAttribute('aria-expanded', 'false');
      content.hidden = true;
    } else {
      button.setAttribute('aria-expanded', 'true');
      content.hidden = false;
    }
  });
});
document.querySelectorAll('.ai-tabs-section .tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const tabContainer = button.closest('.ai-tabs-section');
    
    // Scoate clasa active de pe toate butoanele și ascunde toate conținuturile
    tabContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    tabContainer.querySelectorAll('.tab-content').forEach(content => {
      content.hidden = true;
      content.classList.remove('active');
    });

    // Adaugă clasa active și arată conținutul corespunzător
    button.classList.add('active');
    const tabId = button.getAttribute('data-tab');
    const activeContent = tabContainer.querySelector(`#${tabId}`);
    if (activeContent) {
      activeContent.hidden = false;
      activeContent.classList.add('active');
    }
  });
});
document.querySelectorAll('.toggle-detail').forEach(button => {
  button.addEventListener('click', () => {
    const detail = button.previousElementSibling;
    if (detail.hasAttribute('hidden')) {
      detail.removeAttribute('hidden');
      button.textContent = 'Ascunde';
    } else {
      detail.setAttribute('hidden', '');
      button.textContent = 'Detalii';
    }
  });
});
const frames = document.querySelectorAll('.frame');
const popup = document.querySelector('.popup');
const popupTitle = document.getElementById('popup-title');
const popupContent = document.getElementById('popup-content');
const btnClose = document.querySelector('.btn-close');

const texts = {
  1: 'Există mai multe etape de dezvoltare și de implementare a modelelor de machine learning, inclusiv instruirea și deducția. Instruirea și deducția pentru AI se referă la procesul de experimentare a modelelor de machine learning pentru a rezolva o problemă.',
  2: 'De exemplu, un inginer din domeniul machine learning poate experimenta diferite modele probabile pentru rezolvarea unei probleme, folosind viziunea computerului, cum ar fi detectarea fracturii unui os în imaginile cu raze X.',
  3: 'Pentru a îmbunătăți precizia acestor modele, inginerul trebuie să furnizeze date modelelor și să regleze parametrii până când aceștia ating un prag predefinit. Aceste cerințe privind instruirea, măsurate prin complexitatea modelelor, cresc exponențial în fiecare an.',
  4: 'Tehnologiile de infrastructură esențiale pentru instruirea AI la scară includ rețelele de clustere, cum ar fi RDMA și InfiniBand, computingul GPU Bare Metal și stocarea la performanțe ridicate.'
};

frames.forEach(frame => {
  frame.querySelector('.btn-explore').addEventListener('click', () => {
    const index = frame.getAttribute('data-index');
    popupTitle.textContent = frame.querySelector('h3').textContent;
    popupContent.textContent = texts[index];
    popup.classList.remove('hidden');
    popup.focus();
  });
});

btnClose.addEventListener('click', () => {
  popup.classList.add('hidden');
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