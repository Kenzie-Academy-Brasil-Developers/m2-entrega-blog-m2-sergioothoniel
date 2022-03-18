import { Api } from "./Api.js"

export class Post{
    
    constructor(){
        this.divPost = document.createElement('div')
        this.divPost.classList.add("listasPosts-divPost")
        this.divPost.addEventListener('click', this)
        this.informaçoes = {}
    }

    static postSelecionado = {}

    renderizarPost(element, elementoPai, idUsuer){
                  
        this.informaçoes = {...element}
                
            const dataFormatada = Post.formatarDataBR(element.createdAt)

            if(element.owner.id === idUsuer){
                this.divPost.innerHTML = `
            <img src=${element.owner.avatarUrl} alt="">
            <div class="listasPosts-divPost-conteudo">
                <div class="listasPosts-divPost-conteudo-usuario">${element.owner.username}</div>
                <article class="listasPosts-divPost-conteudo-texto">${element.post}
                </article>
            </div>
            <aside class="listasPosts-divPost-opçoes">
                <span class="botaoEditar">Editar</span>
                <span class="botaoApagar">Apagar</span>
                <span class="dataPost">${dataFormatada}</span>
            </aside>
            `      
            }else{
                this.divPost.innerHTML = `
            <img src=${element.owner.avatarUrl} alt="">
            <div class="listasPosts-divPost-conteudo">
                <div class="listasPosts-divPost-conteudo-usuario">${element.owner.username}</div>
                <article class="listasPosts-divPost-conteudo-texto">${element.post}
                </article>
            </div>
            <aside class="listasPosts-divPost-opçoes">
                <span class="dataPost">${dataFormatada}</span>
            </aside>
            `      
            }
            
            elementoPai.appendChild(this.divPost)          
           
    }

    static formatarDataBR(data){
        let arrayData = data.split('-')
        let dataBR = `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`
        return dataBR
    }

    async handleEvent(event){
        
        Post.postSelecionado = {...this.informaçoes}
       
        if(event.target.classList.value === 'botaoEditar'){
            const divModalEdiçao = document.querySelector('.modal-ediçao')
            divModalEdiçao.style.display = 'flex' 
        }
        else if(event.target.classList.value === 'botaoApagar'){

            const response = await Api.deletarPost(Api.infoUsuario.autenticaçao.token, this.informaçoes.id)
            console.log(response)
            
            document.location.reload(true)
        }
               
    }

}

/*<div class="listasPosts-divPost">
<img src="https://github.com/wence-.png" alt="">
<div class="listasPosts-divPost-conteudo">
    <div class="listasPosts-divPost-conteudo-usuario">Othoniel</div>
    <article class="listasPosts-divPost-conteudo-texto">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse repellendus omnis laboriosam, blanditiis nostrum tempore vel veniam quis fugit sed sit perferendis delectus a laudantium incidunt recusandae amet nam! Illum!
    </article>
</div>
<aside class="listasPosts-divPost-opçoes">
    <span class="botaoEditar">Editar</span>
    <span class="botaoApagar">Apagar</span>
    <span class="dataPost">17/03/2022</span>
</aside>
</div>
*/