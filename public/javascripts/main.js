var $fire = {}

$(document).ready(function(){

	init_conditionals();
	contact_reveal_fields();
	add_new_status();
	delete_status();
	accordian_sections();
	another_investment();
	another_contact();


	$('.first-section .section-questions').show();

	$fire.investment_questions = $('.investment-info-questions').html();
	$fire.private_contact_questions = $('.priv-contact').html();
	$fire.public_contact_questions = $('.public-contact').html();


	$(document).on('click','.reveal-via',function(e) {
		e.preventDefault();


		var id = $(this).attr('id');
		var $click_to_reveal = $('.click-to-reveal[data-reveal-via="'+id+'"]');
		var $click_to_hide = $('.click-to-hide[data-hide-via="'+id+'"]');

		if($(this).hasClass('new-item-revealed')) {
			$(this).removeClass('new-item-revealed').text($(this).attr('data-original-text'));
			$click_to_reveal.slideUp().attr('data-visible',false);
			$click_to_hide.slideDown().attr('data-visible',true);
		} else {

			$(this).addClass('new-item-revealed').text($(this).attr('data-alternate-text'));
			$click_to_reveal.slideDown().attr('data-visible',true);
			$click_to_hide.slideUp().attr('data-visible',false);

		}



		



	})

	

	$('select.creates-conditional').on('change',function(){

		var $t = $(this);
		var name = $t.attr('name');
		var val = $t.val()

		var $conditional_on = $(document).find('*[data-conditional-on="'+name+'"]');

		var $has_not_condition = $conditional_on.not('*[data-conditional-not-value=""]');
		var $not_condition_met = $has_not_condition.not('*[data-conditional-not-value="'+val+'"]');


		var $meets_condition = $conditional_on.filter('*[data-conditional-value="'+val+'"]');
		var $meets_condition_children = $meets_condition.find('.section-questions[data-visible="true"]');
		var $form_section = $meets_condition.parents('.form-section');
		if ( $meets_condition.hasClass('form-section') ) {
			$form_section = $meets_condition
		}

		$conditional_on.slideUp().attr('data-visible',false);
		$meets_condition.slideDown().attr('data-visible',true);
		$not_condition_met.slideDown().attr('data-visible',true);
		$form_section.addClass('open');
		if ($meets_condition_children.length > 0) {
			$meets_condition_children.slideDown().attr('data-visible',true);
		}

	})

	$(document).on('change','.status-creates-conditional select',function(){

			console.log('look out for me')

			var $t = $(this);
			var name = $t.parents('table').attr('name');
			var val = $t.val()

			var $conditional_on = $(document).find('*[data-conditional-on-status="'+name+'"]');

			var $has_not_condition = $conditional_on.not('*[data-conditional-on-status-not-value=""]');
			var $the_not_condition_met = $has_not_condition.not('*[data-conditional-on-status-not-value="'+val+'"]');


			var $meets_condition = $conditional_on.filter('*[data-conditional-on-status-value="'+val+'"]');
			var $meets_condition_children = $meets_condition.find('.section-questions[data-visible="true"]');
			var $form_section = $meets_condition.parents('.form-section');
			if ( $meets_condition.hasClass('form-section') ) {
				$form_section = $meets_condition
			}

			$conditional_on.slideUp().attr('data-visible',false);
			$meets_condition.slideDown().attr('data-visible',true);
			$the_not_condition_met.slideDown().attr('data-visible',true);
			$form_section.addClass('open');
			if ($meets_condition_children.length > 0) {
				$meets_condition_children.slideDown().attr('data-visible',true);
			}

		})

	$(document).on('change','input.creates-conditional, .creates-conditional input:radio',function(){
		var $t = $(this);
		var name = $t.attr('name');
		var val;
		if($(this).attr('type') == 'checkbox' && this.checked) {
			val = 'true'
		} else if($(this).attr('type') == 'checkbox' && !this.checked) {
			val = 'false'
		} else {
			val = $(this).val();
		}
		//console.log(val)

		var $conditional_on = $(document).find('*[data-conditional-on="'+name+'"]');
		var $meets_condition = $conditional_on.filter('*[data-conditional-value="'+val+'"]')
		var $meets_condition_children = $meets_condition.find('.section-questions[data-visible="true"]');
		var $form_section = $meets_condition.parents('.form-section');
		if ( $meets_condition.hasClass('form-section') ) {
			$form_section = $meets_condition
		}

		$conditional_on.slideUp().attr('data-visible',false);
		$meets_condition.slideDown();
		$form_section.addClass('open');
		if ($meets_condition_children.length > 0) {
			$meets_condition_children.slideDown();
		}


	})

	$(document).on('change','input.creates-conditional-follows, .creates-conditional-follows input:radio',function(){
		console.log('follows')
		var $t = $(this);
		var name = $t.attr('name');
		var $parent_section = $t.parents('.form-section')
		var val;
		if($(this).attr('type') == 'checkbox' && this.checked) {
			val = 'true'
		} else if($(this).attr('type') == 'checkbox' && !this.checked) {
			val = 'false'
		} else {
			val = $(this).val();
		}
		//console.log(val)

		var $conditional_on = $(document).find('.form-section[data-conditional-follows-on="'+name+'"]');
		var $meets_condition = $conditional_on.filter('.form-section[data-conditional-follows-value="'+val+'"]');
		var $meets_condition_children = $meets_condition.find('.section-questions[data-visible="true"]');
		console.log($meets_condition)

		$meets_condition.prependTo('.place-here').addClass('open');
		if ($meets_condition_children.length > 0) {
			$meets_condition_children.slideDown();
		}


		//$meets_condition.after($('.follow-me')).appendTo('form');

		/*
		var $meets_condition_children = $meets_condition.find('.section-questions');
		
		var $form_section = $meets_condition.parents('.form-section');
		if ( $meets_condition.hasClass('form-section') ) {
			$form_section = $meets_condition
		}
		*/




		/*
		$conditional_on.slideUp();
		$meets_condition.slideDown();
		$form_section.addClass('open');
		if ($meets_condition_children.length > 0) {
			$meets_condition_children.slideDown();
		}
		*/


	})



});

