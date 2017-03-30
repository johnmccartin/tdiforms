$(document).ready(function(){

	init_conditionals();
	contact_reveal_fields();
	add_new_status();
	delete_status();
	accordian_sections();

	

	$('select.creates-conditional').on('change',function(){
		console.log('select change')

		var $t = $(this);
		var name = $t.attr('name');
		var val = $t.val()
		console.log(val)

		var $conditional_on = $(document).find('*[data-conditional-on="'+name+'"]');
		var $meets_condition = $conditional_on.filter('*[data-conditional-value="'+val+'"]')
		console.log($meets_condition)

		$conditional_on.slideUp();
		$meets_condition.slideDown();
	})

	$(document).on('change','input.creates-conditional',function(){
		console.log('input change')
		var $t = $(this);
		var name = $t.attr('name');
		var val;
		if(this.checked) {
			val = 'on'
		} else if(!this.checked) {
			val = 'off'
		}

		console.log('val: '+val)

		var $conditional_on = $(document).find('*[data-conditional-on="'+name+'"]');
		console.log($conditional_on.length)
		var $meets_condition = $conditional_on.filter('*[data-conditional-value="'+val+'"]')
		console.log($meets_condition.length)

		//console.log($conditional_on.attr('data-conditional-value'))

		$conditional_on.slideUp();
		$meets_condition.slideDown();
	})



});

function init_conditionals() {
	var $creates_conditional = $(document).find('.creates-conditional');
	var $conditional_on = $(document).find('.conditional-on');

	$creates_conditional.each(function(){
		var $t = $(this)
		var condition_name = $t.attr('name')
		var current_value = $t.val()


		var $target_field = $conditional_on.filter('*[data-conditional-on="'+condition_name+'"][data-conditional-value="'+current_value+'"]')
		$target_field.show();

	})




}




function contact_reveal_fields() {

	$(window).on('load',function() {

		var $names = $('.contact .initial');

		$names.each(function(){
			var $t = $(this)
			var $input = $t.find('input')
			var $fieldset = $t.parents('.contact')
			console.log('hi')

			if ($input.val() != '') {
				console.log('yo')
				$fieldset.find('.question').slideDown()
			}
		})

	});	

	$(document).on('input','.contact .initial',function(){

		var $t = $(this)
		var $input = $t.find('input')
		var $fieldset = $t.parents('.contact')

		if ($input.val() == '') {
			$fieldset.find('.question').not('.initial').slideUp();
		} else {
			$fieldset.find('.question').slideDown()
		}


	})
}


function add_new_status() {

	$(document).on('click','a.status-date-add',function(e){
		console.log('clicked')
		e.preventDefault();
		
		var $t = $(this);
		var $row = $t.parents('tr');
		var $table = $t.parents('table');
		var table_id = $table.attr('id');

		var status_selects = [
			{
				"status_type" : "open-close",
				"html" : '<select><option>Open</option><option>Closed</option></select>'
			},
			{
				"status_type" : "boolean",
				"html" : '<select><option>Yes</option><option>No</option></select>'
			},
			{
				"status_type" : "investment-statuses",
				"html" : '<select><option>Proposed</option><option>In Progress</option><option>Completed</option><option>Failed</option></select>'
			},
			{
				"status_type" : "ownership-type",
				"html" : '<select><option>Publicly owned</option><option>Partner-controlled</option><option>Privately owned</option></select>'
			},
			{
				"status_type" : "vacancy-gradient",
				"html" : '<select><option>Not Vacant</option><option>Partially Vacant</option><option>Entirely Vacant</option></select>'
			}
		]

		var status_type = $table.attr('data-statuses');
		console.log(status_type)
		var status_select;

		for (var i = 0; i < status_selects.length; i++) {
			if ( status_selects[i]["status_type"] == status_type ) {
				status_select = status_selects[i]["html"]
			}
		}

		
		var year_select = '<select><option>2012</option><option>2013</option><option>2014</option><option>2015</option><option>2016</option><option>2017</option><option>2018</option><option>2019</option><option>2020</option></select>'
		var month_select = '<select><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></select>'

		$('<tr><td>'+status_select+'</td><td>'+month_select+year_select+'</td><td><a href="#" class="status-date-remove">X</a></td></tr>').insertBefore('#'+table_id+' .status-date-add-row')

		$table.append()
	})

}

function delete_status() {
	$(document).on('click','a.status-date-remove',function(e){
		console.log('clicked')
		e.preventDefault();
		
		var $t = $(this);
		var $row = $t.parents('tr');
		var $table = $t.parents('table');

		var open_close_select = '<select><option>Open</option><option>Closed</option></select>'
		var year_select = '<select><option>2012</option><option>2013</option><option>2014</option><option>2015</option><option>2016</option><option>2017</option><option>2018</option><option>2019</option><option>2020</option></select>'
		var month_select = '<select><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></select>'

		//$('<tr><td>'+open_close_select+'</td><td>'+month_select+year_select+'</td></tr>').insertBefore('.status-date-add-row')

		$row.remove();
	})

}


function accordian_sections() {
	$(document).on('click','.section-heading', function() {
		var $t = $(this)
		var $section = $t.parents('.form-section')
		var $questions = $section.find('.section-questions')

		if ( $section.hasClass('open') ) {
			$questions.slideUp()
			$section.removeClass('open')
		} else {
			$questions.slideDown()
			$section.addClass('open')

		}

	});

	$(document).on('input','.last-of-section',function() {
		var $t = $(this)
		var $section = $t.parents('.form-section')
		var $next_section = $section.next('.form-section')

		$next_section.addClass('open').find('.section-questions').slideDown();
	})

	$(document).on('input','.feature-name-input',function() {
		var $t = $(this)
		var $section = $t.parent()
		var $next_section = $section.next('.form-section')

		$next_section.addClass('open').find('.section-questions').slideDown();
	})
}



