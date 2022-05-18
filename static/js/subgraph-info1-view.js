var subgraph_info1 = echarts.init(document.getElementById('xpanel-r-2'));
var hours = ['子图1-1', '子图1-2', '子图1-3',
    '子图1-4', '子图1-5', '子图2-1',
    '子图2-2', '子图2-3','子图2-4',
    '子图2-5'
];
var days = ['A', 'B', 'C',
    'D', 'E','F','G','I'
];
// {'A': 0.3, 'B': 0.225, 'C': 0.05, 'D': 0.0,
// 'E': 0.3, 'F': 0.0, 'G': 0.125, 'H': 0.0, 'I': 0.0}
var data = [
    [0, 0, 0.3],
    [1, 0, 0.225],
    [2, 0, 0.05],
    [3, 0, 0],
    [4, 0, 0.3],
    [5, 0, 0],
    [6, 0, 0.125],
    [7, 0, 0],
    [8, 0, 0],
    [0, 1, 0.0],
    [1, 1, 1],
    [2, 1, 0],
    [3, 1, 0],
    [4, 1, 0],
    [5, 1, 0],
    [6, 1, 0],
    [7, 1, 0],
    [8, 1, 0],
    [0, 2, 0.0],
    [1, 2, 0],
    [2, 2, 0],
    [3, 2, 0],
    [4, 2, 0],
    [5, 2, 0],
    [6, 2, 0],
    [7, 2, 0],
    [8, 2, 0],
    [0, 3, 0.0],
    [1, 3, 0],
    [2, 3, 0],
    [3, 3, 0],
    [4, 3, 0],
    [5, 3, 0],
    [6, 3, 0],
    [7, 3, 0],
    [8, 3, 0],
    [0, 4, 0.0],
    [1, 4, 0],
    [2, 4, 0],
    [3, 4, 0],
    [4, 4, 0],
    [5, 4, 0],
    [6, 4, 0],
    [7, 4, 0],
    [8, 4, 0],
    [0, 5, 0.0],
    [1, 5, 0],
    [2, 5, 0],
    [3, 5, 0],
    [4, 5, 0],
    [5, 5, 0],
    [6, 5, 0],
    [7, 5, 0],
    [8, 5, 0],
    [0, 6, 0.0],
    [1, 6, 0],
    [2, 6, 0],
    [3, 6, 0],
    [4, 6, 0],
    [5, 6, 0],
    [6, 6, 0],
    [7, 6, 0],
    [8, 6, 0],
    [0, 7, 0.0],
    [1, 7, 0],
    [2, 7, 0],
    [3, 7, 0],
    [4, 7, 0],
    [5, 7, 0],
    [6, 7, 0],
    [7, 7, 0],
    [8, 7, 0.0],
    [0, 8, 0.0],
    [1, 8, 0],
    [2, 8, 0],
    [3, 8, 0],
    [4, 8, 0],
    [5, 8, 0],
    [6, 8, 0],
    [7, 8, 0],
    [8, 8, 0],
    [0, 9, 0.0],
    [1, 9, 0],
    [2, 9, 0],
    [3, 9, 0],
    [4, 9, 0],
    [5, 9, 0],
    [6, 9, 0],
    [7, 9, 0],
    [8, 9, 0.0]
];

data = data.map(function(item) {
    return [item[1], item[0], item[2] || '-'];
});

subgraph_info1_option = {
    title: {
        text: '黑色产业分析',
        left: 'center',
    },
    tooltip: {
        position: 'top'
    },
    animation: false,
    grid: {
        height: '50%',
        y: '10%'
    },
    xAxis: {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: 'category',
        data: days,
        splitArea: {
            show: true
        }
    },
    dataZoom: [{
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        bottom: '20%',
        start: 1,
        end: 50
    }, {
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        left: '93%',
//        bottom: '10%',
        start: 1,
        end: 100
    }, {
        type: 'inside',
        xAxisIndex: [0],
        start: 1,
        end: 100
    }, {
        type: 'inside',
        yAxisIndex: [0],
        start: 1,
        end: 100
    }],
    visualMap: {
        min: 0,
        max: 1,
        calculable: true,
        left: 'left',
        bottom: '15%'
    },
    series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: data,
        label: {
            normal: {
                show: true
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};

subgraph_info1.setOption(subgraph_info1_option);