function init_conditionals() {
	var $creates_conditional = $(document).find('.creates-conditional');
	var $conditional_on = $(document).find('.conditional-on');

	$creates_conditional.each(function(){
		var $t = $(this)
		var condition_name = $t.attr('name')
		var current_value = $t.val()

		if (this.checked) {
			current_value = true
		} else {
			current_value = false
		}

		console.log(condition_name,current_value)


		var $target_field = $conditional_on.filter('*[data-conditional-on="'+condition_name+'"][data-conditional-value="'+current_value+'"]')
		$target_field.show().attr('data-visible',true);

	})




}




function contact_reveal_fields() {

	$(window).on('load',function() {

		var $names = $('.contact .initial');

		$names.each(function(){
			var $t = $(this)
			var $input = $t.find('input')
			var $fieldset = $t.parents('.contact')
			//console.log('hi')

			if ($input.val() != '') {
				//console.log('yo')
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
		//console.log('clicked')
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
				"html" : '<select><option>MassDevelopment-owned</option><option>Publicly owned</option><option>Partner-controlled</option><option>Privately owned</option></select>'
			},
			{
				"status_type" : "ground-floor-vacancy-gradient",
				"html" : '<select><option value="">Not Vacant</option><option value="">Partially Vacant</option><option value="">Entirely Vacant</option><option value="vacant-lot">Vacant Lot</option></select>'
			},
			{
				"status_type" : "upper-floor-vacancy-gradient",
				"html" : '<select><option>Not Vacant</option><option>Partially Vacant</option><option>Entirely Vacant</option></select>'
			}
		]

		var status_type = $table.attr('data-statuses');
		//console.log(status_type)
		var status_select;

		for (var i = 0; i < status_selects.length; i++) {
			if ( status_selects[i]["status_type"] == status_type ) {
				status_select = status_selects[i]["html"]
			}
		}

		
		var year_select = '<select><option>2012</option><option>2013</option><option>2014</option><option>2015</option><option>2016</option><option>2017</option><option>2018</option><option>2019</option><option>2020</option></select>'
		var month_select = '<select><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></select>'

		$('<tr class="status-date-row"><td>'+status_select+'</td><td>'+month_select+year_select+'</td><td><a href="#" class="status-date-remove">X</a></td></tr>').insertBefore('#'+table_id+' .status-date-add-row')

		$table.append()
	})

}

function delete_status() {
	$(document).on('click','a.status-date-remove',function(e){
		//console.log('clicked')
		e.preventDefault();
		
		var $t = $(this);
		var $row = $t.parents('tr');
		var $table = $t.parents('table');

		var open_close_select = '<select><option>Open</option><option>Closed</option></select>'
		var year_select = '<select><option>2014</option><option>2015</option><option>2016</option><option>2017</option><option>2018</option><option>2019</option><option>2020</option></select>'
		var month_select = '<select><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option></select>'

		//$('<tr><td>'+open_close_select+'</td><td>'+month_select+year_select+'</td></tr>').insertBefore('.status-date-add-row')

		$row.remove();
	})

}


function accordian_sections() {
	$(document).on('click','.section-heading', function() {
		console.log('click')
		var $t = $(this)
		var $section = $t.parents('.form-section')
		var $questions = $section.find('.section-questions[data-visible="'+true+'"]')

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








function another_investment() {
	$(document).on('click','.add-another-investment',function(e){
		e.preventDefault();
		$(this).parents('.section-questions').append($fire.investment_questions);
		$(this).parent().html('<hr>');
	})
}

function another_contact() {
	$(document).on('click','.add-another-contact',function(e){
		console.log('another_contact');
		e.preventDefault();

		var contact_type = $(this).attr('data-contact-type');
		console.log(contact_type);
		var contact_html;
		if( contact_type == 'private') {
			contact_html = $fire.private_contact_questions
		} else if  ( contact_type == 'public' ) {
			contact_html = $fire.public_contact_questions
		}



		$(this).parents('.contact').append(contact_html).find('.question').slideDown();
		$(this).parent().html('<hr>');
	})
}


//worked around this. ignore
function checkConditional(input) {
	console.log('rawtype: '+typeof input)
	//console.log('raw: '+input)
	input = JSON.parse(input)

	if (typeof input == 'string') {
		console.log('do something to string')
	} else if ($.isArray(input) == true) {
		console.log('do something to array')
	}

	var $conditionals = $('.conditional-on')
	$conditionals.each(function(i){

		var conditional_on = $(this).attr('data-conditional-on');

	});


}

$.fn.moveUp = function() {
    $.each(this, function() {
         $(this).after($(this).prev());   
    });
};
$.fn.moveDown = function() {
    $.each(this, function() {
         $(this).before($(this).next());   
    });
};

