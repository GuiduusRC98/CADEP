<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $email = $_POST["email"];
    $telefono = $_POST["telefono"];
    $mensaje = $_POST["mensaje"];
    
    $destinatario = "pezzottaguido@gmail.com"; // Cambia esto al correo deseado
    
    $asunto = "Nuevo mensaje de contacto de $nombre desde la web";
    $contenido = "Nombre: $nombre\nEmail: $email\nTelefono: $telefono\nMensaje:\n$mensaje";
    
    $headers = "From: $email";
    
    if (mail($destinatario, $asunto, $contenido, $headers)) {
        echo "Mensaje enviado correctamente. Gracias por contactarnos.";
    } else {
        echo "Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.";
    }
}
?>
