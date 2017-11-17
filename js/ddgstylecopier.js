$(function() {

	var pad = function(num, size){ return ('000000000' + num).substr(-size); };

	var run_calc = function() {
		$(`.fa.fa-clock-o, .calculated`).parents(`td`).each(function() {
			var fa_clock = $('.fa.fa-clock-o', this);

			if ($(this).text() == " 0:00" || fa_clock.is('.calculated')) {

				var _hours_init = $('.fa.fa-arrow-up', $(this).parents('tr')).parents('td *:not(.noPrint):first').text();
				_hours_init = _hours_init.trim().split(':')
				var _hours_init_ms = new Date().setHours(_hours_init[0], _hours_init[1])

				var now = new Date().getTime()

				var _hours_diff = Math.abs(now - _hours_init_ms) / 36e5;

				var _mins = Math.round((_hours_diff - Math.floor(_hours_diff)) * 60, 2);

				var _hours = Math.floor(_hours_diff);

				var _time = _hours + ':' + pad(_mins, 2);

				$(this).html('<i class="fa fa-clock-o calculated"></i> <span style="opacity: 0.35;">' + _time + '</span>');

			}
		});


		$('td[style=";padding:2px;background-color:#ededed;"] b:nth-last-child(1)').each(function() {
			var empty_day_message = "Total do dia:\n                0:00\n            ";
			var total_day = 0;
			if ($(this).text() == empty_day_message){
				var parent_tr = $(this).parents('tr');
				var next_tr = parent_tr.next('tr[data-object-id]');
				while (next_tr.is('[data-object-id]')) {
					var _hours = $('.fa.fa-clock-o', next_tr).parents('td').text().trim().split(':');
					total_day = new Date().setHours(total_day.getHours() + parseInt(_hours[0]));
					total_day.setMinutes(total_day.getMinutes() + parseInt(_hours[1]));
					next_tr = next_tr.next('tr');
				}
			}
			$(this).text("Total do dia:\n                "+total_day.getHours()+":"+pad(total_day.getMinutes(), 2)+"\n            ");
			
		});
	};

	setInterval(run_calc, 1000);


});
