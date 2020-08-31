let addToy = false;
//This is where toys can come and survive us growing up

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  get()
  buttonlike()
  
  addBtn.addEventListener("click", () => {
    console.log("what")
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      submit() 
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  console.log("what is going on")

});

function get(){
  fetch('http://localhost:3000/toys/')
  .then(res=>res.json())
  .then(string=>{string.forEach(item=>objectify(item))})
}

function objectify(josh){
  create(josh)
}

function create(object){
// console.log(object.id)
  const container = document.querySelector('#toy-collection');
  const div =document.createElement('div')
  div.innerHTML=`<h2>${object.name}</h2><img src=${object.image} class="toy-avatar" width="100px"><p>${object.likes} likes</p><button class="like-btn">Like<3</button>`
  div.className='card'
  div.dataset.id=object.id
  container.appendChild(div)
  
  //delete
  const del = document.createElement('button')
  del.id="delete-btn"
  del.innerText="Gone Girl This Toy"
  div.appendChild(del)
  del.addEventListener('click',(e)=>{
    console.log(e.target.parentNode)
    const toy = e.target.parentNode
    const id = toy.dataset.id
    fetch('http://localhost:3000/toys/'+id, {
    method: "DELETE"
    })
      .then(resp => resp.json())
      .then(console.log)
    cconsole.log(toy)
    toy.innerHTML==""
    toy.remove()
    })
    
}

function submit(){
  const form = document.querySelector('form')
  document.addEventListener('submit', (e) => {
    console.log("this is form")
    e.preventDefault()
    options={
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: form.name.value,
        image: form.image.value,
        likes: 0
      })
    }
    fetch('http://localhost:3000/toys', options)
    .then(res=>res.json())
    .then(create)
    form.reset()
  })
}

function buttonlike(){
  document.addEventListener('click',(e)=>{
    if(e.target.matches('.like-btn')){
      const dog = e.target.parentElement
      const id = dog.dataset.id
      let dogLikes = dog.querySelector('p')
      let mucho = parseInt(dog.querySelector('p').innerText)+1
      console.log(mucho)

      fetch('http://localhost:3000/toys/'+id, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "accept": "application/json"
      },
        body: JSON.stringify({
        likes: mucho
      })
      })
      .then(res => res.json())
      .then(out=>{
        dogLikes.innerHTML=`${out["likes"]} likes`
        })
    }
  })
}

