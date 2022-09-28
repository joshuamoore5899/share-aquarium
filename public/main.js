//Get the button:
const mybutton = document.getElementById("myBtn");
const likes = document.querySelectorAll('.like-btn');
const saves = document.querySelectorAll('.save-btn');
const images = document.querySelectorAll('.img-icons');
const mainImgs = document.querySelectorAll('.main-pic-img');
const zoomImg = document.querySelector('#zoom-pic');
const zoomDiv = document.querySelector('.zoom-wrapper');
document.querySelector('.fa-filter').addEventListener('click', showFilter);
document.querySelector('.main-pic-minimize').addEventListener('click', closeZoom);

function closeZoom() {
  try {
    zoomDiv.classList.add('hidden');
  }
  catch (err) {
    console.error(err);
  }
}

function showFilter() {
  try {
    const section = this.parentNode.parentNode.querySelector('#filter-section');
    section.classList.toggle('hidden');
  }
  catch (err) {
    console.error(err)
  }
}





// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


//main pic event listeners
Array.from(mainImgs).forEach((el)=> {
  el.addEventListener('click', zoomPic)
})

function zoomPic() {
  const picUrl = this.dataset.url;
  const picDiv = zoomImg.parentNode.parentNode;
  try {
    zoomImg.src = `${picUrl}`;
    picDiv.classList.remove('hidden');
  }
  catch (err) {
    console.error(err);
  }
}

//like button event listeners
Array.from(likes).forEach((el)=> {
  el.addEventListener('click', addLike)
})

//fetch request to update Likes
async function addLike() {
  const itemID = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.id;
  try {
    let likes = await fetch('addLike', {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            'itemID': itemID
        })
    })
    const data = await likes.json();
    location.reload();
  }
  catch(err) {
    console.log('here')
    console.error(err);
  }
}

//save button event listeners
Array.from(saves).forEach((el)=> {
  el.addEventListener('click', saveAquarium)
})

//fetch request to save
async function saveAquarium() {
  const itemID = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.id;
  try {
    let saves = await fetch('saveAquarium', {
        method: 'put',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            'itemID': itemID
        })
    })
    const data = await saves.json();
    location.reload();
  }
  catch(err) {
    console.log('here')
    console.error(err);
  }
}

//image carousel
Array.from(images).forEach((el)=> {
  el.addEventListener('click', changeMain)
})

function changeMain() {
  const imageURL = this.dataset.url;
  const mainPic = this.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.main-pic img');
  try {
    mainPic.src=`${imageURL}`;
    mainPic.setAttribute('data-url', imageURL);
  }
  catch (err) {
    console.error(err);
  }
}
