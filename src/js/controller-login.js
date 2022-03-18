/*
email: fla@email.com
senha: 1989
*/

import { Api } from "./Api.js";

const autenticaçaoAutomatica = await JSON.parse(localStorage.getItem('autenticaçao_BlogM2'))


if(autenticaçaoAutomatica){
    const acessarUsuario  = await Api.getUser(autenticaçaoAutomatica.userId, autenticaçaoAutomatica.token)
    Api.infoUsuario.autenticaçao = {...autenticaçaoAutomatica}

    window.location.href = "./../src/paginas/pagina-blog.html"   
}



const formLogin = document.querySelector('.login')

formLogin.addEventListener('submit', async function(event){
    event.preventDefault()
    
    let usuario = {
        email: event.target[0].value,
        password: event.target[1].value
    }

    const response = await Api.logar(usuario)

    if(response.status == 500 || response.status == 400){
        window.alert('E-mail ou senha incorreto')
    }
    else{    
        const armezanarLocal = localStorage.setItem("autenticaçao_BlogM2", JSON.stringify(Api.infoUsuario.autenticaçao))
        const infoUser = await Api.getUser(Api.infoUsuario.autenticaçao.userId, Api.infoUsuario.autenticaçao.token)

        window.location.href = "./../../src/paginas/pagina-blog.html"
    }

        
})