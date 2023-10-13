var API_KEY;

function loadresult(){
    $("body").addClass("body_test_humanity_result_loading")
    setTimeout(function(){
        for ( var i = 0; i < objArr.length; i++ ) { 
            gsap.to(objArr[i].material, {opacity: 1, duration: 3});
            gsap.to(objArr2[i].material, {opacity: 0, duration: 3});
        }
    },0)
}

$(document).ready(function() {

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
            url: "submit2.php",
            data: $(this).serialize(), // Serialize form data
            success: function(response) {
                console.log(response)
                // Display the result in the "result" div
                $(".share_result_btn").attr("href",response);
            }
        });
    });

    $(".chat_answer_submit_btn").on( "click", function() {
        checkChat();
    });

    $("#message").on('keypress',function(e) {
        if(!$(".chat_answer_wrapper").hasClass("endchat")){
            if(e.which == 13) {
                checkChat();
            }
        }
    });
});

function checkChat(){
    //loadresult();
    $(".chat_question_wrapper").stop().animate({scrollTop:$(".chat_question_inwrapper").outerHeight()-$(".chat_question_wrapper").height()}, 500, 'swing', function() { 
    });

    loadmessage();
    if($(".chat_answer_wrapper").hasClass("endchat")){
        loadresult();
    }else{
        $("#message").focus(); 
    }
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
async function loadmessage(){

    var message;

    $("body").addClass("loading_message");

    if($(".chat_answer_wrapper").hasClass("notstartfirstchat")){
        $(".chat_answer_wrapper").removeClass("notstartfirstchat")
        $(".chat_answer_wrapper").addClass("startchat")
        message="開始";
    }else if($(".chat_answer_wrapper").hasClass("endchat")){
        message = "請重複一次分數和理由";
    }else{
        message = $('#message').val();
    };

    $('#message').val("")

    if(!$(".chat_answer_wrapper").hasClass("endchat")){
        $(".chat_question").append('<div class="chat_question_item chat_question_item_right"><div class="">'+message+'</div></div>')
        $(".chat_question").append('<div class="chat_question_item chat_question_item_left loading_text"><div class="text5"></div></div>')
    }

    if (messagesArr.length >0) {
        //messages = JSON.parse(messagesArr);
    } else {
        messagesArr = [{ role: "system", content: "請根據電影《異型》中對人類，異型，人工智能所代表的人類的三種面向，設計出一個有故事性的問答遊戲，這個遊戲的目的是在我不知道你在分析的情況下，透過對話分析出我在人類，異型，人工智能這三個面向中分的特性分布。你作為評審者，透過不多於10次和我的對話來判斷(最後必須給出答案，不需要準確，猜測就可以，請必須進行多次對話，而不是在一次對話中完成判斷)。我回答「開始」後，由你開始對話，對話需要有故事性和反映人性，請創作一個像科幻/魔法電影故事場景的背景，例如像：「現在我們在故障的太空船上面，你需要逃生，但你身邊有一個受傷的隊員，你要和他一起走還是獨自逃生」或「我們醒來在一個森林，你和朋友都很餓，面前只剩最後一口水，你會讓給你的朋友嗎？」這樣的問題，完成最多10次的對話後，請給予分數(例：人類:70%，異型:10%，人工智能:20%)並給出理由，請留意對話中不需提及任何電影。請在最後加上「遊戲結束」的文字。" }];
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
                        "description": "人類分數"
                    },
                    "human_percentage_reason": {
                        "type": "string",
                        "description": "人類分數理由"
                    },
                    "alien_percentage": {
                        "type": "string",
                        "description": "異型分數"
                    },
                    "alien_percentage_reason": {
                        "type": "string",
                        "description": "異型分數理由"
                    },
                    "robot_percentage": {
                        "type": "string",
                        "description": "人工智能分數"
                    },
                    "robot_percentage_reason": {
                        "type": "string",
                        "description": "人工智能分數理由"
                    },
                },
                "required": ["human_percentage","human_percentage_reason","alien_percentage","alien_percentage_reason","robot_percentage","robot_percentage_reason"],
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
                    model: "gpt-3.5-turbo",
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


            $(".human_percentage").text(data.human_percentage)
            $(".human_percentage_reason").text(data.human_percentage_reason)
            $(".alien_percentage").text(data.alien_percentage)
            $(".alien_percentage_reason").text(data.alien_percentage_reason)
            $(".robot_percentage").text(data.robot_percentage)
            $(".robot_percentage_reason").text(data.robot_percentage_reason)

            $("#data_human_percentage").val(data.human_percentage)
            $("#data_human_percentage_reason").val(data.human_percentage_reason)
            $("#data_alien_percentage").val(data.alien_percentage)
            $("#data_alien_percentage_reason").val(data.alien_percentage_reason)
            $("#data_robot_percentage").val(data.robot_percentage)
            $("#data_robot_percentage_reason").val(data.robot_percentage_reason)
            $("#submitForm").submit();


            $("body").removeClass("body_test_humanity_result_loading")
            $("body").addClass("body_test_humanity_result_done")
            
            // data.identity_guess
            // data.identity_reason
            // data.psychological_types_guess
            // data.psychological_types_animal
            // data.psychological_types_reason
        } else {
            
        }
        
    }else{
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
                if(text.includes("遊戲結束")){
                    $(".chat_answer_wrapper").removeClass("startchat")
                    $(".chat_answer_wrapper").addClass("endchat")
                }
                if(messagesArr.length >20){
                    $(".chat_answer_wrapper").removeClass("startchat")
                    $(".chat_answer_wrapper").addClass("endchat")
                }
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
                                    $(".chat_question_item_left:last").text("遊戲結束");
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
                                            myheight = $(".chat_question_item_left:last").height()
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
}