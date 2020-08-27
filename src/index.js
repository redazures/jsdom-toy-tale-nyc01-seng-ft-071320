let addToy = false;

const toycollection = document.getElementById("toy-collection")

const getToys = () => {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toyCollection => renderToys(toyCollection))
}
// creates const for the function to render the toy object
const renderToys = toys => {
  for (const toyObj of toys){
    (renderToy(toyObj))
  }
}
//create a function to render toy to DOM
function renderToy(toyObj) {
  const toyDiv = document.createElement('div')
  toyDiv.classList.add("card")
  toyDiv.dataset.id = toyObj.id
  
  toyDiv.innerHTML =`
  <h2>${toyObj.name}</h2>
  <img src="${toyObj.image}" class="toy-class" width="85%">
  <p>${toyObj.likes} likes</p>
  <button class="like-btn">likes</button>
  
  `
  toycollection.appendChild(toyDiv)
}

function submitData( name, image, likes ) {
  fetch( 'http://localhost:3000/toys/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        name,
        image,
        likes
      } )
    } )
}

function submitLikes(id,likes ) { 
  fetch( ('http://localhost:3000/toys/'+ id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( { likes: likes
      } )
    } )
}

const submitHandler = () => {
  document.addEventListener('submit', e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const image = form.image.value
    const likes = 0

    const toyObj = {
      name: name,
      image: image,
      likes: likes
    }

    renderToy(toyObj)
    submitData(name,image,likes)
    form.reset()
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  getToys()
  
  document.addEventListener('click', function(e){
    if (e.target.innerText === 'likes') {
      newNum = parseInt(e.target.parentElement.querySelector('p').innerText, 10)+1
      //can also use previousElementSilbing
      idNum = e.target.parentElement.dataset.id
      e.target.parentElement.querySelector('p').innerHTML = `${newNum} likes`
      submitLikes(idNum, newNum)
    }     
  })
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    // I am very bad with typing
    console.log("you are at the top level")
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      addBtn.innerHTML="Cancel" 
      submitHandler()
    } else {
      toyFormContainer.style.display = "none";
      addBtn.innerHTML="Add a new toy!"
    }
  });
});