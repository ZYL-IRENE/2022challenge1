function login(){
    var a = $("#is_contain_empty_industry").val();
    var b = $("#cert_n").val();
    var c = $("#center_ratio").val();
    $.ajax({
        type: "get",
        url: '/register',
        data: {id: $("#id").serialize(), is_contain_empty_industry: a, cert_n: b, ratio: c},
        success: function (res){
            knowledgegraph(res);
        },
        error: function(){
            alert('error');
        }

    });
}
// Domain_c58c149eec59bb14b0c102a0f303d4c20366926b5c3206555d2937474124beb9
function knowledgegraph(res){
    var original_nodes = res.nodes;
    var original_links = res.links;

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
    nodes_R = [];
    for(var i=0;i<original_nodes.length;i++){
        var node = original_nodes[i];
        node_index_dict[node.id] = i;
        nodes_R.push(10);
    }
    for(var i=0;i<original_links.length;i++){
        var index1 = node_index_dict[original_links[i].source];
        var index2 = node_index_dict[original_links[i].target];
        links.push({
            source:index1,
            target:index2,
            relation:original_links[i].relation,
            value:1,
        });
        nodes_R[index1] ++;
        nodes_R[index2] ++;
    }
    for(var i=0;i<nodes_R.length;i++){
        nodes_R[i] = Math.log10(nodes_R[i]);
    }
    scalerR = d3.scaleLinear().domain(nodes_R).range([10,20]);
    for(var i=0;i<original_nodes.length;i++){
       var node = original_nodes[i];
        nodes.push({
            'name':node.type,
            'group':1,
            'id':node.id,
            'R':scalerR(nodes_R[i]),
            'index':i,
            'type':node.name,
            'industry':node.industry,

        });
    }
    var graph7_div = document.getElementById('subgraph-info2-view');
    var graph7_width = graph7_div.clientWidth;
    var graph7_height = graph7_div.clientHeight;

    d3.select("#subgraph-info2-view").select("svg").remove();

    var graph7_svg = d3.select("#subgraph-info2-view")
        .append("svg")
        .attr("width",graph4_width)
        .attr("height",graph4_height);

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
        .data(graph4_nodes)
        .enter()
        .append("g")
        .attr("transform",function(d,i){
            var cirX = d.x;
            var cirY = d.y;
            return "translate("+cirX+","+cirY+")";
        });


     //绘制节点
     graph7_gs.append("circle")
        .attr("r",function (d,i) {
            return d.R;
        })
        .attr("fill", function(d){
            return color_dict[d.name];
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
            return type_dict[d.name];
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
        tooltip.html("name: " + d.type + "<br>"+
                    "industry:"+ d.industry+ "<br>"+
                    "type:"+d.name+"<br>"+
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
            graph4_g.attr('transform', d3.event.transform)
        })
    );
}