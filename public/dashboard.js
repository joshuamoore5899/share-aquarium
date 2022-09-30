const editButtons = document.querySelectorAll('.fa-edit');
const closeEditButtons = document.querySelectorAll('.minimize');
const likes = document.querySelectorAll('.like-btn');
const wrapper = document.querySelector('#dashboard-wrapper');
const edits = document.querySelectorAll('.edit-section');
const images = document.querySelectorAll('.img-icons');
const deleteImage = document.querySelectorAll('.img-cover');
const share = document.querySelector('#share');
const shared = document.querySelector('#shared');
const saved = document.querySelector('#saved');
const sharesec = document.querySelector('#share-sec');
const sharedsec = document.querySelector('#shared-sec');
const savedsec = document.querySelector('#saved-sec');
const saves = document.querySelectorAll('.save-btn');

//open share
share.addEventListener('click', showShare);

function showShare() {
  sharesec.classList.toggle('hidden');
  sharedsec.classList.add('hidden');
  savedsec.classList.add('hidden');
}

//open shared
shared.addEventListener('click', showShared);

//funciton to show the shared aquariums

function showShared() {
  sharedsec.classList.toggle('hidden');
  sharesec.classList.add('hidden');
  savedsec.classList.add('hidden');
}

//open saved
saved.addEventListener('click', showSaved);

//funciton to show the shared aquariums

function showSaved() {
  savedsec.classList.toggle('hidden');
  sharesec.classList.add('hidden');
  sharedsec.classList.add('hidden');
}

Array.from(editButtons).forEach((el)=> {
  el.addEventListener('click', showEdit);
})

Array.from(closeEditButtons).forEach((el)=> {
  el.addEventListener('click', closeEdit);
})

function showEdit() {
  const aquarium = this.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.edit-section');
  const aquariums = document.querySelectorAll('.hidden');
  try {
    aquarium.classList.remove('hidden');
    aquarium.scrollIntoView();
  }
  catch (err) {
    console.error(err);
  }
}

function closeEdit() {
  const original = this.parentNode.parentNode.parentNode.parentNode;
  const aquarium = this.parentNode.parentNode.parentNode.parentNode.querySelector('.edit-section');
  try {
    aquarium.classList.add('hidden');
    original.scrollIntoView();
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
  }
  catch (err) {
    console.error(err);
  }
}


Array.from(deleteImage).forEach((el)=> {
  el.addEventListener('click', selectDelete);
})

function selectDelete() {
  const id = this.dataset.id;
  const deleteImage = this.parentNode.parentNode.parentNode.parentNode.querySelector('#deleteImages');
  const image = this.parentNode.querySelector('img');
  let current = deleteImage.value;
  try {
    if (current.includes(id)) {
      current = current.replace(id, "");
      current = current.replace(", ", "");
    }
    else {
      current += (id + ', ');
    }
    deleteImage.setAttribute('value', current);
    image.classList.toggle('selected-border');
  }
  catch (err) {
    console.error(err)
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
