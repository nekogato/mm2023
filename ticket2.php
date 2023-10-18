<?php

    // Retrieve the file name from the URL query parameter
    $fileName = 'data2/'.$_GET['id'].'.txt';
    
    if (isset($fileName) && file_exists($fileName)) {
        // Read the data from the specified file
        $fileContent = file_get_contents($fileName);
        
        // Parse the data from the file content
        list($data_human_percentage, $data_human_percentage_reason, $data_alien_percentage, $data_alien_percentage_reason, $data_robot_percentage, $data_robot_percentage_reason,$data_story, $url) = explode("\n", $fileContent);
        
        $identity;
        
        if ($data_human_percentage > $data_alien_percentage && $data_human_percentage > $data_robot_percentage){
            $identity = "human";
        }elseif ($data_alien_percentage > $data_robot_percentage){
            $identity = "animal";
        }else{
            $identity = "robot";
        };

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
<body class="body_test_humanity loading_message body_test_humanity_result_done body_played_test">

    <div class="chat_result_wrapper">
        <div class="bg "></div>
        <div class="chat_result_inwrapper">
            <div class="chat_result">
                <div class="chat_result_top_bg"></div>
                <div class="chat_result_content">
                    <img src="images/share_logo.png" class="chat_result_logo">
                    <img src="images/ticket_top_text.png" class="ticket_top_text">
                    <div class="chat_result_content_scroll_wrapper">
                        <div class="chat_result_content_scroll ">
                            <div class="chat_result_box_wrapper">

                                <?php
                                
                                if (isset($fileName) && file_exists($fileName)) {
                                    ?>
                                    <div class="chat_result_box chat_result_box2">
                                        <div class="chat_result_box_scroll scroll_area">
                                            <div class="chat_result_box_content">
                                                <div class="top top2 text7">
                                                    You are 你是 →
                                                    <div class="top_icon">
                                                        <div class="chat_result_identity_icon chat_result_identity_icon_<?php echo $identity ?>"></div>
                                                    </div>
                                                </div>
                                                <div class="bottom ">
                                                    <div class="score_icon_item_wrapper">
                                                        <div class="score_icon_item">
                                                            <div class="score_icon_item_top">
                                                                <div class="score_icon chat_result_identity_icon_human"></div>
                                                                <div class="score_percentage human_percentage text4"><?php echo $data_human_percentage ?></div>
                                                            </div>
                                                            <div class="human_score_percentage_bar score_percentage_bar" style="width: <?php echo $data_human_percentage ?>;"></div>
                                                        </div>
                                                        <div class="score_icon_item">
                                                            <div class="score_icon_item_top">
                                                                <div class="score_icon chat_result_identity_icon_robot"></div>
                                                                <div class="score_percentage robot_percentage text4"><?php echo $data_robot_percentage ?></div>
                                                            </div>
                                                            <div class="robot_score_percentage_bar score_percentage_bar" style="width: <?php echo $data_robot_percentage ?>;"></div>
                                                        </div>
                                                        <div class="score_icon_item">
                                                            <div class="score_icon_item_top">
                                                                <div class="score_icon chat_result_identity_icon_animal"></div>
                                                                <div class="score_percentage alien_percentage text4"><?php echo $data_alien_percentage ?></div>
                                                            </div>
                                                            <div class="alien_score_percentage_bar score_percentage_bar" style="width: <?php echo $data_alien_percentage ?>;"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat_result_box chat_result_box2">
                                        <div class="chat_result_box_scroll scroll_area">
                                            <div class="chat_result_box_content">
                                                <div class="top top2 text7">
                                                    Your story 你經歷了 →
                                                </div>
                                                <div class="bottom story story_box">
                                                    <?php echo $data_story ?>
                                                </div>
                                            </div>
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
        <div class="chat_top_btn_wrapper">
            <div class="chat_top_logo text5 mobile_hide">N.H Intelligence</div>
            <div class="top_arrow_btn leave_chat_btn text5"><a href="index2.html">← BACK</a></div>
        </div>
    </div>
    
    <div class="share_bottom_btn_wrapper">
        <a class="share_result_btn"  href="#">
            <div>Share your result →</div>
        </a>
        <a class="share_restart_btn leave_chat_result_btn"  href="index2.html?id=HumanityTest">
            <div>Check your own identity →</div>
        </a>
    </div>
    <script>
        $(window).load(function(){
            $(".scroll_area").each(function () {
                var $this = $(this);


                var ps  = new PerfectScrollbar($(this)[0],{
                    suppressScrollX:true,
                    scrollYMarginOffset:20
                });

                
            });
        })
    </script>
</body>
</html>
