var info3_graph = echarts.init(document.getElementById('info3-2'));

var info3_option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  series: [
    {
      name: 'link',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '16%'],
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
       data:[]
    },
    {
      name: 'node',
      type: 'pie',
      radius: ['22%', '36%'],
      labelLine: {
        length: 0
      },
      label: {
        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
        backgroundColor: '#F6F8FC',
        borderColor: '#8C8D8E',
        borderWidth: 1,
        borderRadius: 1,
        rich: {
          a: {
            color: '#6E7079',
            lineHeight: 0,
            align: 'center'
          },
          hr: {
            borderColor: '#8C8D8E',
            width: '100%',
            borderWidth: 1,
            height: 0
          },
          b: {
            color: '#4C5058',
            fontSize: 8,
            fontWeight: 'bold',
            lineHeight: 6
          },
          per: {
            color: '#fff',
            backgroundColor: '#4C5058',
            padding: [2, 3],
            borderRadius: 3
          }
        }
      },
      data: []
    }
  ]
};
info3_graph.setOption(info3_option);

$.get('/data-info3-view').done(function (info3_data){
    info3_graph.setOption({
    series:[{
        name:'link',
        data:info3_data.link[0]
    },
    {
        name:'node',
        data:info3_data.node[0]
    }]
    });
});
info3_graph.setOption(info3_option);

$('#graphTypes').on('change',function(){
    var lie=document.getElementById("graphTypes")//获取select标签
    var index=lie.selectedIndex
        $.ajax({
            url:'/data-info3-view',
            type: 'get',
            success: function(info3_data) {
                info3_graph.setOption({
                    series:[{
                        name:'link',
                        data:info3_data.link[index]
                    },
                    {
                        name:'node',
                        data:info3_data.node[index]
                    }]
                    });
            },
            error: function(xhr, type, errorThrown) {

            }
        })
})
