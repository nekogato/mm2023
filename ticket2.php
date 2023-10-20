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
            $identity_reason = $data_human_percentage_reason;
            $bg = "silver_bg";
        }elseif ($data_alien_percentage > $data_robot_percentage){
            $identity = "animal";
            $identity_reason = $data_alien_percentage_reason;
            $bg = "orange_bg";
        }else{
            $identity = "robot";
            $identity_reason = $data_robot_percentage_reason;
            $bg = "black_bg";
        };

    }
?>


<!DOCTYPE html>
<html>
<head>
    
    <title>You are: <?php echo $identity; ?></title>
    <meta property="og:url"            content="<?php echo $url; ?>" />
    <meta property="og:type"               content="article" />
    <meta property="og:title"              content="You are: <?php echo $identity; ?>" />
    <meta property="og:description"        content="<?php echo $identity_reason; ?>" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="script/lib/jquery-1.11.1.min.js"></script>
    <script src="script/lib/gsap.min.js"></script>
    <script src="script/lib/perfect-scrollbar.js"></script>
    <script src="script/lib/jquery.animateNumber.min.js"></script>
    <link href="script/lib/perfect-scrollbar.css" rel="stylesheet" type="text/css" />
    <link href="script/lib/fancybox/jquery.fancybox.min.css" rel="stylesheet" type="text/css" />
    <script src="script/lib/fancybox/jquery.fancybox.min.js"></script>

    <link rel="stylesheet" type="text/css" href="fonts/stylesheet.css" />
    <link rel="stylesheet" type="text/css" href="css/main.css" />
    <link rel="stylesheet" type="text/css" href="css/module.css" />

    <script src="script/script.js"></script>

</head>
<body class="body_test_humanity loading_message body_test_humanity_result_done body_played_test <?php echo $bg;?> single_reult_body">

    <div class="chat_result_wrapper offset_p">
        <div class="bg "></div>
        <div class="chat_result_inwrapper offset_child scrollin scrollin1">
            <div class="chat_result">
                <div class="chat_result_top_bg"></div>
                <div class="chat_result_content">
                    <img src="images/share_logo.png" class="chat_result_logo ">
                    <img src="images/ticket_top_text.png" class="ticket_top_text ">
                    <div class="chat_result_content_scroll_wrapper">
                        <div class="chat_result_content_scroll ">
                            <div class="chat_result_box_wrapper">

                                <?php
                                
                                if (isset($fileName) && file_exists($fileName)) {
                                    ?>
                                    <div class="chat_result_box chat_result_box2" id="chat_result_box_id">
                                        <div class="chat_result_box_scroll ">
                                            <div class="chat_result_box_content">
                                                <div class="top top2 text7 ">
                                                    You are 你是 →
                                                    <div class="top_icon">
                                                        <div class="chat_result_identity_icon chat_result_identity_icon_<?php echo $identity ?> offset_child show"></div>
                                                    </div>
                                                </div>
                                                <div class="bottom ">
                                                    <div class="score_icon_item_wrapper">
                                                        <div class="score_icon_item">
                                                            <div class="score_icon_item_top offset_child scrollin scrollin1">
                                                                <div class="score_icon chat_result_identity_icon_human"></div>
                                                                <div class="score_percentage human_percentage text2" data-text="<?php echo $data_human_percentage ?>">00%</div>
                                                            </div>
                                                            <div class="score_percentage_bar offset_child scrollin scrollin1">
                                                                <div class="human_score_percentage_bar " data-width="<?php echo $data_human_percentage ?>" style="width: 0%;"><div class="line"></div></div>
                                                            </div>
                                                        </div>
                                                        <div class="score_icon_item">
                                                            <div class="score_icon_item_top offset_child scrollin scrollin1">
                                                                <div class="score_icon chat_result_identity_icon_robot"></div>
                                                                <div class="score_percentage robot_percentage text2" data-text="<?php echo $data_robot_percentage ?>">00%</div>
                                                            </div>
                                                            <div class="score_percentage_bar offset_child scrollin scrollin1">
                                                                <div class="robot_score_percentage_bar " data-width="<?php echo $data_robot_percentage ?>" style="width: 0%;"><div class="line"></div></div>
                                                            </div>
                                                        </div>
                                                        <div class="score_icon_item">
                                                            <div class="score_icon_item_top offset_child scrollin scrollin1">
                                                                <div class="score_icon chat_result_identity_icon_animal"></div>
                                                                <div class="score_percentage alien_percentage text2" data-text="<?php echo $data_alien_percentage ?>">00%</div>
                                                            </div>
                                                            <div class="score_percentage_bar offset_child scrollin scrollin1">
                                                                <div class="alien_score_percentage_bar " data-width="<?php echo $data_alien_percentage ?>" style="width: 0%;"><div class="line"></div></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="chat_result_box chat_result_box2">
                                        <div class="chat_result_box_scroll scroll_area">
                                            <div class="chat_result_box_content">
                                                <div class="top top2 text7 ">
                                                    Your story 你經歷了 →
                                                </div>
                                                <div class="bottom story story_box offset_child scrollin scrollin1">
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
            <div class="chat_top_logo text5 "><a href="index2.html">N.H Intelligence</a></div>
        </div>
    </div>
    
    <div class="share_bottom_btn_wrapper">
        <a href="http://www.facebook.com/share.php?u=<?php echo $url; ?>" onClick="return fbs_click(400, 300)" target="_blank" title="Share your result" class="share_result_btn"><div>Share your result →</div></a>
        <a class="share_restart_btn leave_chat_result_btn"  href="index2.html?id=HumanityTest">
            <div>Check your own identity →</div>
        </a>
    </div>
    <!-- <script>
        $(window).load(function(){
            $(".scroll_area").each(function () {
                var $this = $(this);


                var ps  = new PerfectScrollbar($(this)[0],{
                    suppressScrollX:true,
                    scrollYMarginOffset:20
                });

                
            });


            $("#chat_result_box_id").mouseenter(function(){
                $(this).find(".score_icon_item").each(function(){
                    var $this = $(this);
                    $this.find(".score_percentage").text("0%")
                    $this.find(".score_percentage").animateNumber(
                    {
                        number: $this.find(".score_percentage").attr("data-text"),
                        numberStep: function(now, tween) {
                            var floored_number = Math.floor(now),
                                target = $(tween.elem);
                            if(parseInt(floored_number)<10){floored_number="0"+floored_number;}
                            target.text(floored_number + '%');
                        }
                    },
                    {
                        easing: 'swing',
                        duration: 1200
                    }
                    );
                    $this.find(".score_percentage_bar > div").addClass("noanimation");
                    $this.find(".score_percentage_bar > div").width("0%");
                    setTimeout(function(){
                        $this.find(".score_percentage_bar > div").removeClass("noanimation");
                        $this.find(".score_percentage_bar > div").width($this.find(".score_percentage_bar > div").attr("data-width"));
                    },0)
                })
            })
        })
    </script> -->
</body>
</html>
