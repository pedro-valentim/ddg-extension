$(function(){

	$('#Grid1ContainerDiv #Grid1ContainerTbl tr[class^=GridClear]').each(function(i, el){
		var disciplina = $('td:eq(1)', $(this));
		var parts = disciplina.text().split('<br>');
		var horas_aula_label = $('<span />').addClass('ns-label ns-label-primary').text(parts[1]);
		disciplina.html(horas_aula_label);
		disciplina.append(parts[0]);
	});

	$('#TABLE3 table.GridClear').each(function(i, horario_dia) {
		var horario_aulas = [];
		$('tr[class^=GridClear]', horario_dia).each(function(i, horario_aula){
			var horario = $('td:eq(1)', horario_aula).text();
			var sigla = $('td:eq(2)', horario_aula).text();
			var turma = $('td:eq(3)', horario_aula).text();
			var css_class = $(horario_aula).attr('class');
			horario_aulas.push({
				'horario': horario,
				'sigla': sigla,
				'turma': turma
			});
		});

		// Remove todas os horários do dia
		$('tr[class^=GridClear]', horario_dia).remove();

		// Ordena o array de horários do dia pelo horário da aula
		horario_aulas.sort(function(a, b){
			var a = a.horario.split('-')[0];
			var b = b.horario.split('-')[0];
		    var keyA = new Date().setHours(a.split(':')[0], a.split(':')[1]),
		        keyB = new Date().setHours(b.split(':')[0], b.split(':')[1]);
		    if(keyA < keyB) return -1;
		    if(keyA > keyB) return 1;
		    return 0;
		});

		// Readiciona horários do dia
		$.each(horario_aulas, function(i, horario) {
			var tr = $('<tr />').addClass('GridClear').html($('<td />'));
			tr.append($('<td />').text(horario.horario));
			tr.append($('<td />').addClass('ns-horario').text(horario.sigla));
			tr.append($('<td />').text(horario.turma));
			$(horario_dia).append(tr);
		});
	});


	$('#Grid1ContainerDiv #Grid1ContainerTbl tr[class^=GridClear]').click(function(){



		$('#Grid1ContainerDiv #Grid1ContainerTbl tr[class^=GridClear]').removeClass('ns-active');
		
		$(this).addClass('ns-active');

		var sigla = $('td:eq(0)', $(this)).text();

		// Remove classe que destaca linhas das tabelas de horário
		$('#TABLE3 tr.GridClear').removeClass('ns-active');

		$('#TABLE3 tr.GridClear .ns-horario').each(function(i, element) {
			// Destaca linhas das tabelas de horário que forem da mesma disciplina clicada
			if ($(element).text() == sigla) $(element).parents('tr.GridClear').addClass('ns-active');
		});

	});



});