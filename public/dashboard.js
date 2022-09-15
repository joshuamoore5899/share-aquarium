const editButtons = document.querySelectorAll('.fa-edit');
const closeEditButtons = document.querySelectorAll('.minimize');

Array.from(editButtons).forEach((el)=> {
  el.addEventListener('click', showEdit);
})

Array.from(closeEditButtons).forEach((el)=> {
  el.addEventListener('click', closeEdit);
})

function showEdit() {
  const aquarium = this.parentNode.parentNode.parentNode.querySelector('.edit-section');
  try {
    aquarium.classList.remove('hidden');
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
