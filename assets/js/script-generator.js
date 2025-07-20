const API_KEY = 'vk-gTy3HQJJj8Mz44HEA2BmLeWPm7GtKilEWalFGk29t30LcDk'; 
const API_URL = 'https://api.vyro.ai/v2/image/generations';

const imageContainer = document.getElementById('imageContainer');
const imageResultElement = document.getElementById('imageResult');

// Function to generate the image
function generateImage() {
const promptValue = document.getElementById('prompt').value;
const styleValue = document.getElementById('dropdownStyles').value;
const ratioValue = document.getElementById('dropdownRatio').value;


if (!promptValue) {
    alert('Please enter a prompt.');
    return;
}




setLoadingState(true);

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer"  + API_KEY);

const formData = new FormData();
formData.append('prompt', promptValue);
formData.append('style', styleValue); 
formData.append('aspect_ratio', ratioValue);  

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
};



fetch(API_URL, requestOptions)
    .then(response => response.blob())
    .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        imageResultElement.src = imageUrl;
      

    })
    .catch(error => {
    console.log('error', error);
        alert('A apărut o eroare la generarea imaginii. Vă rugăm să încercați din nou.');
    })
       
    .finally(() => {
        setLoadingState(false);
    });
      
}


function setLoadingState(isLoading) {
    if(isLoading){
imageResultElement.style.display = 'none';
imageContainer.classList.add('loading');

    }else{
imageResultElement.style.display = 'block';
imageContainer.classList.remove('loading');

    }
   

}

function downloadImage() {

    const imageUrl = imageResultElement.src;
    if (!imageUrl) {
        alert('Nicio imagine de descărcat. Vă rugăm să generați mai întâi o imagine.');
        return;
    }

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'ai_generated-image.jpg';
    link.click();
    alert('Imaginea a fost descărcată cu succes!'); 
}
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