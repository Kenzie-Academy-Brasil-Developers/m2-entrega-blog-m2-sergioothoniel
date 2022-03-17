export class Post{
    
    constructor(){
        this.informaçoes = {}
    }

    renderizarPost(element, elementoPai, idUsuer){
                  
        this.informaçoes = {...element}
                
            const dataFormatada = Post.formatarDataBR(element.createdAt)

            const divPost = document.createElement('div')
            divPost.classList.add("listasPosts-divPost")

            if(element.owner.id === idUsuer){
                divPost.innerHTML = `
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
                divPost.innerHTML = `
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
            
            elementoPai.appendChild(divPost)          
           
    }

    static formatarDataBR(data){
        let arrayData = data.split('-')
        let dataBR = `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`
        return dataBR
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