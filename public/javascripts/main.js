//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".afp-submit").click(function(e){
	$.ajax({
		url: '/afp',
		method: 'post',
		data: $(".afp").serialize(),
		success: function(data){
			console.log(data);
		}
	});
	e.preventDefault();
	return false;
});

$(".register").validate({
    rules: {
        name: { 
        	required: true
        },
        lastname: { 
        	required: true
        },
        date: { 
        	required: true
        },
        username: { 
        	required: true,
        	minlength: 4
        },
        email: { 
        	required: true,
        	email: true
        },
        password: {
        	minlength: 5
        },
        cpass: { 
        	minlength: 5,
        	equalTo: '#pass'
        },
        sex: { 
        	required: true
        }
    },
    messages: {
        name: "Debe introducir su correo.",
        lastname: "Debe introducir su contraseña.",
        date: "Debe introducir su contraseña.",
        user: "Debe introducir su contraseña.",
        email: "Debe introducir su contraseña.",
        pass: "Debe introducir su contraseña.",
        cpass: "Las contraseñas deben ser iguales.",
        sex: "Debe introducir su sexo."
    },
    submitHandler: function() {
    	alert('Enviar');
        $.ajax({
			url: '/register',
			method: 'post',
			data: $(".register").serialize(),
			success: function(data){
				
				console.log(data);
			}
		});
    }
});

$(".login").validate({
    rules: {
        username: { 
        	required: true
        },
        password: { 
        	required: true, 
        	minlength: 4 
        }
    },
    messages: {
        username: "Debe introducir su usuario.",
        password: "Debe introducir su contraseña."
    },
    submitHandler: function() {
        $.ajax({
			url: '/login',
			method: 'post',
			data: $(".login").serialize(),
			success: function(data){
				console.log(data);
			}
		});
    }
});