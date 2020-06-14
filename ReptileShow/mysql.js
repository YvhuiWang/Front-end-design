
const mysql = require("mysql")


// 1.创建连接池
var pool = mysql.createPool({
    host:"localhost",
    port:3306,
    user:"root",
    password:"12345678",//这里改成自己的数据库密码
    database:"期末_DB"
})

// 2.连接池连接
var query = function (sql, callback) {

    // 【连接池连接】
    pool.getConnection(function (err, con) {
        // 【连接失败】
        if (err) {
            callback(err, null)
        }
        // 【连接成功】
        else {
            // 【数据库操作】
            con.query(sql, function (qerr, qdata) {
                // 【释放连接】
                con.release()
                // 【事件回调】
                callback(qerr, qdata)
            })
        }
    })
}



module.exports = query