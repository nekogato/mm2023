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

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="script/lib/jquery-1.11.1.min.js"></script>
    <script src="script/lib/gsap.min.js"></script>
    <script src="script/lib/perfect-scrollbar.js"></script>
    <link href="script/lib/perfect-scrollbar.css" rel="stylesheet" type="text/css" />
    <link href="script/lib/fancybox/jquery.fancybox.min.css" rel="stylesheet" type="text/css" />
    <script src="script/lib/fancybox/jquery.fancybox.min.js"></script>

    <link rel="stylesheet" type="text/css" href="css/main.css" />
    <link rel="stylesheet" type="text/css" href="css/module.css" />

</head>
<body class="body_test_humanity_result_done"body_test_humanity_result_done>

    <div class="chat_result_wrapper">
        <div class="bg "></div>
        <div class="chat_result_inwrapper">
            <div class="chat_result">
                <div class="chat_result_top_bg"></div>
                <div class="chat_result_content">
                    <img src="images/share_logo.png" class="chat_result_logo">
                    <div class="chat_result_content_scroll_wrapper">
                        <div class="chat_result_content_scroll ">
                            <div class="chat_result_box_wrapper">

                                <?php
                                
                                if (isset($fileName) && file_exists($fileName)) {
                                    ?>

                                    <div class="chat_result_box">
                                        <div class="chat_result_box_scroll scroll_area">
                                            <div class="chat_result_box_content">
                                                <div class="top text7">Result 人/鬼檢測結果 →</div>
                                                <div class="middle chat_result_identity_icon chat_result_identity_icon_human"></div>
                                                <div class="bottom identity_guess text4">
                                                    <?php echo $data_identity_guess; ?>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="icon_cover_wrapper">
                                            <div class="icon_cover icon_cover1" style="background-image: url(images/icon_human.png);"></div>
                                        </div>
                                    </div>
                                    <div class="chat_result_box">
                                        <div class="chat_result_box_scroll scroll_area">
                                            <div class="chat_result_box_content">
                                                <div class="top text7">Analysis 分析 →</div>
                                                <div class="bottom identity_reason"><?php echo $data_identity_reason; ?></div>
                                            </div>
                                        </div>
                                        <div class="icon_cover_wrapper">
                                            <div class="icon_cover icon_cover2" style="background-image: url(images/icon_ghost.png);"></div>
                                        </div>
                                    </div>
                                    <div class="chat_result_box">
                                        <div class="chat_result_box_scroll scroll_area">
                                            <div class="chat_result_box_content">
                                                <div class="top">
                                                    <div class="text7">Animal Type 獸類型 →</div>
                                                    <div class="psychological_types_guess"><?php echo $data_psychological_types_guess; ?></div>
                                                    <div class="psychological_types_animal"><?php echo $data_psychological_types_animal; ?></div>
                                                </div>
                                                <div class="bottom psychological_types_reason"><?php echo $data_psychological_types_reason; ?></div>
                                            </div>
                                        </div>
                                        <div class="icon_cover_wrapper">
                                            <div class="icon_cover icon_cover3" style="background-image: url(images/icon_animal.png);"></div>
                                        </div>
                                    </div>


                                <?php } else { ?>
                                    <p>File not found.</p>
                                <?php } ?>

                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat_result_bottom_bg"></div>
            </div>
        </div>
        <a class="share_result_btn"  href="<?php echo $url; ?>">
            <div>Share your result →</div>
        </a>
    </div>

</body>
</html>
