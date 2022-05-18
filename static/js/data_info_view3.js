var info_view1 = echarts.init(document.getElementById('xpanel-l-6'));

var info_view1_option = {
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
info_view1.setOption(info_view1_option);

$.get('/data-info3-view').done(function (data){
    info_view1.setOption({
    series:[{
        name:'link',
        data:data.link[0]
    },
    {
        name:'node',
        data:data.node[0]
    }]
    });
});
info_view1.setOption(info_view1_option);

$('#graphTypes').on('change',function(){
    var lie=document.getElementById("graphTypes")//获取select标签
    var index=lie.selectedIndex
        $.ajax({
            url:'/data-info3-view',
            type: 'get',
            success: function(data) {
                info_view1.setOption({
                    series:[{
                        name:'link',
                        data:data.link[index]
                    },
                    {
                        name:'node',
                        data:data.node[index]
                    }]
                    });
            },
            error: function(xhr, type, errorThrown) {

            }
        })
//    }
})