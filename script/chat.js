const API_KEY = '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';
var rndInt;
var rndRotate = 0;
var rndScale = 2;

function loadresult(){
    $("body").addClass("body_test_humanity_result_loading")
    setTimeout(function(){
        for ( var i = 0; i < objArr.length; i++ ) { 
            gsap.to(objArr[i].material, {opacity: 1, duration: 3});
            gsap.to(objArr2[i].material, {opacity: 0, duration: 3});
        }
    },0)
    setTimeout(function(){
        $("body").removeClass("body_test_humanity_result_loading")
        $("body").addClass("body_test_humanity_result_done")
    },1000)
}

$(document).ready(function() {

    // Handle form submission using AJAX
    $("#submitForm").submit(function(e) {
        e.preventDefault(); // Prevent the default form submission

        $.ajax({
            type: "POST",
            url: "submit.php",
            data: $(this).serialize(), // Serialize form data
            success: function(response) {
                // Display the result in the "result" div
                $("#result").html(response);
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
    loadresult();
    // $(".chat_question_wrapper").stop().animate({scrollTop:$(".chat_question_inwrapper").outerHeight()-$(".chat_question_wrapper").height()}, 500, 'swing', function() { 
    // });

    // loadmessage();
    // if($(".chat_answer_wrapper").hasClass("endchat")){
    //     loadresult();
    // }else{
    //     $("#message").focus(); 
    // }
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
        message = "請再次顯示更詳細的「結果」";
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
        messagesArr = [{ role: "system", content: "現在我們來開始一個融合圖靈測試和榮格心理類型(Psychological Types)理論的問題遊戲，這個遊戲的目的是1)分析我是人類或機器，2)跟據榮格心理類型理論嘗試分類我的心理類型。你作為評審者，透過不多於10次和我的對話來判斷(最後必須給出答案，不需要準確，猜測就可以)。我回答「開始」後，由你開始對話，你可以經由日常閒聊/IQ題等等諸如此類的方式自由進行提問(對話盡量日常，不要太學術)，你須假設我不知道你的目的並引導我完成測試。完成最多10次的對話後，請給予「結果」，判定我的身份和心理類型(請用一種動物來代表這種心理類型)，給予「結果」後，遊戲就會結束，請在最後加上「遊戲結束」的文字。" }];
    }
    messagesArr.push({ role: "user", content: message });
    console.log(messagesArr)

    var myfunctions = [
        {
            "name": "write_result",
            "description": "顯示判定的身份和心理類型的結果",
            "parameters": {
                "type": "object",
                "properties": {
                    "identity_guess": {
                        "type": "string",
                        "description": "身份判定"
                    },
                    "identity_reason": {
                        "type": "string",
                        "description": "判定身份的原因"
                    },
                    "psychological_types_guess": {
                        "type": "string",
                        "description": "心理類型判定"
                    },
                    "psychological_types_animal": {
                        "type": "string",
                        "description": "請用一種動物來代表這種心理類型"
                    },
                    "psychological_types_reason": {
                        "type": "string",
                        "description": "判定心理類型的原因"
                    }
                },
                "required": ["identity_guess","identity_reason","psychological_types_guess","psychological_types_animal","psychological_types_reason"],
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
            let data = JSON.parse(es.choices[0].message.arguments);
            console.log(data)
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
            console.log(text, text.includes("遊戲結束"))
            if(text.includes("遊戲結束")){
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