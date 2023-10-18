<?php
// Process the submitted data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data_human_percentage = $_POST['data_human_percentage'];
    $data_human_percentage_reason = $_POST['data_human_percentage_reason'];
    $data_alien_percentage = $_POST['data_alien_percentage'];
    $data_alien_percentage_reason = $_POST['data_alien_percentage_reason'];
    $data_robot_percentage = $_POST['data_robot_percentage'];
    $data_robot_percentage_reason = $_POST['data_robot_percentage_reason'];
    $data_story = $_POST['data_story'];

    // Generate a unique URL, e.g., using a timestamp
    $uniqueUrl = 'https://nekodeveloper.com/mm2023/html14/ticket2.php?id=' . time();

    // Create a unique file name (you can use a more robust method)
    $fileName = time() ;

    // Store the data in a unique text file
    $fileContent = "$data_human_percentage\n$data_human_percentage_reason\n$data_alien_percentage\n$data_alien_percentage_reason\n$data_robot_percentage\n$data_robot_percentage_reason\n$data_story\n$uniqueUrl";
    file_put_contents('data2/'.$fileName.'.txt', $fileContent);

    // Redirect the user to the result page with the file name as a query parameter
    //header("Location: ticket.php?id=$fileName");
    //exit;
    echo $uniqueUrl;
} else {
    // Handle other cases (e.g., direct access to submit.php)
    echo "Invalid request.";
}
?>