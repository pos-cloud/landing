

$(document).ready(function () {
	$('#tipo-negocio').val(new URLSearchParams(window.location.search).get('tipo-negocio'));

	obtenerPaíses();
});

function obtenerPaíses() {
	$.get("https://restcountries.eu/rest/v2/all?fields=name;alpha2Code",
		async function (data) {
			if (data.length > 0) {
				$.each(data, function (i, pais) {
					$('#paises').append(new Option(pais.name, pais.alpha2Code));
				});
				$('#paises').val('AR');
			}
		});
}

async function registrar() {
	var isValid = true;

	if ($('#password').val() === '') {
		isValid = false;
		showMessage('alert-info', 'Debe completar el campo Contraseña');
	}
	if ($('#phone').val() === '') {
		isValid = false;
		showMessage('alert-info', 'Debe completar el campo Teléfono');
	}
	if ($('#email').val() === '') {
		isValid = false;
		showMessage('alert-info', 'Debe completar el campo E-mail');
	}
	if ($('#companyName').val() === '') {
		isValid = false;
		showMessage('alert-info', 'Debe completar el nombre del negocio');
	}
	if ($('#tipo-negocio').val() === '') {
		isValid = false;
		showMessage('alert-info', 'Debe completar el campo Tipo de Negocio');
	}

	if (!validateEmail($('#email').val())) {
		isValid = false;
		showMessage('alert-info', 'El E-mail ingresado es incorrecto');
	}

	if (isValid) {
		$("body").css('overflow', 'hidden');
		$('#alert').addClass('alert-info');
		$('#alert').removeClass('alert-danger');
		$('#alert').removeClass('alert-success');
		loading();

		$.post("http://localhost:300/api/register",
			{
				"companyName": $('#companyName').val(),
				"email": $('#email').val(),
				"phone": $('#phone').val(),
				"category": $('#tipo-negocio').val(),
				"password": $('#password').val(),
				"codeCountry": $('#paises').val()
			},
			async function (data) {
				if (data && data.message) {
					showMessage('alert-info', data.message);
					$('#loading').hide();
					$("body").css('overflow', 'auto');
				} else if (data && data.url) {
					window.location.replace('http://demo.poscloud.com.ar/#/login?negocio=' + data.url.replace('http://www.', '').replace('.poscloud.com.ar', ''));
				} else {
					showMessage('alert-danger', 'Ocurrio un error al intentar registrarse, por favor, intentelo nuevamente.');
					$('#loading').hide();
					$("body").css('overflow', 'auto');
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
	}
	$('#d-alert').show();
}

function loading() {
	$('#loading').show();
	$('#text-loading').html('Bienvenido a POS Cloud...');
	$('#text-loading').addClass('teclea');
	setTimeout(() => {
		$('#text-loading').removeClass('teclea');
		setTimeout(() => {
			$('#text-loading').html('Estamos creando tu cuenta...');
			$('#text-loading').addClass('teclea');
			setTimeout(() => {
				$('#text-loading').removeClass('teclea');
				setTimeout(() => {
					$('#text-loading').html('Es hora de CRECER...');
					$('#text-loading').addClass('teclea');
				}, 500);
			}, 3000);
		}, 500);
	}, 3000);
}

function validateEmail(valor) {
	if (/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i.test(valor)) {
		return true;
	} else {
		return false;
	}
}