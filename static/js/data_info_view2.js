var info2_graph = echarts.init(document.getElementById('info2-2'));
// var info2_colors = ['#3A85D3', '#5AD8A6', '#5470c6', '#008000', '#61a0a8'];
var info2_colors = ['#749F83', '#65757D'];

var info2_option = {
    color: info2_colors,
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['node', 'link'],
        top:'0%'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top:'15%',
        containLabel: true
    },
    textStyle: '13',

    dataZoom: {
        type: 'slider',
        bottom: '5%',
        height: '20px',
        start:0,
        end:60
    },
    xAxis: [{
        type: 'category',
        data: ['子图1', '子图2', '子图3', '子图4', '子图5', '子图6', '子图7', '子图8', '子图9', '子图10','子图11'],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            rotate: 45
        },
    }],
    yAxis: [{
        type: 'value'
    }],
    series: [{
            name: 'node',
            type: 'bar',
            itemStyle: {
                barBorderRadius: [10, 10, 0, 0]
            },
            barWidth: '30%',
            data: [286, 311, 934, 1518, 732, 432, 265, 202, 592, 1553, 938]
        },
        {
            name: 'link',
            type: 'bar',
            itemStyle: {
                barBorderRadius: [10, 10, 0, 0]
            },
            barWidth: '30%',
            data: [649, 1459, 1099, 3576, 1512, 881, 415, 268, 881, 2651, 1670]
        },
    ]
};
info2_graph.setOption(info2_option);