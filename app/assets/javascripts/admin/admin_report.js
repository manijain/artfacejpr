if (location.pathname == "/admin/reports") {
	$(document).on('change', '#statistics_select, #interval_select, #start_date, #end_date', function() {
		$.ajax({
			url: '/admin/reports',
			dataType: 'json',
			data: {
   				stat_type: $('#statistics_select').val(),
   				interval: $('#interval_select').val(),
   				start_date: $('#start_date').val(),
   				end_date: $('#end_date').val()
			},
			complete: function(data){
				temp = Function(data.responseText);
				temp();
				chart_change();
			}
		})
	})
    
    

	function chart_load(){
      rowArray = [];
      for (var i=0; i<=5; i++){       
        var name = $('#statistics_details u[id^=\"plan_\"]').eq(i).text();
        var amount = $("#statistics_details ul li[id^=row_1] span").eq(i+1).text();
        rowArray.push([name, parseInt(amount)]);
      }
      chart.clearChart();
      drawChart();
	}

	function chart_change(){
		rowArray = [];
		for (var i=0; i<=5; i++){       
        var name = $('#statistics_details u[id^=\"plan_\"]').eq(i).text();
        //var amount = $("#statistics_details ul li[id^=row_1] span").eq(i+1).text();
        var amount = $("#statistics_details ul li.hidden:last span").eq(i+1).text();
        rowArray.push([name, parseInt(amount)]);
      }
      chart.clearChart();
      drawChart();
	}


	function getUrlVars() {
    	var vars = {};
    	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        	vars[key] = value;
    	});
    	return vars;
	}
	
	Number.prototype.padLeft = function(base,chr){
    	var  len = (String(base || 10).length - String(this).length)+1;
    	return len > 0? new Array(len).join(chr || '0')+this : this;
	}
}

if(location.pathname == "/admin/reports" && location.search == ""){
	$(document).ready(function(){
		$('#statistics_select').val('new subscriptions')
		var today = new Date();
		var d = today.getTime()-24*60*60*1000*7
		var prev_date = new Date(d);
		$('#start_date').val([prev_date.getFullYear(), (prev_date.getMonth()+1).padLeft(), prev_date.getDate().padLeft()].join('-'))
		$('#end_date').val([today.getFullYear(), (today.getMonth()+1).padLeft(), today.getDate()].join('-'))
	})
}


if(location.pathname == "/admin/reports"){
	var today = new Date();
	function setdates(first, last){
		$('#start_date').val([first.getFullYear(), (first.getMonth()+1).padLeft(), first.getDate().padLeft()].join('-'));
		$('#end_date').val([last.getFullYear(), (last.getMonth()+1).padLeft(), last.getDate().padLeft()].join('-'));
	}
	if(location.search.contains('today') == true){
		var first = new Date(today);
		var last = new Date(today);
		setTimeout(function(){setdates(first, last);
		},20);
	}
	else if(location.search.contains('week') == true){
		
		var firstday = today.getDate() - today.getDay();
		var lastday = firstday + 6;
		var first = new Date(today.setDate(firstday));
		var last = new Date(today.setDate(lastday));
		setTimeout(function(){
			setdates(first, last);
		},20);
	}
	else if(location.search.contains('month') == true){
		var first = new Date(today.getFullYear(), today.getMonth(), 1);
		var last = new Date(today.getFullYear(), today.getMonth()+1, 0);
		setTimeout(function(){
			setdates(first, last);
		},20);
	}
	else if(location.search.contains('quarter') == true){
		quarter = Math.floor(today.getMonth()/3);
		var first = new Date(today.getFullYear(), quarter*3, 1);
		var last = new Date(today.getFullYear(), first.getMonth()+3, 0);
		setTimeout(function(){
			setdates(first, last);
		},20);
	}
	else if(location.search.contains(today.getFullYear()) == true){
		var first = new Date(today.getFullYear(), 0, 01)
		var last = new Date(today.getFullYear(), 11, 31)
		setTimeout(function(){
			setdates(first, last);
		},20);
	}
	else if(location.search.contains(today.getFullYear()-1) == true){
		var first = new Date(today.getFullYear()-1, 0, 01)
		var last = new Date(today.getFullYear()-1, 11, 31)
		setTimeout(function(){
			setdates(first, last);
		},20);
	}
	else if(location.search.contains('tyear') == true){
		var first = new Date(today.getFullYear()-2, 0, 01);
		var last = new Date(today.getFullYear()-1, 0, 31);
		setTimeout(function(){
			setdates(first, last);
		},20);
	}
	else if(location.search.contains('All') == true){
		var first = new Date(today.getFullYear()-5, 0, 01);
		var last = new Date(today);
		setTimeout(function(){
			setdates(first, last);
		},20);
	}

}


