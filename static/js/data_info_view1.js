info1_option = {
    tooltip:{
        show:true,
        trigger:'item',
        triggerOn: 'mousemove|click',
        formatter:function(args){
            return '度数:'+args['data'][0]+',数量:'+args['data'][1];
        }
    },
    xAxis: {},
    yAxis: {},

    grid: {
        left: "5%",
        right: "5%",
        top: "5%",
        bottom: "2%",
    },
    title:{
        show: true,
        text: "",
        textStyle: {
            fontWeight: 'normal',
            fontSize: 20,
        },
        right: "5%",
        top: "2%",
    },
    series: [
    {
        data: [],
        type: 'line',
        label:{
            show: true,
            formatter: function(args){
                series_data = info1_option.series[0]['data'];
                if(args['data'][0] == series_data[series_data.length-1][0]){
                    return args['data'][1];
                } else if(args['data'][0] == 1 || args['data'][0] == 100){
                    return args['data'][1];
                }
                return "";
            },
            position:[0, -5],
            color:'blue',
            fontSize: 12,
        },
    }]
};
info1_div =  document.getElementById('info1-2');
info1_graph = echarts.init(info1_div);

info1_series = [];
for(var i=0;i<l_nodes.length;i++){
    info1_series.push([i, Math.log10(l_nodes[i]+1).toFixed(1)]);
}
info1_option['series'][0]['data'] = info1_series;
info1_graph.setOption(info1_option);

$('#info1-1-words').on('change',function(){
    info1_words = document.getElementById('info1-1-words');
    info1_words_index = info1_words.selectedIndex;
    info1_data = index_nodes_dict[info1_words_index];

    info1_series = [];
    for(var i=0;i<info1_data.length;i++){
        info1_series.push([i, Math.log10(info1_data[i]+1).toFixed(1)]);
    }
    info1_option['series'][0]['data'] = info1_series;
    info1_graph.setOption(info1_option);
})
