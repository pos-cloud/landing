<?php
// Dirección de correo donde recibirás los datos
$receiving_email_address = 'info@poscloud.com.ar';

// Manejo de solicitudes POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Verifica que todos los campos requeridos estén presentes
    if (isset($_POST['name'], $_POST['title'], $_POST['date'])) {
        // Obtener los datos del formulario
        $name = htmlspecialchars($_POST['name']);
        $title = htmlspecialchars($_POST['title']);
        $date = htmlspecialchars($_POST['date']);
        $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : 'No se proporcionó mensaje';
        
        // Configuración del correo para agendar la reunión
        $meeting_subject = "Nueva reunión agendada";
        $meeting_message = "Se ha agendado una nueva reunión.\n\nTítulo: $title\nFecha: $date\n\nMensaje adicional:\n$message";
        $meeting_headers = "From: noreply@tusitio.com\r\n";
        $meeting_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Envía el correo de la reunión
        if (mail($receiving_email_address, $meeting_subject, $meeting_message, $meeting_headers)) {
            // Respuesta exitosa
            echo json_encode(["success" => true, "message" => "Correo enviado correctamente y reunión agendada."]);
        } else {
            // Error al enviar el correo
            echo json_encode(["success" => false, "message" => "Error al enviar el correo o agendar la reunión."]);
        }
    } else {
        // Si faltan datos en la solicitud
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Faltan campos obligatorios en la solicitud."]);
    }
} else {
    // Método no permitido
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}
?>
