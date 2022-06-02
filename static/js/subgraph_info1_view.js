var info6_graph = echarts.init(document.getElementById('info6-2'));
var info7_graph = echarts.init(document.getElementById('info7-2'));
var graph_colors = ['#91C7AE', '#749F83', '#CA8622', '#BDA29A', '#6E7074','#546570','#D7E0E8','#C23531']
var industry_color = ['#000000','#464646','#696969','#808080','#A9A9A9','#C0C0C0','#D3D3D3','	#DCDCDC','#F5F5F5']
info6_option = {
    title: {
              text: '点边数量                                       黑灰产业',
              top: 80,
              left: 'center'
            },
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        data: ['Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN','很强','强','中','弱']
      },
  series: [
    {
      name: 'link',
      type: 'pie',
      radius: [0, '20%'],
      center: ['25%', '50%'],
      label: {
        show:false
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
      radius: ['30%', '45%'],
      center: ['25%', '50%'],
      label: {
        show:false,
      },
      labelLine: {
        show:false,
        length: 0
      },
      top:20,
      data: []
    },
    {
      name: 'type',
      type: 'pie',
      color: industry_color,
      radius: 50,
      center: ['75%', '50%'],
      label: {
        fontSize:14,
      },
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

    tooltip: {},
    legend: [
      {
        data: ['Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN']
      }
    ],
    series: [
      {
        name: 'KeyLines',
        type: 'graph',
        color: graph_colors,
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
    },
    {
        name:'type',
        data:info6_data.type[0]
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
                    },
                    {
                        name:'type',
                        data:info6_data.type[index]
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
