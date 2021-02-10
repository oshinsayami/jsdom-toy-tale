// let addToy = false;

// const toyCollection = document.getElementById('toy-collection')

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });


// // need fetch, after fetch req. add to DOM
// fetch('http://localhost:3000/toys')
// .then(response => response.json())
// .then(json => gotToys(json)) //callback funt. need def of fun. 
// // .then(gotToys) json gets passed as arg automatically

// function gotToys(toys) {
//   //debugger
//   toys.forEach(toy => {
//     createCard(toy)
//   });
// }

// function createCard(toy) {
//   // make a div with class card
//   const card = document.createElement('div')
//   card.classList.add('card')
  
//   const h2 = document.createElement('h2')
//   h2.innerText = toy.name

//   const image = document.createElement('img')
//   image.classList.add('toy-avatar')
//   image.src = toy.image

//   //debugger
//   const para = document.createElement('p')
//   para.innerText = `${toy.likes} Likes`

//   const button = document.createElement('button')
//   button.classList.add('like-btn')
//   button.innerText = "Like <3"

//   toyCollection.appendChild(card)
//   card.appendChild(h2)
//   card.appendChild(image)
//   card.appendChild(para)
//   card.appendChild(button)

//   button.addEventListener('click', (e) => updateLike(e, toy)) // callback function
// }

// function updateLike(e, toy){
// // needs to increase by every click
// // capture how many likes they are
// // update innerText 
// // update our database

// let likes = toy.likes
// likes++;
// toy.likes = likes

// e.target.parentElement.querySelector('p').innerText = `${likes} likes`

// fetch
// }

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')
const sortLikes = document.getElementById("sort")

sortLikes.addEventListener('click', Toy.sortToys)


function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}






// add listener to 'Add Toy' button to show or hide form
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// start by getting all toys

getToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    let t = new Toy(toy)
    t.addToDom()
  })
})