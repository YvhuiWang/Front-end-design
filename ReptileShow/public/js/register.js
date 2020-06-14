
$(function () {

    $(".btn").on("click", (e) => {

        // 阻止默认事件
        e.preventDefault()

        // 获取账号
        let username_val = $(".username").val()
        // 获取密码
        let password_val = $(".password").val()

        // 正则-账号
        let username_reg = /^\w{3,10}$/;          //数字字母下划线。3~10
        // 正则-密码
        let password_reg = /^\w{3,10}$/;          //数字字母下划线。3~10

        console.log(username_val)

        // 判断格式。如果错误，弹出提醒。如果正确。发送请求
        if (username_reg.test(username_val) == false) {  //格式错误
            alert("账号格式错误。请输入3~10位的数字字母下划线内容。")
        } else if (password_reg.test(password_val) == false) {
            alert("密码格式错误。请输入3~10位的数字字母下划线内容。")
        } else {
            // 格式全部正确。可以发送请求
            // 形成对象
            let dataObj = {
                username: username_val,
                password: password_val
            }
            // 发送请求
            $.ajax({
                data: dataObj,
                type: "post",
                dataType: "json",
                url: `${host}/register`,
                success: function (res) {
                    console.log(res)
                    if (res.code == 500) {
                        alert("账号已存在")
                    } else {
                        window.location.href = `${host}/login`
                    }
                }
            })

        }



    })

})
