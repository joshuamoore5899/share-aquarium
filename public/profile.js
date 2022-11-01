const likes = document.querySelectorAll('.like-btn');
const images = document.querySelectorAll('.img-icons');

//like button event listeners
Array.from(likes).forEach((el)=> {
  el.addEventListener('click', addLike)
})

//fetch request to update Likes
async function addLike() {
  const itemID = this.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.id;
  try {
    let likes = await fetch('/addLike', {
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
    console.error(err);
  }
}


//image carousel
Array.from(images).forEach((el)=> {
  el.addEventListener('click', changeMain)
})

//changes image in main pic spot
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
