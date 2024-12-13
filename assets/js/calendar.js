document.addEventListener('DOMContentLoaded', function () {
    // Elementos principales del DOM
    var calendarEl = document.getElementById('calendar');
    var modal = document.getElementById('modal');
    var closeModal = document.getElementById('close-modal');
    var meetingForm = document.getElementById('meeting-form');
    var meetingDateInput = document.getElementById('meeting-date');
    var meetingTitleInput = document.getElementById('meeting-title');
    var meetingNameInput = document.getElementById('meeting-name');

    // Validar que los elementos existen antes de usarlos
    if (!calendarEl || !modal || !closeModal || !meetingForm || !meetingDateInput || !meetingTitleInput || !meetingNameInput) {
        console.error('Error: Uno o más elementos del DOM no se encontraron.');
        return;
    }

    // Inicializar el calendario
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
        },
        selectable: true,
        select: function (info) {
            // Mostrar el modal solo cuando se haga clic en una fecha
            modal.style.display = 'flex';
            meetingDateInput.value = info.startStr; // Establecer la fecha seleccionada en el campo de entrada
            console.log("Fecha seleccionada: " + info.startStr); // Log para depuración
        },
        events: [], // Aquí se pueden cargar eventos desde el backend si es necesario
    });

    // Renderizar el calendario
    calendar.render();

    // Cerrar el modal al hacer clic en la "X"
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Manejo del envío del formulario del modal
    meetingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener los valores del formulario
        var name = meetingNameInput.value.trim();
        var title = meetingTitleInput.value.trim();
        var date = meetingDateInput.value.trim();

        // Validar que todos los campos estén completos
        if (!name || !title || !date) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        console.log("Enviando al servidor: " + name + ", " + title + ", " + date);

        // Enviar los datos al backend (ajustar URL si es necesario)
        fetch('php/contact.php', { // Ajusta la ruta si el archivo PHP está en otro lugar
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                name: name,
                title: title,
                date: date,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al contactar el servidor. Código de estado: ' + response.status);
            }
            return response.json(); // Leer la respuesta como JSON
        })
        .then((data) => {
            if (data.success) {
                alert('Reunión agendada y correo enviado.');
                // Añadir el evento al calendario
                calendar.addEvent({
                    title: `${name} - ${title}`,
                    start: date,
                });
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Error al contactar el servidor:', error);
            alert('Error al contactar el servidor: ' + error.message);
        });

        // Limpiar el formulario y cerrar el modal
        meetingNameInput.value = '';
        meetingTitleInput.value = '';
        meetingDateInput.value = ''; // Limpiar la fecha
        modal.style.display = 'none';
    });
});
