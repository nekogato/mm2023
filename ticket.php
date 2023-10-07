<?php
    // Retrieve the file name from the URL query parameter
    $fileName = 'data/'.$_GET['id'].'.txt';
    
    if (isset($fileName) && file_exists($fileName)) {
        // Read the data from the specified file
        $fileContent = file_get_contents($fileName);
        
        // Parse the data from the file content
        list($data, $data2, $url) = explode("\n", $fileContent);
    }
?>


<!DOCTYPE html>
<html>
<head>
    
    <title>You are: <?php echo $data; ?></title>
    <meta property="og:url"            content="<?php echo $url; ?>" />
    <meta property="og:type"               content="article" />
    <meta property="og:title"              content="You are: <?php echo $data; ?>" />
    <meta property="og:description"        content="<?php echo $data2; ?>" />
    
</head>
<body>
    <h1>You are: <?php echo $data; ?></h1>
    <?php
    
    if (isset($fileName) && file_exists($fileName)) {
        ?>
        <p>Reason: <?php echo $data2; ?></p>
        <p>Unique URL: <a href="<?php echo $url; ?>"><?php echo $url; ?></a></p>
    <?php } else { ?>
        <p>File not found.</p>
    <?php } ?>
</body>
</html>
