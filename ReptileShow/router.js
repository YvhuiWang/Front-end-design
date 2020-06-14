const express = require("express")
const router = express.Router()
const mysqlquery = require("./mysql.js")



// 渲染注册页面
router.get("/register", (req, res) => {
    if (req.session.online) {
        // 重定向到首页
        res.redirect("/")
    } else {
        res.render("register.html")
    }
})



// 处理注册请求
router.post("/register", (req, res) => {

    // console.log( req.body )

    let meobj = req.body

    // 查询数据库。如果没有，可以注册。如果已有，不可注册。
    let sql = `select * from user where username="${meobj.username}"`
    mysqlquery(sql, (err, data) => {
        // 如果已有，不可注册。
        if (data.length != 0) {
            res.send({ code: 500 })
        } else {
            // 如果没有，可以注册。
            let sql = `insert into user (username,password) values ("${meobj.username}","${meobj.password}") `
            // 日志函数
            logFN(meobj.username, "注册")
            // 插入用户
            mysqlquery(sql, (err) => {
                // 响应前端
                res.send({ code: 200 })
            })
        }
    })

})




// 渲染登录页面
router.get("/login", (req, res) => {
    if (req.session.online) {
        // 重定向到首页
        res.redirect("/")
    } else {
        res.render("login.html")
    }

})




// 处理登录请求
router.post("/login", (req, res) => {

    let meobj = req.body

    let sql = `select * from user where username="${meobj.username}" and password="${meobj.password}" `

    mysqlquery(sql, (err, data) => {

        // 如果没有。登录失败
        if (data.length == 0) {
            
            res.send({ code: 500 })
        } else {
            // 如果存在。登录成功
           
            // 日志函数
            logFN(meobj.username, "登录")

            // 设置session状态
            req.session.online = meobj.username
            // 响应前端
            res.send({ code: 200 })
        }

    })

})



// 渲染首页页面
router.get("/", (req, res) => {

    if (req.session.online) {
        // 如果登录，显示首页
        res.render("index.html")
    } else {
        // 如果没有登录，重定向到登录页面
        res.redirect("/login")
    }

})




// 封装日志函数
function logFN(username, info) {

    let sql = ` insert into log (username,info,time) values ("${username}","${info}","${new Date().toLocaleString()}") `

    mysqlquery(sql, (err) => {
        // console.log("插入日志成功")
    })


}



// 渲染数据显示页面
router.get("/show", (req, res) => {
    if (req.session.online) {
        res.render("show.html")
    } else {
        res.render("warn.html")
    }
})


// 渲染分析统计页面
router.get("/statistics", (req, res) => {
    if (req.session.online) {
        res.render("statistics.html")
    } else {
        res.render("warn.html")
    }
})


// 渲染详情日志页面
router.get("/log", (req, res) => {
    if (req.session.online) {
        res.render("log.html")
    } else {
        res.render("warn.html")
    }
})








// 处理showalllimit请求
router.post("/showalllimit", (req, res) => {

    let meobj = req.body

    let page = meobj.page

    let num = meobj.num

    let start = num * (page - 1)

    let end = num

    // let sql = ` select count(*) from sina `
    let sql = ` select * from sina limit ${start},${end} `

    mysqlquery(sql, (err, data) => {

        // 日志函数
        logFN(req.session.online, "普通查询")

        res.send({ code: 200, data: data })

    })

})







// 处理showwhere请求
router.post("/showwhere", (req, res) => {

    let meobj = req.body

    let page = meobj.page

    let num = meobj.num

    let start = num * (page - 1)

    let end = num


    let sql = "select * from sina";

    if (meobj.cha2_val == "none") {
        sql = `select * from sina where title like "%${meobj.cha1_val}%" order by id ${meobj.cha4_val} limit ${start},${end}  `
    } else {
        // sql = `select * from sina where source="${meobj.cha1_val}"  ${meobj.cha2_val} title="${meobj.cha3_val}" order by id ${meobj.cha4_val} limit ${start},${end}  `
        sql = `select * from sina where title like "%${meobj.cha1_val}%"  ${meobj.cha2_val} title like "%${meobj.cha3_val}%" order by id ${meobj.cha4_val} limit ${start},${end}  `
    }

    // console.log(sql)

    mysqlquery(sql, (err, data) => {

        // 日志函数
        logFN(req.session.online, "条件查询")

        res.send({ code: 200, data: data })

    })





})








// 处理loglimit请求
router.post("/loglimit", (req, res) => {


    let meobj = req.body

    let page = meobj.page

    let num = meobj.num

    let start = num * (page - 1)

    let end = num

    // console.log(meobj)

    let sql = `select * from log order by id desc limit ${start},${end}`

    // console.log(sql)

    mysqlquery(sql, (err, data) => {

        // 查看日志的操作。不需要记录到日志数据库中。

        res.send({ code: 200, data: data })

    })



})









// 封装函数。函数里面创建Promise实例对象。返回Promise实例对象
let mefn = function (sql) {
    let ShiLiObj = new Promise(function (ok, no) {

        mysqlquery(sql, (err, data) => {

            ok(data)

        })

    })
    return ShiLiObj
}







// 资源语句
let source_sql1 = 'select count(*) from sina where source="新浪网体育"  '
let source_sql2 = 'select count(*) from sina where source="网易新闻"  '
let source_sql3 = 'select count(*) from sina where source="网易体育"  '
// 资源对象
let source_obj = {}
// 封装函数。异步函数。处理Promise实例对象
async function mefn_handle1(res) {

    source_obj.arr1 = await mefn(source_sql1)
    source_obj.arr2 = await mefn(source_sql2)
    source_obj.arr3 = await mefn(source_sql3)

    
    // 响应前端
    res.send({ code: 200, data: source_obj })

}
// 处理statisticsme1图1请求
router.post("/statisticsme1", (req, res) => {



    mefn_handle1(res)



})





