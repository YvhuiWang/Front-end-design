const express = require("express")
const app = express()
const host = 8080
const router = require("./router.js")
const bodyParser = require("body-parser")
const session = require("express-session")
const expressArtTemplate = require("express-art-template")


// 使用静态资源
app.use( "/node_modules" , express.static("./node_modules") )
app.use( "/public" , express.static("./public") )

// 使用POST请求
app.use( bodyParser.urlencoded({extended:false,limit:"100mb"}) )
app.use( bodyParser.json() )

// 使用session模块
app.use( session({
    secret:"mimi",              //【秘密】
    resave:false,               //【重新】
    saveUninitialized:true      //【保存】
}) )

// 使用模板引擎
app.engine("html" , expressArtTemplate)             //【当文件后缀名字是XXX的时候。使用模板引擎】【可以写多个配置】
app.set("views" , "view")                           //【改变官方默认views目录名字。使用自己目录】【必须是个文件夹】




// 应用路由【所有模块配置完毕之后应用路由。防止报错】
app.use( router )




app.listen( host , console.log(`启动。网址是http://127.0.0.1:${host}`) )