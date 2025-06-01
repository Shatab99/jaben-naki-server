import { Server } from "http"
import app from "./app"
import config from "./app/config"
import mongoose from "mongoose"

let server: Server

async function main() {
    try {
        // await mongoose.connect("mongodb+srv://shatab:1234@cluster0.agvk1.mongodb.net/Jaben-naki-Db?retryWrites=true&w=majority&appName=Cluster0")
        await mongoose.connect(config.database_url as string)
        server = app.listen(config.port, () => {
            console.log(`Jaben Naki Server listening at http://localhost:${config.port}`)
        })
    }
    catch(err){
        console.log(err)
    }
}


main()


