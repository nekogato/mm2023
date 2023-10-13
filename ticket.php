<?php
    // Retrieve the file name from the URL query parameter
    $fileName = 'data/'.$_GET['id'].'.txt';
    
    if (isset($fileName) && file_exists($fileName)) {
        // Read the data from the specified file
        $fileContent = file_get_contents($fileName);
        
        // Parse the data from the file content
        list($data_identity_guess, $data_identity_reason, $data_psychological_types_guess, $data_psychological_types_animal, $data_psychological_types_reason, $url) = explode("\n", $fileContent);
    }
?>


<!DOCTYPE html>
<html>
<head>
    
    <title>You are: <?php echo $data_identity_guess; ?></title>
    <meta property="og:url"            content="<?php echo $url; ?>" />
    <meta property="og:type"               content="article" />
    <meta property="og:title"              content="You are: <?php echo $data_identity_guess; ?>" />
    <meta property="og:description"        content="<?php echo $data_identity_reason; ?>" />
    
</head>
<body>
    <h1>You are: <?php echo $data_identity_guess; ?></h1>
    <?php
    
    if (isset($fileName) && file_exists($fileName)) {
        ?>
        <p>Reason: <?php echo $data_identity_reason; ?></p>
        <p>Reason: <?php echo $data_psychological_types_guess; ?></p>
        <p>Reason: <?php echo $data_psychological_types_animal; ?></p>
        <p>Reason: <?php echo $data_psychological_types_reason; ?></p>
        <p>Unique URL: <a href="<?php echo $url; ?>"><?php echo $url; ?></a></p>
    <?php } else { ?>
        <p>File not found.</p>
    <?php } ?>
</body>
</html>
