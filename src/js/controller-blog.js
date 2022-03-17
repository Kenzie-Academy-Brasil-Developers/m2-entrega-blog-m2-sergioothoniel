import { Api } from "./Api.js";
import { Post } from "./model-posts.js";

const autenticaçaoAutomatica = await JSON.parse(localStorage.getItem('autenticaçao_BlogM2'))

if(!autenticaçaoAutomatica){
    window.location.href = "./../../index-login.html"
}

const acessarUsuario  = await Api.getUser(autenticaçaoAutomatica.userId, autenticaçaoAutomatica.token)
Api.infoUsuario.autenticaçao = {...autenticaçaoAutomatica}

console.log(Api.infoUsuario)

const imgUsuario   = document.querySelector('.imagem-usuario')
const nomeUsuario  = document.querySelector('.nome-usuario')
const btnLogout    = document.querySelector('.botao-logout')
const sectionPosts = document.querySelector('.listasPosts')
const publicar     = document.querySelector('.form-publicar')

btnLogout.addEventListener('click', ()=>{
    localStorage.removeItem('autenticaçao_BlogM2')
    document.location.reload(true)
})

imgUsuario.src = Api.infoUsuario.informaçoes.avatarUrl
nomeUsuario.innerText = Api.infoUsuario.informaçoes.username

let pagina = 7

const listaPosts = await Api.listarPostsPorPagina(Api.infoUsuario.autenticaçao.token, pagina)

console.log(listaPosts)

listaPosts.forEach(element => {
    
    const newPost = new Post()
    newPost.renderizarPost(element, sectionPosts, Api.infoUsuario.autenticaçao.userId)
    //console.log(newPost.informaçoes)
    
});

publicar.addEventListener('submit', async function(event){
    event.preventDefault()

    const textoPost = event.target[0].value
    const criarPost = await Api.criarPost(Api.infoUsuario.autenticaçao.token, textoPost)
    const listaPosts = await Api.listarPostsPorPagina(Api.infoUsuario.autenticaçao.token, pagina)
    console.log(criarPost)

    
})



