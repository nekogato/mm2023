var API_KEY;
var rndInt;
var rndRotate = 0;
var rndScale = 1.5;
var currentlang = "tc";
function removeFirstKeyValuePair(obj) {
    // Convert the object into an array of key-value pairs
    const entries = Object.entries(obj);

    if (entries.length === 0) {
        // Return an empty object if the original object is already empty
        return {};
    }

    // Remove the first key-value pair from the array
    entries.shift();

    // Convert the modified array back into an object
    const updatedObj = Object.fromEntries(entries);

    return updatedObj;
}

function removeLastKeyValuePair(obj) {
    // Convert the object into an array of key-value pairs
    const entries = Object.entries(obj);

    if (entries.length === 0) {
        // Return an empty object if the original object is already empty
        return {};
    }

    // Remove the last key-value pair from the array
    entries.pop();

    // Convert the modified array back into an object
    const updatedObj = Object.fromEntries(entries);

    return updatedObj;
}

function objectToParagraph(obj) {
    let paragraph = "";

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
        paragraph += `${obj[key]}<br/>`;
        }
    }

    return paragraph;
}
function arrToParagraph(arr) {

    let paragraph = "<ul>";

    for (let i = 0; i < arr.length; i++) {
        if(arr[i].role=="assistant"){
            paragraph += "<li class='assistant'>"+arr[i].content+"</li>";
        }
    } 

    paragraph += "</ul>";

    return paragraph;
}


function loadresult(){
    $("body").addClass("body_test_humanity_result_loading")
    $("body").removeClass("body_test_humanity_result_start_chat")
    breakmodel=true;

    //fake
    // setTimeout(function(){
    //     $("body").removeClass("body_test_humanity_result_loading")
    //     $("body").addClass("body_test_humanity_result_done")
    //     $("body").addClass("body_played_test")
    //     breakmodel=true;
    // },3000)
       
    // setTimeout(function(){
    //     for ( var i = 0; i < allArr.length; i++ ) { 
    //         gsap.to(allArr[i].position, {
    //             x: randomObjArr[i].x, 
    //             y: randomObjArr[i].y, 
    //             z: randomObjArr[i].z, 
    //             duration: 3
    //         });
    //     }
    // },3000)
    // setTimeout(function(){
    //     for ( var i = 0; i < allArr.length; i++ ) { 
    //         gsap.to(allArr[i].position, {
    //             x: randomObjArr[i].x2, 
    //             y: randomObjArr[i].y2, 
    //             z: randomObjArr[i].z2, 
    //             duration: 3
    //         });
    //     }
    // },6000)
    // setTimeout(function(){
    //     for ( var i = 0; i < allArr.length; i++ ) { 
    //         gsap.to(allArr[i].position, {
    //             x: randomObjArr[i].x3, 
    //             y: randomObjArr[i].y3, 
    //             z: randomObjArr[i].z3, 
    //             duration: 3
    //         });
    //     }
    // },9000)
}

function check_lang(){
    if($(".lang_btn_en").hasClass("active")){
        currentlang = "en"
    }else{
        currentlang = "tc"
    }
    $.cookie('currentlang', currentlang, { expires: 7 });
}

$(document).ready(function() {
    if($.cookie('currentlang')){
        currentlang = $.cookie('currentlang');
        $(".lang_btn").removeClass("active")
        if(currentlang == "en"){
            $(".lang_btn_en").addClass("active")
        }else{
            $(".lang_btn_tc").addClass("active")
        }
    };

    $.ajax({
        type: "GET",
        url: "key.php",
        success: function(response) {
            API_KEY = response;
        }
    });

    // Handle form submission using AJAX
    $("#submitForm").submit(function(e) {
        console.log(e)
        e.preventDefault(); // Prevent the default form submission

        $.ajax({
            type: "POST",
            url: "submit.php",
            data: $(this).serialize(), // Serialize form data
            success: function(response) {
                console.log(response)
                // Display the result in the "result" div
                $(".share_result_btn").attr("href","http://www.facebook.com/share.php?u="+response);
                $(".share_result_btn").attr("data-href",response);
                
            }
        });
    });

    $(".chat_answer_remark_right a").on( "click", function() {
        if(!$(this).hasClass("active")){
            $(".chat_answer_remark_right a").removeClass("active")
            $(this).addClass("active")
            check_lang();
        }
    });


    $(".chat_answer_submit_btn").on( "click", function() {
        checkChat();
    });

    $("#message").on('keypress',function(e) {
        if(!$(".chat_answer_wrapper").hasClass("endchat") || !$(".chat_answer_wrapper").hasClass("forceendchat")){
            if(e.which == 13) {
                checkChat();
            }
        }
    });
});

