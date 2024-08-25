

// $(document).ready(function () {
// 	$('#tipo-negocio').val(new URLSearchParams(window.location.search).get('tipo-negocio'));

// 	obtenerPaíses();
// });


async function registrar() {
	var isValid = true;

	if ($('#tipo-negocio').val() === '') {
		isValid = false;
		showMessage('alert-info', 'Debe selecionar un Tipo de Negocio');
	}

	if ($('#companyName').val() === '') {
		isValid = false;
		showMessage('alert-info', 'Debe completar el nombre del negocio');
	}

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

		$.post("https://api-v1.poscloud.ar/api/register",
			{
				"companyName": $('#companyName').val(),
				"email": $('#email').val(),
				"phone": $('#phone').val(),
				"category": $('#tipo-negocio').val(),
				"password": $('#password').val(),
				//	"codeCountry": $('#paises').val()
			},
			async function (data) {
				if (data.password && data.db && data.user) {
					showMessage('alert-succes', 'Se creó correctamente. Revise su email para ingresar a su cuenta POS Cloud.');
					$('#loading').hide();
					$("body").css('overflow', 'auto');
				}  else {		
					showMessage('alert-danger', data.message);
					$('#loading').hide();
					$("body").css('overflow', 'auto');
				}
			}
		).fail(function (jqXHR, textStatus, errorThrown) {
			showMessage('alert-danger', jqXHR.responseJSON.message);
			$('#loading').hide();
			$("body").css('overflow', 'auto');
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