var info_view = echarts.init(document.getElementById('xpanel-l-2'));
var info_view_option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
//  legend: {
//    data: [
//      'VeryStrong','Strong','Ordinary','Weak'
//      'Domain', 'IP', 'Cert', 'Whois_Name', 'Whois_Phone', 'Whois_Email', 'IP_C', 'ASN'
//    ]
//  },
  series: [
    {
      name: 'link',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '24%'],
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
//      data: [
//        {"name":"VeryStrong","value":155},
//        {"name":"Strong","value":291},
//        {"name":"Ordinary","value":16},
//        {"name":"Weak","value":13}
//      ]
       data:[]
    },
    {
      name: 'node',
      type: 'pie',
      radius: ['32%', '50%'],
      labelLine: {
        length: 6
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
            lineHeight: 10,
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
            fontSize: 10,
            fontWeight: 'bold',
            lineHeight: 8
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
//        {"name":"Domain","value":249},{"name":"IP","value":16},{"name":"Cert","value":6},{"name":"Whois_Name","value":6},{"name":"Whois_Phone","value":3},{"name":"Whois_Email","value":3},{"name":"IP_C","value":3}
    }
  ]
};
info_view.setOption(info_view_option);

$.get('/data-info3-view').done(function (data){
    info_view.setOption({
    series:[{
        name:'link',
        data:data.link
    },
    {
        name:'node',
        data:data.node
    }]
    });
});

