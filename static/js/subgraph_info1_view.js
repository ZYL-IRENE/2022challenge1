var info6_graph = echarts.init(document.getElementById('info6-2'));
// var info7_graph = echarts.init(document.getElementById('info7-2'));
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

// info7_option ={

//     tooltip: {},
//     legend: [
//       {
//         data: ['Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN']
//       }
//     ],
//     series: [
//       {
//         name: 'KeyLines',
//         type: 'graph',
//         color: graph_colors,
//         layout: 'force',
//         data: [],
//         links: [],
//         categories: [],
//         roam: true,
//         label: {
//           position: 'right'
//         },
//         force: {
//           repulsion: 100
//         }
//       }
//     ]
//   };
// info7_graph.setOption(info7_option);

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
    // info7_graph.setOption({
    // series:[{
    //     name:'KeyLines',
    //     data:info7_data.node[0],
    //     links:info7_data.link[0],
    //     categories:info7_data.category
    // }]
    // });
    knowledgegraph7(info7_data.node[0],info7_data.link[0])
    test=info7_data
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
console.log('下拉框选择成功')
        $.ajax({
            url:'/subgraph-info2-view',
            type: 'get',
            success: function(info7_data) {
                // info7_graph.setOption({
                //     series:[{
                //         name:'KeyLines',
                //         data:info7_data.node[index],
                //         links:info7_data.link[index]
                //     }]
                //     });

                knowledgegraph7(info7_data.node[index],info7_data.link[index])
            },
            error: function(xhr, type, errorThrown) {

            }
        })
})



