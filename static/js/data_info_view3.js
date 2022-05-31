var info3_graph = echarts.init(document.getElementById('info3-2'));
var graph3_hours = ['子图1-1', '子图1-2', '子图1-3',
    '子图1-4', '子图1-5', '子图2-1',
    '子图2-2', '子图2-3','子图2-4',
    '子图2-5'
];
var graph3_days = ['A', 'B', 'C',
    'D', 'E','F','G','I'
];

var graph3_data = [
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
//    {'A': 0.8006814310051107, 'B': 0.1465076660988075, 'C': 0.005110732538330494, 'D': 0.0, 'E': 0.0, 'F': 0.0, 'G': 0.044293015332197615, 'H': 0.0, 'I': 0.0034071550255536627}
    [0, 2, 0.800],
    [1, 2, 0.147],
    [2, 2, 0.005],
    [3, 2, 0],
    [4, 2, 0],
    [5, 2, 0],
    [6, 2, 0.044],
    [7, 2, 0],
    [8, 2, 0.004],
//    'A': 0.680952380952381, 'B': 0.3, 'C': 0.01904761904761905
    [0, 3, 0.681],
    [1, 3, 0.3],
    [2, 3, 0.019],
    [3, 3, 0],
    [4, 3, 0],
    [5, 3, 0],
    [6, 3, 0],
    [7, 3, 0],
    [8, 3, 0],
//    {'A': 0.3473684210526316, 'B': 0.6263157894736842, 'C': 0.005263157894736842, 'D': 0.0, 'E': 0.0, 'F': 0.0, 'G': 0.021052631578947368, 'H': 0.0, 'I': 0.0}
    [0, 4, 0.347],
    [1, 4, 0.626],
    [2, 4, 0.005],
    [3, 4, 0],
    [4, 4, 0],
    [5, 4, 0],
    [6, 4, 0.021],
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

graph3_data = graph3_data.map(function(item) {
    return [item[1], item[0], item[2] || '-'];
});
var info3_option = {
    title: {
        text: '黑色产业分析',
        left: 'center',
        show: false
    },
    tooltip: {
        position: 'top'
    },
    animation: false,
    grid: {
        height: '60%',
        right: '4%',
        top: '7%'
    },
    xAxis: {
        type: 'category',
        data: graph3_hours,
        splitArea: {
            show: true
        },
        axisLabel:{rotate:45}
    },
    yAxis: {
        type: 'category',
        data: graph3_days,
        splitArea: {
            show: true
        }
    },
    dataZoom: [
    //     {
    //     type: 'slider',
    //     show: true,
    //     xAxisIndex: [0],
    //     bottom: '20%',
    //     start: 1,
    //     end: 50
    // }, {
    //     type: 'slider',
    //     show: true,
    //     yAxisIndex: [0],
    //     left: '93%',
    //     start: 1,
    //     end: 100
    // },
        {
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
        inRange: {
            // color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196027']
            color: ['#cfd8dc','#749F83']
        },
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '10%',
        itemWidth:'10px',
        handleSize:'10%'
    },
    series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: graph3_data,
        label: {
            normal: {
                show: true
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
        }
    }]
};
info3_graph.setOption(info3_option);

