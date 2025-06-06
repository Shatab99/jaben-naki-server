import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import globalErrorHandler from './app/Utils/globalError.handler'
import router from './app/modules/Router/index.router'
const app = express()


//basic middle ware

app.use(express.json())
app.use(cookieParser())
app.use(cors())

//rate limiter middleware



app.get('/', (req, res) => {
    res.send('Jaben naki server on live !')
})

// all routes here

app.use('/api/v1', router)

app.use(globalErrorHandler)


export default app