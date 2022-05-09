function get_info3_view_data() {
    $.ajax({
//        type:'GET',
        url:"/data-info3-view",
//        dataType:'json',
        success: function(data) {
			info_view_data.series[0].data=data.link
			info_view_data.series[1].data=data.node
			console.log("hello")
            info_view.setOption(info_view_data)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

get_info3_view_data()