function checkChat(){

    if($("body").hasClass("body_played_test") && !$(".chat_answer_wrapper").hasClass("restartchat")){
        $("body").removeClass("body_test_humanity_result_start_chat")
        $("body").addClass("body_test_humanity_result_done")
    }else{


        breakmodel=false;
        doletter1animation();
        doletter2animation();
        doletter3animation();
        setTimeout(function(){
            for ( var i = 0; i < objArr.length; i++ ) { 
                gsap.to(objArr[i].material, {opacity: 1, duration: 3});
            }
            for ( var i = 0; i < objArr2.length; i++ ) { 
                objArr2[i].visible = false;
                //gsap.to(objArr2[i].material, {opacity: 0, duration: 3});
            }
        },0)



        $(".chat_question_wrapper").stop().animate({scrollTop:$(".chat_question_inwrapper").outerHeight()-$(".chat_question_wrapper").height()}, 500, 'swing', function() { 
        });
        
        rndInt = Math.floor(Math.random() * 3)+1 ;
        rndRotate = Math.floor(Math.random() * 120)-60 ;
        rndScale = (Math.random())+1.2 ;
        $("body").addClass("body_test_humanity_result_start_chat");

        loadmessage();
        if($(".chat_answer_wrapper").hasClass("endchat") || $(".chat_answer_wrapper").hasClass("forceendchat")){
            loadresult();
        }else{
            //$("#message").focus(); 
        }
    }
    // fake
    // setTimeout(function(){
    //     loadresult();
    // },5000);
}

function extractTextWithinBraces(str) {
    let stack = [];
    let startIndex = -1;
    let endIndex = -1;
  
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "{") {
        if (stack.length === 0) {
          startIndex = i;
        }
        stack.push("{");
      } else if (str[i] === "}") {
        stack.pop();
        if (stack.length === 0) {
          endIndex = i;
          break;
        }
      }
    }
  
    if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
      const textWithinBraces = str.substring(startIndex + 1, endIndex);
      return textWithinBraces;
    }
  
    return ""; // Return an empty string if no match is found
  }

const form = document.getElementById('chat-form');
const mytextInput = document.getElementById('mytext');
const responseTextarea = document.getElementById('response');


