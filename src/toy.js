class Toy{
    static all = []
    constructor({name, likes, image, id}){
        this.name = name
        this.likes = likes
        this.image = image
        this.id = id
        Toy.all.push(this)
    }



    addToDom(){
        let h2 = document.createElement('h2')
        h2.innerText = this.name

        let img = document.createElement('img')
        img.setAttribute('src', this.image)
        img.setAttribute('class', 'toy-avatar')

        let p = document.createElement('p')
        p.innerText = `${this.likes} likes`

        let btn = document.createElement('button')
        btn.setAttribute('class', 'like-btn')
        btn.setAttribute('id', this.id)
        btn.innerText = "like"
        btn.addEventListener('click', this.addLikes)

        let divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')
        divCard.append(h2, img, p, btn)
        divCollect.append(divCard)
    }

    addLikes = (e) => {
        e.preventDefault()
        this.likes++
        
        fetch(`http://localhost:3000/toys/${this.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
      
            },
            body: JSON.stringify({
              "likes": this.likes
            })
          })
          .then(res => res.json())
          .then((like_obj => {
            e.target.previousElementSibling.innerText = `${this.likes} likes`;
          }))
        }

        static sortToys = () => {
            const sortedToys = Toy.all.sort(function (a, b){
                return b.likes - a.likes;
            })
            document.getElementById("toy-collection").innerHTML=""
            sortedToys.forEach(toy => toy.addToDom())
            
        }
}