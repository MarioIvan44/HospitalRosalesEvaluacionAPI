import app from "./app.js"
import "./database.js"

async function main() {
    try{
        app.listen(4000)
        console.log("Servidor escuchando en el puerto 4000")
    }
    catch(error){
        console.error("error iniciando servidor: ", error)
    }
}

main();