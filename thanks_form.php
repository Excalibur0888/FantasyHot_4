<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $email = isset($_POST["email"]) ? $_POST["email"] : '';
    $name = isset($_POST["name"]) ? $_POST["name"] : '';
    $message = isset($_POST["message"]) ? $_POST["message"] : '';
    $tel = isset($_POST["tel"]) ? $_POST["tel"] : '';
    
    // Set email details
    $to = "support@" . $_SERVER['HTTP_HOST'];
    $subject = "New Form Submission";
    
    // Build email body based on available fields
    $body = "";
    if ($name) $body .= "Name: $name\n";
    if ($email) $body .= "Email: $email\n"; 
    if ($tel) $body .= "Phone: $tel\n";
    if ($message) $body .= "Message: $message\n";
    
    // Add submission details
    $body .= "\nSubmitted from: " . $_SERVER['HTTP_REFERER'];
    $body .= "\nSubmission date: " . date('Y-m-d H:i:s');
    
    // Set headers
    $headers = "From: $to\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    mail($to, $subject, $body, $headers);

    // Redirect to thank you page
    header("Location: thanks.html");
    exit();
}
?>
