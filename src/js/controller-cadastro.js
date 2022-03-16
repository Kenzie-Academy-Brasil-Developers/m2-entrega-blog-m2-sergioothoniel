import { Api } from "./Api.js"


const formCadastro = document.querySelector('.cadastro')
const modal        = document.querySelector('.modal-cadastro')

let novoUsuario = {}

formCadastro.addEventListener('submit', async function(event){
    event.preventDefault()
    
    novoUsuario.username  = event.target[0].value
    novoUsuario.email     = event.target[1].value
    novoUsuario.avatarUrl = event.target[2].value
    novoUsuario.password  = event.target[3].value

    const response = await Api.criarUsuario(novoUsuario)
    console.log(response)

    if(response.status == 400){
        window.alert('Usuário ou e-mail já existente.')
    }
    else{
        modal.style.display = 'flex'               
    }
})



modal.addEventListener('click', (event)=>{
    
    if(event.target.tagName === 'BUTTON'){
        modal.style.display = 'none'

        window.location.href = "./../../index-login.html"
    }
})

/*
email: othoniel@email.com
senha: 1989
*/

