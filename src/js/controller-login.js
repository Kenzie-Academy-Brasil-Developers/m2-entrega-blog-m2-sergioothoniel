/*
email: othoniel@email.com
senha: 1989
*/

import { Api } from "./Api.js";

const formLogin = document.querySelector('.login')

formLogin.addEventListener('submit', async function(event){
    event.preventDefault()
    
    let usuario = {
        email: event.target[0].value,
        password: event.target[1].value
    }

    const response = await Api.logar(usuario)

    if(response.status == 500){
        window.alert('E-mail ou senha incorreto')
    }
    else{    
        const armezanarLocal = localStorage.setItem("autenticaçao_BlogM2", JSON.stringify(Api.infoUsuario.autenticaçao))
        const infoUser = await Api.getUser(Api.infoUsuario.autenticaçao.userId, Api.infoUsuario.autenticaçao.token)

        window.location.href = "./../../src/paginas/pagina-blog.html"
    }

        
})