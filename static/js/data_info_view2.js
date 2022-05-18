var info_view2 = echarts.init(document.getElementById('xpanel-l-4'));
var colors = ['#3A85D3', '#5AD8A6', '#5470c6', '#008000', '#61a0a8'];

var info_view2_option = {
    color: colors, //下面这种直接配置演示也行
    tooltip: {
        trigger: 'axis', //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据，
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['node', 'link'], //这里设置柱状图上面的方块，名称跟series里的name保持一致
//        align: 'right', //上面方块靠右还是居中的设置.不设置则居中
//        right: 10
    },
    grid: {
        left: '3%', //柱状图距离左边的距离，也可以用像素px
        right: '4%', //柱状图距离右边的距离，也可以用像素px
        bottom: '15%', //网格图（柱状图、折线图、气泡图等）离底部的距离，也可以用像素比如10px
        containLabel: true //grid 区域是否包含坐标轴的刻度标签。false可能溢出，默认为false
    },

    // 缩放组件
    dataZoom: {
        type: 'slider',
        bottom: '10%',
        start:0,
        end:60  //缩放组件显示70%的位置
    },
    xAxis: [{
        type: 'category',
        data: ['子图1-1', '子图1-2', '子图1-3', '子图1-4', '子图1-5', '子图2-1', '子图2-2', '子图2-3', '子图2-4', '子图2-5'],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            rotate: 45 //控制柱状图X轴label是否倾斜显示
        },
    }],
    yAxis: [{
        type: 'value'
    }],
    series: [{ //柱状图-柱子1
            name: 'node', //需要跟legend配置项对应
            type: 'bar',
            itemStyle: {
                barBorderRadius: [10, 10, 0, 0] //控制柱状图的圆角显示弧度，（顺时针左上，右上，右下，左下）
            },
            barWidth: '30%', //barWidth设置每根柱状图的宽度
            data: [110, 152, 200, 334, 390, 530, 1220, 1434, 1367, 1200]
        },
        { //柱状图-柱子2
            name: 'link',
            type: 'bar',
            itemStyle: {
                barBorderRadius: [10, 10, 0, 0] //控制柱状图的圆角显示弧度，（顺时针左上，右上，右下，左下）
            },
            barWidth: '30%',
            data: [310, 466, 598, 1289, 1370, 2310, 2200, 2134, 3467, 4132, 3123, 4240]
        },
    ]
};
info_view2.setOption(info_view2_option);