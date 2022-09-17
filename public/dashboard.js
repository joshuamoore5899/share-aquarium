const editButtons = document.querySelectorAll('.fa-edit');
const closeEditButtons = document.querySelectorAll('.minimize');
const likes = document.querySelectorAll('.like-btn');
const wrapper = document.querySelector('#dashboard-wrapper');
const edits = document.querySelectorAll('.edit-section');

Array.from(editButtons).forEach((el)=> {
  el.addEventListener('click', showEdit);
})

Array.from(closeEditButtons).forEach((el)=> {
  el.addEventListener('click', closeEdit);
})

function showEdit() {
  const aquarium = this.parentNode.parentNode.parentNode.querySelector('.edit-section');
  const aquariums = document.querySelectorAll('.hidden');
  try {
    if (aquariums.length === edits.length) {
      aquarium.classList.remove('hidden');
    }
  }
  catch (err) {
    console.error(err);
  }
}

function closeEdit() {
  const aquarium = this.parentNode.parentNode.parentNode.parentNode.querySelector('.edit-section');
  try {
    aquarium.classList.add('hidden');
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
  const itemID = this.parentNode.parentNode.parentNode.parentNode.dataset.id;
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
