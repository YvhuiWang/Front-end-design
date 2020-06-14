
// 图1请求
$.ajax({
    data: {},
    type: "post",
    dataType: "json",
    url: `${host}/statisticsme1`,
    success: function (res) {
        // 数据数组
        let obj = res.data
        console.log(obj)




        /***************图表区域******************/

        var box1 = document.getElementsByClassName("box1")[0]


        // 创建图表实例
        var MyEcharts1 = echarts.init(box1)


        // 配置图表规则
        var option1 = {

            // 【1、标题】
            title: {
                show: true,
                // 主标题
                text: '各大网站新闻数量',
                // 主标题样式
                textStyle: {
                    // 颜色
                    color: "#00FF7F",
                    // 字体大小
                    fontSize: 20,
                    // 字体粗细
                    fontWeight: "bold",
                },
                // 定位位置
                left: "center",
                right: "auto",
                top: "auto",
                bottom: "auto"
            },


            // 【2、图例】
            legend: {
                show: true,
                // 图例数据
                data: ["新闻数量"],
                // 图例类型
                type: "scroll",  //plain普通排列、scroll滚动排列
                // 列表朝向
                orient: "vertical",   //horizontal水平、vertical垂直
                // 定位位置
                left: "right",
                right: "auto",
                top: "auto",
                bottom: "auto"
            },


            // 【3、X轴线】
            xAxis: {
                show: true,
                // 数据
                data: ["新浪网体育", "网易新闻" , "网易体育"],
                // 名称
                name: "类型",
                // 单位
                axisLabel: {
                    formatter: "{value}",
                }
                ,
                // 刻度
                axisTick: {
                    show: true,
                    alignWithLabel: true,
                    inside: false
                }
            },


            // 【4、Y轴线】
            yAxis: {
                show: true,
                // 名称
                name: "数量(条)",
                // 刻度
                axisTick: {
                    show: true,
                    alignWithLabel: true,
                    inside: false
                }
            },


            // 【5、网格区域】
            grid: {
                // 是否显示
                show: false,
                // 定位位置
                left: "10%",
                right: "10%",
                top: 60,
                bottom: 60
            },


            // 【6、信息提示】
            tooltip: {
                show: true,
                trigger: "item" // item无类目触发、axis有类目触发、none全不触发
            },


            // 【7、详情显示】
            axisPointer: {
                show: true,
                type: "line" // line线条、shadow阴影、none全不显示
            },


            // 【8、内容缩放】
            dataZoom: [
                {
                    type: "inside"  //inside鼠标轮缩放、slider滚动条缩放
                }
            ],


            // 【9、工具按钮】
            toolbox: {
                // 是否显示按钮
                show: true,
                // 是否显示按钮标题
                showTitle: true,
                // 配置各个按钮
                feature: {
                    // 还原
                    restore: {
                        show: true,
                        title: '还原'
                    },
                    // 切换
                    magicType: {
                        show: true,
                        title: {
                            line: '切换为折线图',
                            bar: '切换为柱状图'
                        },
                        type: ['line', 'bar']
                    },
                    // 视图
                    dataView: {
                        show: true,
                        title: '数据视图'
                    },
                    // 图片
                    saveAsImage: {
                        show: true,
                        title: '保存图片'
                    },

                },

                // 位置
                left: "right",
                right: "auto",
                top: "auto",
                bottom: 0
            },


            // 【10、柱线颜色】
            color: [
                "	#00FF7F"
            ],


            // 【11、全局文字】
            textStyle: {
                color: "#000",
                fontStyle: 'normal',
                fontWeight: "normal"
            },


            // 【12、系列列表】
            series: [

                // 【柱状bar】
                {
                    name: '新闻数量',
                    type: 'bar',
                    data: [
                        obj.arr1[0]["count(*)"],
                        obj.arr2[0]["count(*)"],
                        obj.arr3[0]["count(*)"],
                    ]
                }

            ]
        }


        // 使用图表规则
        MyEcharts1.setOption(option1)



        /***************图表区域******************/
















    }
})





