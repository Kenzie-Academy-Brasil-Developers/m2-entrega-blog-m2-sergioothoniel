export class Api{

    static rotaUser = "https://api-blog-m2.herokuapp.com/user"

    static infoUsuario = {
        autenticaçao:{},
        informaçoes:{}
    }
    
    static async criarUsuario(data){

        const response = await fetch("https://api-blog-m2.herokuapp.com/user/register", {
            //"mode": "no-cors",      //para tirar o erro de CORS
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
                        },
            "body": JSON.stringify(data)
        })
                
        return response.json()
    }

    static async logar(data){
        
        const response = await fetch("https://api-blog-m2.herokuapp.com/user/login", {
            //"mode": "no-cors",      //para tirar o erro de CORS
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
                        },
            "body": JSON.stringify(data)
        })

        const responseData = await response.json()

        this.infoUsuario.autenticaçao = {...responseData} 
        
        return response
    }

    static async getUser(idUser, token){

        const response = await fetch(`https://api-blog-m2.herokuapp.com/user/${idUser}`, {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`
                        },            
        })

        const responseData = await response.json()

        this.infoUsuario.informaçoes = {...responseData}

        return response               
    }

    static async listarPostsPorPagina(token, pagina){

        const response = await fetch(`https://api-blog-m2.herokuapp.com/post?page=${pagina}`, {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`,
                       },
                                                
        })

        const responseData = await response.json()

        return responseData        
    }

    static async criarPost(token, conteudo){

        const response = await fetch("https://api-blog-m2.herokuapp.com/post", {
            "method": "POST",
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
                       },
            "body": JSON.stringify({
                "content": conteudo
            })                                                
        })

        const responseData = await response.json()   

        return responseData
    }

    static async atualizarPost(token, conteudo, idPost){

        const response = await fetch("https://api-blog-m2.herokuapp.com/post/"+idPost, {
            "method": "PATCH",
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
                       },
            "body": JSON.stringify({
                "newContent": conteudo
            })                                                
        })

        return response
    }

    static async deletarPost(token, idPost){

        const response = await fetch("https://api-blog-m2.herokuapp.com/post/"+idPost, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Bearer ${token}`                
                       },                              
        })

        return response
    }

    static async listarUmPost(token, idPost){

        const response = await fetch("https://api-blog-m2.herokuapp.com/post/"+idPost, {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`                
                       },                                
        })

        return response.json()
    }
    
}