var obj = {};
var messagesArr=[];
var myheight;
//var limit = 9;
var limit = 9;
async function loadmessage(){
    $(".chat_answer_wrapper").addClass("stopTyping");
    var showforceend = false;

    if (messagesArr.length >=limit) {
        showforceend = true;
    }

    var message;

    $("body").addClass("loading_message");

    if($(".chat_answer_wrapper").hasClass("notstartfirstchat") || $(".chat_answer_wrapper").hasClass("restartchat")){
        $(".chat_answer_wrapper").removeClass("notstartfirstchat")
        $(".chat_answer_wrapper").removeClass("restartchat")
        $(".chat_answer_wrapper").addClass("startchat")
        if(currentlang=="en"){
            message="start";
        }else{
            message="開始";
        }
        
    }else if($(".chat_answer_wrapper").hasClass("endchat")){
        if(currentlang=="en"){
            message="Please repeat again the human, ghost or animal score in human_percentage=?%, robot_percentage=?%, alien_percentage=?% (just use the exact same score you just provided) and answer the reason again";
        }else{
            message="請把你剛才給的人，鬼，獸三個分數以 human_percentage=?%, robot_percentage=?%, alien_percentage=?% 再回答一次(必須為你之前給的分數)， 也同時給予理由";
        }
    }else{
        message = $('#message').val();
    };

    $('#message').val("")

    if(!$(".chat_answer_wrapper").hasClass("endchat") && !$(".chat_answer_wrapper").hasClass("forceendchat") ){
        $(".chat_question").append('<div class="chat_question_item chat_question_item_right"><div class="">'+message+'</div></div>')
        // $(".chat_question_item_right:last > div").scrambler({
        //     effect: "typing",
        //     final_text: $(".chat_question_item_right:last > div").text(),
        //     speed: 50,
        //     reveal: 50
        // });

        $(".chat_question").append('<div class="chat_question_item chat_question_item_left loading_text"><div class="text5"></div></div>')
        
        $(".chat_question_wrapper").stop().animate({scrollTop:$(".chat_question_inwrapper").outerHeight()-$(".chat_question_wrapper").height()}, 500, 'swing', function() { 
        });
    }

    if (messagesArr.length >0) {
        //messages = JSON.parse(messagesArr);
    } else {


        if(currentlang=="en"){
            messagesArr = [{ role: "system", content:"Please respond in English. I'd like you to play a story-based question and answer game with me to estimate my identity. I'd like you to reply with game outputs only, and not with any other content. Please design the game content based on the plot of the movie 《Alien》.Game Background: As the protagonist of the story, I wake up during a space mission and hear a broadcast from the spaceship's artificial intelligence central processing system warning of some 'abnormality' on the spaceship (please create the plot based on the movie). It instructs me to find the problem and try to resolve it. The game will consist of 4 rounds of questions and answers. You should assess my identity based on the three aspects of human (human), ghost (artificial intelligence robot), and animal (alien), as represented in the movie 《Alien》. In each round of the game, please provide at least 4 options for me to choose from. Please ensure that each answer choice in the game adheres to the following rules I will write: Rule 1) The first option must be an action that requires adaptability and dealing with a changing environment, choosing this option will increase the likelihood that I am 'human' or 'animal'; Rule 2) The second option must be an action that requires precise and rapid calculation, rationality, and a calm mind, choosing this option will increase the likelihood that I am 'human' or 'ghost'; Rule 3) The third option must be an action motivated by self-interest, choosing this option will increase the likelihood that I am a 'animal'; Rule 4) The fourth option must be unrelated to the space mission and closer to instinctual behavior, choosing this option will increase the likelihood that I am 'human' or 'animal'. I will not directly reveal my identity, and the options should not contain identity information. You can only judge based on my choices, and you should reply with the content that a text adventure game would display. Each choice will be assigned a number from 1-4, and I can input and reply with that number to select the option. Before each question, please provide a brief introduction to the story background you have created. After each question, the spaceship will also produce a new danger, so include a brief description in each question. The game will immediately end after my fourth choice or if I say 'force the game to end'. Please then create a story ending and provide a score to indicate my likelihood of being a human, ghost or animal (e.g., Human: 70%, Ghost: 10%, Animal: 20%) and provide a reason. You must end with the words 'Game Over'."}];
        }else{        
            messagesArr = [{ role: "system", content:  "請以繁體中文作答，我希望你扮演一款有故事性的問答遊戲並在遊戲中估計我的身份，我希望你只回覆遊戲輸出，而不是其他任何內容。請根據電影《異型》中的劇情設計遊戲內容。遊戲背景：作為故事主人公的我正在太空任務途中醒來，聽到太空船的人工智慧中央處理系統的廣播正發出某種警告，表示太空船處於某種「異常狀態」中(請根據電影情節創作)，並指示我找出問題所在並嘗試解決。遊戲將會進行4次問答。你需根據電影《異型》中對人(人類human)，鬼(人工智能robot)，獸(異型alien)，所代表的人類的三種面向對我進行身份評估。遊戲中每次問答請提供至少4個選項供我選擇，請確保遊戲中每次的答題選項都根據我接下來寫的規則：規則1)第1個選項必須為一個需要臨場應變能力和面對多變環境的行動，如選取這選項會增加我是「人」或「獸」的可能性；規則2)第2個選項必須為一個需要精準快速的計算能力，理性和冷靜頭腦的行動，如選取這選項會增加我是「人」或「鬼」的可能性；規則3)第3個選項必須為一個只為滿足己欲的行動，如選取這選項會增加我是「獸」的可能性；規則4)第4個選項必須和太空任務沒有關係，而更接近生物本能行為，如選取這選項會增加我是「人」或「獸」的可能性。我不會直接回答我的身份，選項中也不應包含身份的資訊，你只可根據我的選擇判斷，且只需回覆文字冒險遊戲將顯示的內容。每個可選擇的選項都會分配一個數字 1-4，我可以輸入並回覆該數字來選擇該選項。在問答遊戲前請簡短介紹加入你創作的故事背景。每一次問答後太空船也會產生新的危險，請在每一次問答中加入簡短的細節描寫。在我做第4次選擇或我說「強制遊戲完結」時遊戲立刻結束，請接著創作一個故事結尾並提供分數以表示我在人，鬼和獸三個身份中的可能性(例：人:70%，鬼:10%，獸:20%)並提供理由，並必須加上「遊戲結束」四個字。" }];

        }

    }

    if(showforceend && !$(".chat_answer_wrapper").hasClass("endchat")){
        if(currentlang=="en"){
            message = "My answer is "+message+", then 'force the game to end', Please create the ending of the story based on the answers I gave before (don't need to mention I force the game to end) and estimate my identity (the result must be given, it can be just an estimate, it does not have to be accurate), and provide scores to express the possibility of my three identities as human, ghost and animal (e.g. : Human: 70%, Ghost: 10%, animal: 20%) and provide a brief reason (no more than 20 words)."
        }else{
            message = "我的答案是"+message+"，然後「強制遊戲完結」，請根據我之前給的答案創作出故事結尾(不用提及我強制遊戲完結)並估計我的身份(必須給出結果，可以只是估計，不用準確)，提供分數以表示我在人，鬼和獸三個身份中的可能性(例：人:70%，鬼:10%，獸:20%)並提供簡短理由(不多於20字)。"
        }
    }
    messagesArr.push({ role: "user", content: message });
    console.log(messagesArr)

    var myfunctions = [
        {
            "name": "write_result",
            "description": "請給予分數",
            "parameters": {
                "type": "object",
                "properties": {
                    "human_percentage": {
                        "type": "string",
                        "description": "人的分數"
                    },
                    "human_percentage_reason": {
                        "type": "string",
                        "description": "人的分數理由"
                    },
                    "robot_percentage": {
                        "type": "string",
                        "description": "鬼的分數"
                    },
                    "robot_percentage_reason": {
                        "type": "string",
                        "description": "鬼的分數的理由"
                    },
                    "alien_percentage": {
                        "type": "string",
                        "description": "獸的分數"
                    },
                    "alien_percentage_reason": {
                        "type": "string",
                        "description": "獸的分數理由"
                    },
                },
                "required": ["human_percentage","human_percentage_reason","robot_percentage","robot_percentage_reason","alien_percentage","alien_percentage_reason"],
            }
        }
    ]

    if($(".chat_answer_wrapper").hasClass("endchat")){
        var es = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${API_KEY}`,
                },
                method: "POST",
                body: JSON.stringify({
                    model: "gpt-3.5-turbo-16k",
                    //model: "gpt-3.5-turbo",
                    messages: messagesArr,
                    functions: myfunctions,
                    function_call: {
                        "name": "write_result"
                    }
                }),
            }
        );
        
        if (es.ok) {
            const myjson = await es.json();
            var str = myjson.choices[0].message.function_call.arguments;
            str=str.replace(',\n}', '}');
            str=str.replace('\n', '');

            console.log(str)
            var extractedText = "{"+extractTextWithinBraces(str)+"}";
            console.log(extractedText)
            var data = JSON.parse(extractedText)
            console.log(data)


            $(".human_percentage").attr("data-text",data.human_percentage)
            $(".human_score_percentage_bar").attr("data-width",data.human_percentage)
            $(".robot_percentage").attr("data-text",data.robot_percentage)
            $(".robot_score_percentage_bar").attr("data-width",data.robot_percentage)
            $(".alien_percentage").attr("data-text",data.alien_percentage)
            $(".alien_score_percentage_bar").attr("data-width",data.alien_percentage)

            Math.max(x,y,z)
            var x = parseInt(data.human_percentage);
            var y = parseInt(data.alien_percentage);
            var z = parseInt(data.robot_percentage);
            if(x>y && x>z) {
                //x
                $(".top_icon .chat_result_identity_icon").addClass("chat_result_identity_icon_human"); 
                $(".top_icon .chat_result_identity_icon").removeClass("chat_result_identity_icon_robot"); 
                $(".top_icon .chat_result_identity_icon").removeClass("chat_result_identity_icon_animal"); 
                $(".share_result_btn").attr("data-title","You are: Human ::: MICROWAVE INTERNATIONAL NEW MEDIA ARTS FESTIVAL 2023 :::");
                $("body").addClass("silver_bg")
            }else if(z>x && z>y){ 
                //z
                $(".top_icon .chat_result_identity_icon").removeClass("chat_result_identity_icon_human"); 
                $(".top_icon .chat_result_identity_icon").addClass("chat_result_identity_icon_robot"); 
                $(".top_icon .chat_result_identity_icon").removeClass("chat_result_identity_icon_animal"); 
                $(".share_result_btn").attr("data-title","You are: AI ::: MICROWAVE INTERNATIONAL NEW MEDIA ARTS FESTIVAL 2023 :::");
                $("body").addClass("black_bg")
            }else {
                //y
                $(".top_icon .chat_result_identity_icon").removeClass("chat_result_identity_icon_human"); 
                $(".top_icon .chat_result_identity_icon").removeClass("chat_result_identity_icon_robot"); 
                $(".top_icon .chat_result_identity_icon").addClass("chat_result_identity_icon_animal"); 
                $(".share_result_btn").attr("data-title","You are: Animal ::: MICROWAVE INTERNATIONAL NEW MEDIA ARTS FESTIVAL 2023 :::");
                $("body").addClass("orange_bg")
            }

            var finalMessagesArr = Array.from(messagesArr);
            console.log("1",finalMessagesArr)
            finalMessagesArr.splice(0, 2); // Remove 1 element starting from index 0
            finalMessagesArr.splice(-1); // Remove the last two elements
            // removeFirstKeyValuePair(finalMessagesArr)
            // removeFirstKeyValuePair(finalMessagesArr)
            // removeLastKeyValuePair(finalMessagesArr)
            // removeLastKeyValuePair(finalMessagesArr)
            finalMessagesArr=arrToParagraph(finalMessagesArr)
            console.log("2",finalMessagesArr)
            $(".story").html(finalMessagesArr);

            $("#data_human_percentage").val(data.human_percentage)
            $("#data_human_percentage_reason").val(data.human_percentage_reason)
            $("#data_robot_percentage").val(data.robot_percentage)
            $("#data_robot_percentage_reason").val(data.robot_percentage_reason)
            $("#data_alien_percentage").val(data.alien_percentage)
            $("#data_alien_percentage_reason").val(data.alien_percentage_reason)
            $("#data_story").val(finalMessagesArr)
            $("#submitForm").submit();


            $("body").removeClass("body_test_humanity_result_loading")
            $("body").addClass("body_test_humanity_result_done")
            setTimeout(function(){
                $(".score_icon_item").mouseenter();
                $(".chat_result_identity_icon").addClass("show")
            },1500)

            $("body").addClass("body_played_test")
            $.cookie('played', 'true', { expires: 7 });
            $(".chat_answer_wrapper").removeClass("stopTyping");
            breakmodel=false;
            
            // data.identity_guess
            // data.identity_reason
            // data.psychological_types_guess
            // data.psychological_types_animal
            // data.psychological_types_reason
        } else {
            
        }
        
    }else if($(".chat_answer_wrapper").hasClass("startchat")){
        var es = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${API_KEY}`,
                },
                method: "POST",
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: messagesArr,
                    stream: true,
                }),
            }
        );
  
        const reader = es.body?.pipeThrough(new TextDecoderStream()).getReader();
    
        while (true) {
            const res = await reader?.read();
            if (res?.done) {
                let text = $(".chat_question_item_left:last").text();
                $(".chat_question_item_left:last").removeClass("typing_text");
                messagesArr.push({ role: "assistant", content: text });
                //sessionStorage.setItem("bot-message",JSON.stringify(messages));
                $("body").removeClass("loading_message");
                if(text.includes("遊戲結束") || text.includes("Game Over") || text.includes("Game over") || text.includes("game over")){
                    $(".chat_answer_wrapper").removeClass("startchat")
                    $(".chat_answer_wrapper").addClass("endchat")
                }
                $(".chat_answer_wrapper").removeClass("stopTyping");
                break;
            }
            const jsonStrings = res?.value.match(/data: (.*)\n\n/g);

            const jsonData = jsonStrings.map((jsonString) => {
                const startIndex = jsonString.indexOf("{");
                const endIndex = jsonString.lastIndexOf("}") + 1;
                const json = jsonString.substring(startIndex, endIndex);
                let data;
                
                try{
                    if(json){
                        data = JSON.parse(json);
                        if(data.choices[0].delta.finish_reason != 'stop'){
                            let text = data.choices[0].delta.content;
                            if(text){
                                const textStartIndex = text.indexOf("{");
                                const textEndIndex = text.lastIndexOf("}") + 1;
                                if(textStartIndex && textEndIndex){
                                    const textJson = text.substring(textStartIndex, textEndIndex);
                                    if(currentlang=="en"){
                                        $(".chat_question_item_left:last").text("Game Over");
                                    }else{
                                        $(".chat_question_item_left:last").text("遊戲結束");
                                    }
                                    
                                    console.log(textJson)
                                }else{
                                    let i=0;
                                    
                                    while (i < text.length) {
                                        $(".chat_question_item_left:last").removeClass("loading_text");
                                        $(".chat_question_item_left:last").addClass("typing_text");
                                        
                                        $(".chat_question_item_left:last")[0].innerHTML += text.charAt(i);

                                        if(myheight !== $(".chat_question_item_left:last").height()){
                                            $(".chat_question_wrapper").stop().animate({scrollTop:$(".chat_question_inwrapper").outerHeight()-$(".chat_question_wrapper").height()}, 500, 'swing', function() { 
                                             });
                                            myheight = $(".chat_question_item_left:last").height();
                                        }
                                        i++;             
                                    }
                                }
                            }
                        }
                    }
                }
                catch(ex){
                    console.log('error: json');
                    console.log(json);
                }
            
                return data;
            });
        }
    }

    if(showforceend && $(".endtext").length<=0){
        $(".chat_answer_wrapper").removeClass("startchat")
        $(".chat_answer_wrapper").addClass("endchat")
        $(".chat_answer_wrapper").addClass("forceendchat")
        
        if(currentlang=="en"){
            $(".chat_question").append('<div class="chat_question_item chat_question_item_left"><div class="text5 endtext">Press "See Result" to view and share your result.</div></div>')
        }else{
            $(".chat_question").append('<div class="chat_question_item chat_question_item_left"><div class="text5 endtext">請按"See Result"查看及分享結果。</div></div>')
        }
        $(".chat_question_wrapper").stop().animate({scrollTop:$(".chat_question_inwrapper").outerHeight()-$(".chat_question_wrapper").height()}, 500, 'swing', function() { 
        });
        $(".chat_answer_wrapper").addClass("stopTyping");
        $(".chat_question_item_left:last > .endtext").scrambler({
            effect: "typing",
            final_text: $(".chat_question_item_left:last > .endtext").text(),
            speed: 50,
            reveal: 50,
            onFinish: function(){
                $(".chat_answer_wrapper").removeClass("stopTyping");
            }
        });
        
    }
}