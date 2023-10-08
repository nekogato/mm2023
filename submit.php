<?php
// Process the submitted data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = $_POST['data'];
    $data2 = $_POST['data2'];
    // Generate a unique URL, e.g., using a timestamp
    $uniqueUrl = 'http://www.microwavefest.net/festival2023_testing/ticket.php?id=' . time();

    // Create a unique file name (you can use a more robust method)
    $fileName = time() ;

    // Store the data in a unique text file
    $fileContent = "$data\n$data2\n$uniqueUrl";
    file_put_contents('data/'.$fileName.'.txt', $fileContent);

    // Redirect the user to the result page with the file name as a query parameter
    //header("Location: ticket.php?id=$fileName");
    //exit;
    echo "<a href='$uniqueUrl'>$uniqueUrl</a>";
} else {
    // Handle other cases (e.g., direct access to submit.php)
    echo "Invalid request.";
}
?>