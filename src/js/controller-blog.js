import { Api } from "./Api.js";
import { Post } from "./model-posts.js";

const autenticaçaoAutomatica = await JSON.parse(localStorage.getItem('autenticaçao_BlogM2'))

if(!autenticaçaoAutomatica){
    window.location.href = "./../../index.html"
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

const objPosts = await Api.listarPostsPorPagina(Api.infoUsuario.autenticaçao.token)
let pagina = objPosts.lastPage
const paginaPosts = await Api.listarPostsPorPagina(Api.infoUsuario.autenticaçao.token, pagina)
const listaPosts = paginaPosts.data

console.log(paginaPosts)

listaPosts.forEach(element => {
    
    const newPost = new Post()
    newPost.renderizarPost(element, sectionPosts, Api.infoUsuario.autenticaçao.userId)
    //console.log(newPost.informaçoes)
    
});

publicar.addEventListener('submit', async function(event){
    event.preventDefault()

    const textoPost = event.target[0].value
    const criarPost = await Api.criarPost(Api.infoUsuario.autenticaçao.token, textoPost)
    //const listaPosts = await Api.listarPostsPorPagina(Api.infoUsuario.autenticaçao.token, pagina)

    const postCriado = await Api.listarUmPost(Api.infoUsuario.autenticaçao.token, criarPost.id)

    console.log(postCriado)

    document.location.reload(true)
        
})


// -------------Modal Edição----------------
const divModalEdiçao   = document.querySelector('.modal-ediçao')
const caixaEdiçao      = document.querySelector('#textoEdiçao')

divModalEdiçao.addEventListener('click', async function(event){
    if(event.target.id === 'fechar'){divModalEdiçao.style.display = 'none'}
    else if(event.target.id === 'editar'){

        const newText = caixaEdiçao.value

        const resposta = await Api.atualizarPost(Api.infoUsuario.autenticaçao.token, newText, Post.postSelecionado.id)
       
        document.location.reload(true)
    }
})
// ----------------------------------------------


const btnCarregarPosts = document.querySelector('.carregarMaisPosts')

btnCarregarPosts.addEventListener('click', async function(){
    pagina--

    const paginaPosts = await Api.listarPostsPorPagina(Api.infoUsuario.autenticaçao.token, pagina)
    const listaPosts = paginaPosts.data

    console.log(paginaPosts)

    listaPosts.forEach(element => {
    
        const newPost = new Post()
        newPost.renderizarPost(element, sectionPosts, Api.infoUsuario.autenticaçao.userId)
       //console.log(newPost.informaçoes)
    
    });

})