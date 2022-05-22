var info2_graph = echarts.init(document.getElementById('info2-2'));
var info2_colors = ['#3A85D3', '#5AD8A6', '#5470c6', '#008000', '#61a0a8'];

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
    },
    grid: {
        left: '3%', 
        right: '4%', 
        bottom: '15%', 
        containLabel: true 
    },

    dataZoom: {
        type: 'slider',
        bottom: '10%',
        start:0,
        end:60 
    },
    xAxis: [{
        type: 'category',
        data: ['子图1-1', '子图1-2', '子图1-3', '子图1-4', '子图1-5', '子图2-1', '子图2-2', '子图2-3', '子图2-4', '子图2-5'],
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
            data: [110, 152, 200, 334, 390, 530, 1220, 1434, 1367, 1200]
        },
        { 
            name: 'link',
            type: 'bar',
            itemStyle: {
                barBorderRadius: [10, 10, 0, 0] 
            },
            barWidth: '30%',
            data: [310, 466, 598, 1289, 1370, 2310, 2200, 2134, 3467, 4132, 3123, 4240]
        },
    ]
};
info2_graph.setOption(info2_option);
