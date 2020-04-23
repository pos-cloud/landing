window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-109128235-1');

checkScroll();
$(window).scroll(function () {
	checkScroll();
});

function checkScroll() {
	var scroll = $(window).scrollTop();
	if (scroll >= 50) {
		$("#gtco-main-nav").removeClass("bg-transparent").addClass("bg-white");
		$("#btn-registro").removeClass("navbar navbar-expand-lg navbar-light bg-light bg-transparent").addClass("bg-primary");
	} else {
		$("#gtco-main-nav").removeClass("bg-white").addClass("bg-transparent");
		$("#btn-registro").removeClass("bg-primary").addClass("navbar navbar-expand-lg navbar-light bg-light bg-transparent");
	}
}

function contactMe() {

	var isValid = true;

	if (!$('#contact-message').val() || $('#contact-message').val() === '') {
		isValid = false;
		showMessage('alert-info', 'Debe completar el campo Mensaje');
	}

	if (!validateEmail($('#contact-email').val())) {
		isValid = false;
		showMessage('alert-info', 'El E-mail ingresado es incorrecto');
	}

	if (!$('#contact-email').val() || $('#contact-email').val() === '') {
		isValid = false;
		showMessage('alert-info', 'Debe completar el campo E-mail');
	}

	if (!$('#contact-name').val() || $('#contact-name').val() === '') {
		isValid = false;
		showMessage('alert-info', 'Debe completar el campo Nombre');
	}

	if (isValid) {
		$("body").css('overflow', 'hidden');
		loading();
		$.post("http://demo.poscloud.com.ar:300/api/contact-me",
			{
				"name": $('#contact-name').val(),
				"message": $('#contact-message').val(),
				"email": $('#contact-email').val(),
			},
			async function (data) {
				if (data && data.message) {
					$('#loading').hide();
					$("body").css('overflow', 'auto');
					showMessage('alert-info', data.message);
				} else if (data) {
					$('#loading').hide();
					$("body").css('overflow', 'auto');
					showMessage('alert-success', 'Contacto enviado con éxito. Pronto recibirá una respuesta al e-mail indicado. Gracias por su tiempo.');
				} else {
					$('#loading').hide();
					$("body").css('overflow', 'auto');
					showMessage('alert-danger', 'Ocurrio un error al intentar realizar la consulta, por favor, intentelo nuevamente.');
				}
			});
	}
}

function showMessage(type, message) {
	$('#alert').html(message);
	if (type === 'alert-info') {
		$('#alert').addClass('alert-info');
		$('#alert').removeClass('alert-danger');
		$('#alert').removeClass('alert-success');
	} else if (type === 'alert-danger') {
		$('#alert').addClass('alert-danger');
		$('#alert').removeClass('alert-info');
		$('#alert').removeClass('alert-success');
	} else if (type === 'alert-success') {
		$('#alert').addClass('alert-success');
		$('#alert').removeClass('alert-info');
		$('#alert').removeClass('alert-danger');
	}
	$('#d-alert').show();
}

function loading() {
	$('#loading').show();
	$('#text-loading').html('Enviando consulta, espere...');
	$('#text-loading').addClass('teclea');
}

function validateEmail(valor) {
	if (/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i.test(valor)) {
		return true;
	} else {
		return false;
	}
}

function hidePopup() {
	document.getElementById('popup').style.display = 'none';
}

function showAndHideChat() {
	if (document.getElementById('ic-chat-fb').style.display !== 'block') {

		if (document.getElementById('alert') &&
			document.getElementById('alert').style &&
			document.getElementById('alert').style.display !== 'none') {
			document.getElementById('alert').style.display = "none";
		}

		document.getElementById('ic-chat').style.backgroundColor = "#F82D2D";

		document.getElementById('ic-chat-i').className = "fas fa-times my-float-chat";

		document.getElementById("ic-chat-fb").style.WebkitTransition = "all 1s"; // Code for Safari 3.1 to 6.0
		document.getElementById("ic-chat-fb").style.transition = "all 1s";       // Standard syntax
		document.getElementById('ic-chat-fb').style.display = "block";

		document.getElementById("ic-chat-wp").style.WebkitTransition = "all 1s"; // Code for Safari 3.1 to 6.0
		document.getElementById("ic-chat-wp").style.transition = "all 1s";       // Standard syntax
		document.getElementById('ic-chat-wp').style.display = "block";

	} else {

		document.getElementById('ic-chat').style.backgroundColor = "#4267B2";

		document.getElementById('ic-chat-i').className = "far fa-comment my-float-chat";

		document.getElementById("ic-chat-fb").style.WebkitTransition = "all 1s"; // Code for Safari 3.1 to 6.0
		document.getElementById("ic-chat-fb").style.transition = "all 1s";       // Standard syntax
		document.getElementById('ic-chat-fb').style.display = "none";

		document.getElementById("ic-chat-wp").style.WebkitTransition = "all 1s"; // Code for Safari 3.1 to 6.0
		document.getElementById("ic-chat-wp").style.transition = "all 1s";       // Standard syntax
		document.getElementById('ic-chat-wp').style.display = "none";
	}
}