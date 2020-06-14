
$(function () {


    // 全局。显示条数
    window.showNum = 10
    // 全局。初始页数
    window.nowPage = 1


    // 发送请求-分页-无条件
    $.ajax({
        data: { page: window.nowPage, num: window.showNum },
        type: "post",
        dataType: "json",
        url: `${host}/loglimit`,
        success: function (res) {
            // 数据数组
            let arr = res.data
            console.log(arr)
            // 调用函数，渲染数据
            showData(arr)
        }
    })




    // 上一页按钮
    $(".prevbtn").on("click", function (e) {


        if (window.nowPage <= 1) {
            window.nowPage = 1
        } else {
            window.nowPage -= 1
        }

        console.log(window.nowPage)

        $(".nowpage").html(window.nowPage)


        // 发送请求-分页-无条件
        $.ajax({
            data: { page: window.nowPage, num: window.showNum },
            type: "post",
            dataType: "json",
            url: `${host}/loglimit`,
            success: function (res) {
                // 数据数组
                let arr = res.data
                // 调用函数，渲染数据
                showData(arr)
            }
        })




    })


    // 下一页按钮
    $(".nextbtn").on("click", function (e) {


        window.nowPage += 1

        console.log(window.nowPage)

        $(".nowpage").html(window.nowPage)


        // 发送请求-分页-无条件
        $.ajax({
            data: { page: window.nowPage, num: window.showNum },
            type: "post",
            dataType: "json",
            url: `${host}/loglimit`,
            success: function (res) {
                // 数据数组
                let arr = res.data
                // 调用函数，渲染数据
                showData(arr)
            }
        })



    })



    // 封装函数，渲染内容
    function showData(arr) {

        // 清空全部内容
        $(".showbox_table").html("")

        // 插入标题
        $(".showbox_table").append(
            `
            <tr>
                <td>ID</td>
                <td>用户</td>
                <td>记录</td>
                <td>时间</td>
            </tr>
            `
        )


        // 插入数据
        arr.forEach((item, index, array) => {
            $(".showbox_table").append(
                `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.username}</td>
                    <td>${item.info}</td>
                    <td>${item.time}</td>
                </tr>
                `
            )
        })


    }

})
