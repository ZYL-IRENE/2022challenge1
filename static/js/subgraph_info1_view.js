var info6_graph = echarts.init(document.getElementById('info6-2'));
var info7_graph = echarts.init(document.getElementById('info7-2'));
info6_option = {
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
    data: [
 'Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN'
    ]
      },
  series: [
    {
      name: 'link',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '30%'],
      label: {
        position: 'inner',
        fontSize: 14
      },
      labelLine: {
        show:false
      },
        top:20,
       data:[]
    },
    {
      name: 'node',
      type: 'pie',
      radius: ['45%', '60%'],
      labelLine: {
        length: 1
      },
      top:20,
      data: []
    }
  ]
};
info6_graph.setOption(info6_option);

info7_option ={
    title: {
      text: 'KeyLinks',
      subtext: 'Default layout',
      top: 'bottom',
      left: 'right'
    },
    tooltip: {},
    legend: [
      {
        data: [
 'Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN'
    ]
      }
    ],
    series: [
      {
        name: 'KeyLines',
        type: 'graph',
        layout: 'force',
        data: [],
        links: [],
        categories: [],
        roam: true,
        label: {
          position: 'right'
        },
        force: {
          repulsion: 100
        }
      }
    ]
  };
info7_graph.setOption(info7_option);

$.get('/subgraph-info1-view').done(function (info6_data){
    info6_graph.setOption({
    series:[{
        name:'link',
        data:info6_data.link[0]
    },
    {
        name:'node',
        data:info6_data.node[0]
    }]
    });
});
$.get('/subgraph-info2-view').done(function (info7_data){
    info7_graph.setOption({
    series:[{
        name:'KeyLines',
        data:info7_data.node[0],
        links:info7_data.link[0],
        categories:info7_data.category
    }]
    });
});


$('#graphTypes').on('change',function(){
    var lie=document.getElementById("graphTypes")//获取select标签
    var index=lie.selectedIndex
        $.ajax({
            url:'/subgraph-info1-view',
            type: 'get',
            success: function(info6_data) {
                info6_graph.setOption({
                    series:[{
                        name:'link',
                        data:info6_data.link[index]
                    },
                    {
                        name:'node',
                        data:info6_data.node[index]
                    }]
                    });
            },
            error: function(xhr, type, errorThrown) {

            }
        })
        $.ajax({
            url:'/subgraph-info2-view',
            type: 'get',
            success: function(info7_data) {
                info7_graph.setOption({
                    series:[{
                        name:'KeyLines',
                        data:info7_data.node[index],
                        links:info7_data.link[index]
                    }]
                    });
            },
            error: function(xhr, type, errorThrown) {

            }
        })
})
