export class Api{

    static rotaUser = "https://api-blog-m2.herokuapp.com/user"

    static infoUsuario = {
        autenticaçao:{},
        informaçoes:{}
    }

    static async criarUsuario(data){

        const response = await fetch("https://api-blog-m2.herokuapp.com/user/register", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
                        },
            "body": JSON.stringify(data)
        })
                
        return response
    }

    static async logar(data){
        
        const response = await fetch("https://api-blog-m2.herokuapp.com/user/login", {
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
        
    }
}