<?php
// Process the submitted data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data_identity_guess = $_POST['data_identity_guess'];
    $data_identity_reason = $_POST['data_identity_reason'];
    $data_psychological_types_guess = $_POST['data_psychological_types_guess'];
    $data_psychological_types_animal = $_POST['data_psychological_types_animal'];
    $data_psychological_types_reason = $_POST['data_psychological_types_reason'];
    // Generate a unique URL, e.g., using a timestamp
    $uniqueUrl = 'https://nekodeveloper.com/mm2023/html12/ticket.php?id=' . time();

    // Create a unique file name (you can use a more robust method)
    $fileName = time() ;

    // Store the data in a unique text file
    $fileContent = "$data_identity_guess\n$data_identity_reason\n$data_psychological_types_guess\n$data_psychological_types_animal\n$data_psychological_types_reason\n$uniqueUrl";
    file_put_contents('data/'.$fileName.'.txt', $fileContent);

    // Redirect the user to the result page with the file name as a query parameter
    //header("Location: ticket.php?id=$fileName");
    //exit;
    echo $uniqueUrl;
} else {
    // Handle other cases (e.g., direct access to submit.php)
    echo "Invalid request.";
}
?>