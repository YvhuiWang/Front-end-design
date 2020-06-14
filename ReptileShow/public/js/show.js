
$(function () {

    // 全局。显示条数
    window.showNum = 10
    // 全局。初始页数
    window.nowPage = 1
    // 全局。是否条件
    window.meObj = null



    // 发送请求-分页-无条件
    $.ajax({
        data: { page: window.nowPage, num: window.showNum },
        type: "post",
        dataType: "json",
        url: `${host}/showalllimit`,
        success: function (res) {
            // 数据数组
            let arr = res.data
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


        // 无条件分页
        if (window.meObj == null) {

            // 发送请求-分页-无条件
            $.ajax({
                data: { page: window.nowPage, num: window.showNum },
                type: "post",
                dataType: "json",
                url: `${host}/showalllimit`,
                success: function (res) {
                    // 数据数组
                    let arr = res.data
                    // 调用函数，渲染数据
                    showData(arr)
                }
            })
        } else {
            // 有条件分页
            // 使用最新页数
            window.meObj.page = window.nowPage
            // console.log(window.meObj)
            // 发送请求
            $.ajax({
                data: window.meObj,
                type: "post",
                dataType: "json",
                url: `${host}/showwhere`,
                success: function (res) {
                    console.log(res)
                    let arr = res.data
                    // 调用函数，渲染内容
                    showData(arr)
                }
            })
        }



    })


    // 下一页按钮
    $(".nextbtn").on("click", function (e) {


        window.nowPage += 1

        console.log(window.nowPage)

        $(".nowpage").html(window.nowPage)


        // 无条件分页
        if (window.meObj == null) {

            // 发送请求-分页-无条件
            $.ajax({
                data: { page: window.nowPage, num: window.showNum },
                type: "post",
                dataType: "json",
                url: `${host}/showalllimit`,
                success: function (res) {
                    // 数据数组
                    let arr = res.data
                    // 调用函数，渲染数据
                    showData(arr)
                }
            })
        } else {
            // 有条件分页
            // 使用最新页数
            window.meObj.page = window.nowPage
            // console.log(window.meObj)
            // 发送请求
            $.ajax({
                data: window.meObj,
                type: "post",
                dataType: "json",
                url: `${host}/showwhere`,
                success: function (res) {
                    console.log(res)
                    let arr = res.data
                    // 调用函数，渲染内容
                    showData(arr)
                }
            })
        }


    })








    $(".cha3").css({ display: "none" })

    // 选择查询
    $(".cha2").on("change", function () {

        let cha2_val = $(".cha2").val()

        console.log(cha2_val)

        if (cha2_val == "none") {
            // 布尔输入框消失
            $(".cha3").hide(100)
            // 清空数据
            $(".cha3").val("")
        } else {
            // 布尔输入框出现
            $(".cha3").show(100)
            // 清空数据
            $(".cha3").val("")
        }


    })

    // 查询按钮
    $(".chabtn").on("click", function () {

        console.log("你点击了查询按钮")

        let cha1_val = $(".cha1").val()
        let cha2_val = $(".cha2").val()
        let cha3_val = $(".cha3").val()
        let cha4_val = $(".cha4").val()


        if (cha1_val == "") {
            alert("请输入第一个查询条件")
        } else if (cha2_val != "none" && cha3_val == "") {
            alert("请输入第二个查询条件")
        } else {

            // 可以发送请求

            // 因为是首次条件查询。所以初始页数为1
            window.nowPage = 1

            $(".nowpage").html(window.nowPage)

            let obj = {
                cha1_val,
                cha2_val,
                cha3_val,
                cha4_val,
                page: window.nowPage,
                num: window.showNum
            }

            // 设置全局查询对象。用于判断分页时请求不同地址。
            window.meObj = obj

            // 发送请求
            $.ajax({
                data: window.meObj,
                type: "post",
                dataType: "json",
                url: `${host}/showwhere`,
                success: function (res) {
                    console.log(res)
                    let arr = res.data
                    // 调用函数，渲染内容
                    showData(arr)
                }
            })
        }

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
                <td>ArticID</td>
                <td>资源</td>
                <td>标题</td>
                <td>作者</td>
                <td>网址</td>
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
                    <td>${item.articid}</td>
                    <td>${item.source}</td>
                    <td>${item.title}</td>
                    <td>${item.author}</td>
                    <td><a href="${item.href}" target="_blank" >${item.href}</a></td>
                    <td>${item.time}</td>
                    
                </tr>
                `
            )
        })


    }





})
