let addToy = false;
//Toys baby

document.addEventListener("DOMContentLoaded", () => {
  console.log("lets start")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  get()
  form()
  clunk()

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function get(){
  fetch('http://localhost:3000/toys')
  .then(res=>res.json())
  .then(toys=>toys.forEach(render))
}

function render(toy){
  const toycollection=document.querySelector('#toy-collection')
  const div = document.createElement('div')
  toycollection.append(div)
  div.className="card"
  div.dataset.id= toy.id
  div.innerHTML=`<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn" data-id="${toy.id}">Like <3</button>
  <button class="delete-btn" data-id="${toy.id}">Gone Girl</button>`
}

function form(){
  console.log("form")
  const form = document.querySelector('.add-toy-form')
  const toyFormContainer = document.querySelector(".container");
  form.addEventListener('submit',(e)=>{
    e.preventDefault()
    faker={
      name: form.name.value,
      image: form.image.value,
      likes: 0
    }
    fetch(`http://localhost:3000/toys`, {
      method: "POST",
      headers: {
      "Content-type": "application/json",
      "accept": "application/json"
      },
          body: JSON.stringify(
            faker
          )
      })
      .then(res => res.json())
      .then(render)
      form.reset()
      toyFormContainer.style.display = "none"
  })// This is the end of my submit
}//This is the end of form

function clunk (){
document.addEventListener('click',(e)=>{//console.log(e.target)
  if(e.target.matches('.like-btn')){
    console.log('this is the like btn')
    const likes = e.target.previousElementSibling
    const id = parseInt(e.target.dataset.id)
    const num = parseInt(likes.innerText)+1
    // debugger
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
      "Content-type": "application/json",
      "accept": "application/json"
      },
          body: JSON.stringify({
            likes: num
          })
      }).then(res=>res.json()).then(//console.log
        toy=>{likes.innerText = `${toy.likes} likes`}
        )
  }//end of the first if statement (likes)
  else if (e.target.matches('.delete-btn')){//console.log("what") //debugger
    const id = parseInt(e.target.dataset.id)
    fetch(`http://localhost:3000/toys/${id}`, {
    method: "DELETE"})
    const parent = e.target.parentElement
    parent.remove(e.target)
  }//end of the second if statement (delete)
})
}//this is the end of my clunk