//Domain_c58c149eec59bb14b0c102a0f303d4c20366926b5c3206555d2937474124beb9
function knowledgegraph7(original_nodes,original_links){
  //  original_nodes = info_data.nodes;
  //  original_links = info_data.links;

  console.log('knowledgegraph7函数运行成功')

  var type_dict = {
      'IP':'IP',
      'IP_C':'_C',
      'Domain':'D',
      'Cert':'C',
      'ASN':'A',
      'Whois_Phone':'P',
      'Whois_Name':'N',
      'Whois_Email':'E',
  };
  var color_dict = {
      'Domain':'#91C7AE',
      'IP':'#749F83',
      'Cert':'#CA8622',
      'Whois_Name':'#BDA29A',
      'Whois_Phone':'#6E7074',
      'Whois_Email':'#546570',
      'IP_C':'#D7E0E8',
      'ASN':'#C23531'};

  var key_relation = ['r_cert','r_subdomain','r_request_jump','r_dns_a'];

  var nodes = [];
  var node_index_dict = [];
  var links = [];
  var nodes_R = [];

  for(var i=0;i<original_nodes.length;i++){
      var node = original_nodes[i];   //每个结点{}
      node_index_dict[node.name] = i;  //字典{id：index}
      nodes_R.push(10); //半径10
  }


  for(var i=0;i<original_links.length;i++){
      // var index1 = node_index_dict[original_links[i].source];
      // var index2 = node_index_dict[original_links[i].target];
      var index1 = original_links[i].source
      var index2 = original_links[i].target

      links.push({
          source:index1,
          target:index2,
          //relation:original_links[i].relation,
          value:1,
      });

      nodes_R[index1] ++; //半径变远
      nodes_R[index2] ++;
  }

  

  for(var i=0;i<nodes_R.length;i++){
      nodes_R[i] = Math.log10(nodes_R[i]);
  }//半径变换


  scalerR = d3.scaleLinear().domain([d3.min(nodes_R),d3.max(nodes_R)]).range([10,20]);//半径变换


  for(var i=0;i<original_nodes.length;i++){
     var node = original_nodes[i];
      nodes.push({
          'name':node.IP_name,
          'group':1,
          'id':node.name,
          'R':scalerR(nodes_R[i]),
          'index':i,
          'type':node.category,
          //'industry':node.industry,
      });
      //console.log(scalerR(nodes_R[i]))
  }

  var graph7_div = document.getElementById('info7-2');
  var graph7_width = graph7_div.clientWidth;
  var graph7_height = graph7_div.clientHeight;

  d3.select("#info7-2").select("svg").remove();

  var graph7_svg = d3.select("#info7-2")
      .append("svg")
      .attr("width",graph7_width)
      .attr("height",graph7_height);

  var graph7_marge = {top:10,bottom:10,left:10,right:10}

  var graph7_g = graph7_svg.append("g")
      .attr("transform","translate("+graph7_marge.top+","+graph7_marge.left+")",'id','maingroup');

  // 图中数据
  graph7_nodes = nodes;
  graph7_edges = links;

  //设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
  var graph7_colorScale = d3.scaleOrdinal()
      .domain(d3.range(graph7_nodes.length))
      .range(d3.schemeCategory10);


  var forceSimulation = d3.forceSimulation()
      .force("link",d3.forceLink())
      .force("charge",d3.forceManyBody())
      .force("center",d3.forceCenter())
      .force('collide', d3.forceCollide().radius(() => 10));

  //生成节点数据
  forceSimulation.nodes(graph7_nodes)
      .on("tick",ticked)
 

  //生成边数据
  forceSimulation.force("link")
      .links(graph7_edges)
      .distance(function(d){//每一边的长度
          return d.value*100;
      })

  //设置图形的中心位置
  forceSimulation.force("center")
      .x(graph7_width/2)
      .y(graph7_height/2);

  //绘制边
  var graph7_links = graph7_g.append("g")
      .selectAll("line")
      .data(graph7_edges)
      .enter()
      .append("line")
      .attr("stroke",function(d){
          if(key_relation.indexOf(d.relation) != -1){
              return 'gray';
          }
          return '#78909c';
      })
      .attr("stroke-width",function(d){
          if(key_relation.indexOf(d.relation) != -1){
              return 2;
          }
          return 0.5;
      });

  //建立用来放在每个节点和对应文字的分组<g>
  var graph7_gs = graph7_g.selectAll(".circleText")
      .data(graph7_nodes)
      .enter()
      .append("g")
      .attr("transform",function(d,i){
          var cirX = d.x;
          var cirY = d.y;
          return "translate("+cirX+","+cirY+")";
      });


   //绘制节点
   graph7_gs.append("circle")
      .attr("r",function (d) {
          return d.R;
      })
      .attr("fill", function(d){
          return color_dict[d.type];
      })
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('id', function(d){
          return 'node'+d.index;
      })
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)


  //文字
  graph7_gs.append("text")
      .attr("dx",function(d){
          return -d.R*0.35;
      })
      .attr("dy",function(d){
          return d.R*0.4;
      })
      .attr('font-size', function(d){
          return d.R;
      })
      .text(function(d){
          return type_dict[d.type];
      })
      .attr('id', function(d){
          return 'text'+d.index;
      });


  //设置悬浮框交互

  tooltip = d3.select("body")
                  .append("div")
                  // .style("opacity", 0)
                  .attr("class", "tooltip");
                  // .style("background-color", "yellow")
                  // .style("border", "solid")
                  // .style("border-width", "2px")
                  // .style("border-radius", "5px")
                  // .style("padding", "5px")
                  // .style("width","100px")
                  // .style("height", "100px");

  var mouseover = function(d) {
      tooltip.style("opacity", 1)
      .style("left", (d3.event.pageX + 30) + "px")
      .style("top", (d3.event.pageY + 30) + "px");
      d3.select(this)
      //.style("stroke", "black")
      .style("opacity", 0.5)
      .append("div")

  }

  var mousemove = function(d) {
      tooltip.html("name: " + d.name + "<br>"+
                  //"industry:"+ d.industry+ "<br>"+
                  "type:"+d.type+"<br>"+
                  "id:"+d.id)
  }

  var mouseleave = function(d) {
      tooltip.style("opacity", 0)
      d3.select(this)
      //.style("stroke", "none")
      .style("opacity", 1)
  } 

  d3.selectAll('circle')
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
  

  function ticked(){
      graph7_links
          .attr("x1",function(d){return d.source.x;})
          .attr("y1",function(d){return d.source.y;})
          .attr("x2",function(d){return d.target.x;})
          .attr("y2",function(d){return d.target.y;});

      graph7_gs
          .attr("transform",function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }

  function graph7_started(d){
      if(!d3.event.active){
          forceSimulation.alphaTarget(0.8).restart()
      }
      d.fx = d.x;
      d.fy = d.y;
  }
  graph7_svg.call(d3.zoom()
      .scaleExtent([0.01, 20])
      .on('zoom', () => {
          graph7_g.attr('transform', d3.event.transform)
      })
  );
}
