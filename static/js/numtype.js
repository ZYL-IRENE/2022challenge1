// 需要在index.html中添加以下内容，不然会报错
// <script src="https://cdn.jsdelivr.net/npm/d3-array@3"></script>
// <script src="https://cdn.jsdelivr.net/npm/d3-color@3"></script>
// <script src="https://cdn.jsdelivr.net/npm/d3-format@3"></script>
// <script src="https://cdn.jsdelivr.net/npm/d3-interpolate@3"></script>
// <script src="https://cdn.jsdelivr.net/npm/d3-time@3"></script>
// <script src="https://cdn.jsdelivr.net/npm/d3-time-format@4"></script>
// <script src="https://cdn.jsdelivr.net/npm/d3-scale@4"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.0.0/d3.min.js"></script>

var width = 400;
var height = 200;

// 在body中添加一个SVG画布
var svg = d3.select('#subgraph-info2-view')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

//画布周边的空白
var padding = { left: 30, right: 30, top: 20, bottom: 20 }

//两个output子图的测试（结果通过numtype.py计算）
var dataset = [135, 3, 2, 2, 2, 2, 0, 0]
//var dataset = [249, 10, 6, 3, 3, 3, 6, 6]

// x轴的序数比例尺
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, width - padding.left - padding.right])

//y轴的线性比例尺
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height - padding.top - padding.bottom, 0])

// 定义坐标轴,x轴向下,y轴向左
var xAxis = d3.axisBottom(xScale)
var yAxis = d3.axisLeft(yScale)

// 矩形之间的空白
var rectPadding = 4;

// 添加矩形元素

var rects = svg.selectAll('.MyRect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'MyRect')
    .attr('transform', 'translate(' + padding.left + "," + padding.top + ")")
    .attr('x', function (d, i) {
        return xScale(i) + rectPadding / 2
    })
    .attr('y', function (d) {
        return yScale(d)
    })
    // 每个矩形元素的宽度,这里不能用xScale.range,因为它返回的是一个数组，应当使用xScale.bandwidth()
    .attr('width', xScale.bandwidth() - rectPadding)
    .attr('height', function (d) {
        return height - padding.top - padding.bottom - yScale(d)
    })
    .on

var texts = svg.selectAll(".MyText")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "MyText")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .attr("x", function (d, i) {
        return xScale(i) + rectPadding / 2;
    })
    .attr("y", function (d) {
        return yScale(d);
    })
    .attr("dx", function () {
        return (xScale.bandwidth() - rectPadding) / 2;
    })
    .attr("dy", function (d) {
        return 20;
    })
    .text(function (d) {
        return d;
    });

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
    .call(yAxis);