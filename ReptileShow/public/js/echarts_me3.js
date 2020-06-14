



$.ajax({
    data: {},
    type: "post",
    dataType: "json",
    url: `${host}/statisticsme3`,
    success: function (res) {
        // 数据数组
        let obj = res.data
        console.log(obj)



        /***************图表区域******************/

        var box3 = document.getElementsByClassName("box3")[0]


        // 创建图表实例
        var MyEcharts3 = echarts.init(box3)


        // 配置图表规则
        

 sourceData = [{'name': '霍华德', 'value': 14, 'extData': [obj.arr1[0]["count(*)"], '#DFFFDF', 0, '']},
 {'name': '尼尔森', 'value': 14, 'extData': [obj.arr2[0]["count(*)"], '#93FF93', 0, '']},
 {'name': '詹姆斯', 'value': 20, 'extData': [obj.arr3[0]["count(*)"], '#7AFEC6', 0, '']},
 {'name': '科比', 'value': 22, 'extData': [obj.arr4[0]["count(*)"], '#1AFD9C', 0, '']},
 {'name': '格林', 'value': 30, 'extData': [obj.arr5[0]["count(*)"], '#4DFFFF', 0, '']},
 {'name': '维金斯', 'value': 45, 'extData': [obj.arr6[0]["count(*)"], '#00E3E3', 0, '']},
 {'name': '汤神', 'value': 50, 'extData': [obj.arr7[0]["count(*)"], '#2894FF', 0, '']},
 {'name': '杜兰特', 'value': 57, 'extData': [obj.arr8[0]["count(*)"], '#0072E3', 0, '']},
 {'name': '拉塞尔', 'value': 60, 'extData': [obj.arr9[0]["count(*)"], '#4A4AFF', 0, '']},
 {'name': '库里', 'value': 100, 'extData': [obj.arr10[0]["count(*)"], '#0000C6', 0, '']}]


graphicData = [{
    type: 'group',
    left: 'center',
    top: '60%',
    bounding: 'raw', //重要，否则内容无法超过组
    z: 100,
    children: []
}]
graphicScatter = {
    type: 'circle',
    shape: {
        r: 2
    },
    style: {
        fill: 'white'
    },
    z: 100
}
graphicText = [{
    type: 'text',
    // left: 'center',
    // top: 10,
    z: 100,
    style: {
        fill: 'white',
        text: '韩国',
        font: 'bold 16px Microsoft YaHei',
        textAlign: 'center'
    }
}, {
    type: 'text',
    // left: 'center',
    // top: 40,
    z: 100,
    style: {
        fill: 'white',
        text: '5766例',
        font: 'bold 14px Microsoft YaHei',
        textAlign: 'center',

    }
}, {
    type: 'text',
    // left: 'center',
    // top: 70,
    z: 100,
    style: {
        fill: 'white',
        text: '死亡36例',
        font: 'bold 12px Microsoft YaHei',
        textAlign: 'center'
    }
}]
graphic_total_Text = [{
    type: 'text',
    right: -220,
    bottom: 500,
    z: 100,
    style: {
        fill: 'black',
        text: '数据时间2020年1月-6月',
        font: 'bold 12px Microsoft YaHei',
        textAlign: 'right'
    }
}]
graphicChildren = {
    type: 'group',
    // left: 'center',
    // top: 'center',
    position: [],
    bounding: 'raw',
    z: 100,
    children: []

}

function convertData1() {
    var maxScale = 1
    var minScale = 0.1
    var stepRadius = 2 * Math.PI / sourceData.length
    var stepScale = (maxScale - minScale) / sourceData.length
    for (var i = 0; i < sourceData.length; i++) {
        sourceData[i].itemStyle = {
            color: sourceData[i]["extData"][1],
            borderWidth: 0
        }
        sourceData[i].label = {
            show: i > 6 ? false : false,
            position: i <= 5 ? "outer" : "inside",
            // alignTo: "labelLine",
            align: "right",
            borderWidth: 1,
            borderColor: "red",
            alignTo: "edge",
            margin: 650,
            formatter: (a) => {
                return a.data.extData[3]
            }
        }
        sourceData[i].labelLine = {
            show: i > 6 ? false : false,
            // length: i <= 5 ? 5 * (i - 5) : 0,
            // length2: i <= 5 ? 0 : 0,
            lineStyle: {
                type: "dashed"
            }
        }
        var curRadius = (i + 0.5) * stepRadius
        // var curArclen = 1
        var curScale = i > 0 ? minScale + stepScale * (i) : 0.6 + stepScale * (i)
        var startR = i > 0 ? sourceData[i]["value"] * 450 / sourceData.slice(-1)[0]["value"] * 0.95 : ((
            sourceData[i]["value"] * 460 / sourceData.slice(-1)[0]["value"] + 20))
        var curR = [startR, startR * (i > 33 ? 0.95 : (i > 0 ? 0.75 : 1.12)), startR * (i > 33 ? 0.95 : (i >
            0 ? 0.8 : 1.17)) * (i > 33 ? 0.95 :
            (i > 0 ? 0.8 : 1.17))]
        var curPositions = []
        var curChilds = []
        var curCircles = []
        for (var j = 0; j < 3; j++) {
            var curX = Math.sin(curRadius) * curR[j]
            var curY = -Math.cos(curRadius) * curR[j]
            curPositions.push([curX, curY])
            var curChild = JSON.stringify(graphicChildren)
            curChild = JSON.parse(curChild)
            curChild.position = [curX, curY]
            curChild.rotation = i > 33 ? -((i + 0.5) / sourceData.length * 2 * Math.PI) : (i <= 0 ? -((i +
                0.5) / sourceData.length * 2 * Math.PI) + Math.PI / 2 : 0)
            curChild.scale = [curScale, curScale]
            curgraphicText = JSON.parse(JSON.stringify(graphicText[j]))
            curgraphicText.style.text = j == 0 ? sourceData[i]["name"] : (j == 1 ? (i > 0 ? sourceData[i][
                "extData"
            ][0] + "条新闻" : "") : (j == 2 && i > 33 ? (sourceData[i][
                "extData"
            ][2] + "个") : (i <= 0 ? sourceData[i][
                "extData"
            ][3] : "")))
            
            if (i <= 0) {
                curgraphicText.style.fill = "black"
                curgraphicText.style.textAlign = "left"
            }
            curChild.children = [curgraphicText]
            curChilds.push(curChild)
            // var curCircle = JSON.parse(JSON.stringify(graphicScatter))
            // curCircle.position = [curX, curY]
            // curCircles.push(curCircle)
            // graphicData[0].children.push(curCircle)
            graphicData[0].children.push(curChild)
        }
        console.log(i, sourceData[i]["name"], curRadius, curR, curPositions)
    }
    for (var m = 0; m < 3 * 2; m++) {
        var cur_total_text = graphic_total_Text[m]
        graphicData[0].children.push(cur_total_text)
    }
    return sourceData
}



option = {
    title: {
        text: '体育明星新闻个数',
        // subtext: '纯属虚构',
        left: 'center',
        textStyle: {
            //color: "red",
            fontSize: 40
        },
        //backgroundColor: "rgb(199,16,16)",
        top: "2%"
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    // legend: {
    //     left: 'center',
    //     top: 'bottom',
    //     data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
    // },
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: false
            },
            magicType: {
                show: true,
                type: ['pie', 'funnel']
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    graphic: graphicData,
    series: [{
        name: '新闻个数',
        type: 'pie',
        radius: [20, 450],
        center: ['50%', '60%'],
        label: {
            show: true
        },
        roseType: 'area',
        data: convertData1(),
        rich: {
            a: {
                color: 'white',
                lineHeight: 10
            },
            b: {
                backgroundColor: {
                    image: 'xxx/xxx.jpg'
                },
                height: 40
            },
            x: {
                fontSize: 18,
                fontFamily: 'Microsoft YaHei',
                borderColor: '#449933',
                borderRadius: 4
            }
        }
    }]
};


        // 使用图表规则
        MyEcharts3.setOption(option)


        /***************图表区域******************/










    }
})