// 月份语句
let month_sql1 = ` select count(*) from sina where time like "01%" or time like "(01月%)"  or time like "2020-01%"`
let month_sql2 = ` select count(*) from sina where time like "02%" or time like "(02月%)" or time like "2020-02%"`
let month_sql3 = ` select count(*) from sina where time like "03%" or time like "(03月%)" or time like "2020-03%"`
let month_sql4 = ` select count(*) from sina where time like "04%" or time like "(04月%)" or time like "2020-04%"`
let month_sql5 = ` select count(*) from sina where time like "05%" or time like "(05月%)" or time like "2020-05%"`
let month_sql6 = ` select count(*) from sina where time like "06%" or time like "(06月%)" or time like "2020-06%"`
let month_sql7 = ` select count(*) from sina where time like "07%" or time like "(07月%)" or time like "2020-07%"`
let month_sql8 = ` select count(*) from sina where time like "08%" or time like "(08月%)" or time like "2020-08%"`
let month_sql9 = ` select count(*) from sina where time like "09%" or time like "(09月%)" or time like "2020-09%"`
let month_sql10 = ` select count(*) from sina where time like "10%" or time like "(10月%)" or time like "2020-10%"`
let month_sql11 = ` select count(*) from sina where time like "11%" or time like "(11月%)" or time like "2020-11%"`
let month_sql12 = ` select count(*) from sina where time like "12%" or time like "(12月%)" or time like "2020-12%"`
// 月份对象
let month_obj = {}
// 封装函数。异步函数。处理Promise实例对象
async function mefn_handle2(res) {

    month_obj.arr1 = await mefn(month_sql1)
    month_obj.arr2 = await mefn(month_sql2)
    month_obj.arr3 = await mefn(month_sql3)
    month_obj.arr4 = await mefn(month_sql4)
    month_obj.arr5 = await mefn(month_sql5)
    month_obj.arr6 = await mefn(month_sql6)
    month_obj.arr7 = await mefn(month_sql7)
    month_obj.arr8 = await mefn(month_sql8)
    month_obj.arr9 = await mefn(month_sql9)
    month_obj.arr10 = await mefn(month_sql10)
    month_obj.arr11 = await mefn(month_sql11)
    month_obj.arr12 = await mefn(month_sql12)

    // 输出对象
    // console.log(month_obj)

    // 响应前端
    res.send({ code: 200, data: month_obj })

}
// 处理statisticsme2图2请求
router.post("/statisticsme2", (req, res) => {


    // 调用异步函数
    mefn_handle2(res)


})





// 专题语句
let about_sql1 = ` select count(*) from sina where title like "%霍华德%"  `
let about_sql2 = ` select count(*) from sina where title like "%尼尔森%"  `
let about_sql3 = ` select count(*) from sina where title like "%詹姆斯%"  `
let about_sql4 = ` select count(*) from sina where title like "%科比%"  `
let about_sql5 = ` select count(*) from sina where title like "%格林%"  `
let about_sql6 = ` select count(*) from sina where title like "%维金斯%"  `
let about_sql7 = ` select count(*) from sina where title like "%汤神%"  `
let about_sql8 = ` select count(*) from sina where title like "%杜兰特%"  `
let about_sql9 = ` select count(*) from sina where title like "%拉塞尔%"  `
let about_sql10 =` select count(*) from sina where title like "%库里%"  `

// 专题语句
let about_obj = {}
// 封装函数。异步函数。处理Promise实例对象
async function mefn_handle3(res) {

    about_obj.arr1 = await mefn(about_sql1)
    about_obj.arr2 = await mefn(about_sql2)
    about_obj.arr3 = await mefn(about_sql3)
    about_obj.arr4 = await mefn(about_sql4)
    about_obj.arr5 = await mefn(about_sql5)
    about_obj.arr6 = await mefn(about_sql6)
    about_obj.arr7 = await mefn(about_sql7)
    about_obj.arr8 = await mefn(about_sql8)
    about_obj.arr9 = await mefn(about_sql9)
    about_obj.arr10 = await mefn(about_sql10)
    


    // 响应前端
    res.send({ code: 200, data: about_obj })

}
// 处理statisticsme3图3请求
router.post("/statisticsme3", (req, res) => {


    // 调用异步函数
    mefn_handle3(res)


})








// 专题语句
let say_sql1 = ` select count(*) from sina where title like "%詹姆斯%"  `
let say_sql2 = ` select count(*) from sina where title like "%库里%"  `
let say_sql3 = ` select count(*) from sina where title like "%杜兰特%" `
let say_sql4 = ` select count(*) from sina where title like "%格林%" `
// 专题语句
let say_obj = {}
// 封装函数。异步函数。处理Promise实例对象
async function mefn_handle4(res) {

    say_obj.arr1 = await mefn(say_sql1)
    say_obj.arr2 = await mefn(say_sql2)
    say_obj.arr3 = await mefn(say_sql3)
    say_obj.arr4 = await mefn(say_sql4)


    // 输出对象
    // console.log(say_obj)

    // 响应前端
    res.send({ code: 200, data: say_obj })

}
// 处理statisticsme4图4请求
router.post("/statisticsme4", (req, res) => {


    // 调用异步函数
    mefn_handle4(res)


})









module.exports = router