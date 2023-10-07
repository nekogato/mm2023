function loadresult(){
    $("body").addClass("body_test_humanity_result_loading")
    setTimeout(function(){
        for ( var i = 0; i < objArr.length; i++ ) { 
            gsap.to(objArr[i].material, {opacity: 1, duration: 3});
            gsap.to(objArr2[i].material, {opacity: 0, duration: 3});
        }
    },3000)
    setTimeout(function(){
        $("body").removeClass("body_test_humanity_result_loading")
        $("body").addClass("body_test_humanity_result_done")
    },9000)
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
});

function checkCheck(){
    loadmessage();
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

const API_KEY = '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';

var obj = {};

async function loadmessage(){
    $("body").addClass("loading_message");
    let message = $('#message').val();
    $('#message').val("")

    $(".chat_question").append('<div class="chat_question_item chat_question_item_right"><div class="">'+message+'</div></div>')
    $(".chat_question").append('<div class="chat_question_item chat_question_item_left"><div class="text5"></div></div>')
    let messages = sessionStorage.getItem("bot-message");

    if (messages == null) {
      messages = [{ role: "system", content: "現在我們來開始一個類似圖靈測試的遊戲，這個遊戲的目的是分析對方是 人類 / 動物 / 機器，你作為評審者，透過5次問答來判斷我是 人類 / 動物 / 機器(必須給出答案，不需要準確，猜測就可以)。我回答「開始」後，由你開始問問題，請不要回答遊戲以外的東西。完成5次問答和身份判定後，請在最後加上「謝謝你的參與。」以完結遊戲。" }];
    } else {
      messages = JSON.parse(messages);
    }
    messages.push({ role: "user", content: message });
    
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
            messages: messages,
            stream: true,
          }),
        }
      );
  
      const reader = es.body?.pipeThrough(new TextDecoderStream()).getReader();
  
      while (true) {
        const res = await reader?.read();
        if (res?.done) {
          let text = $(".chat_question_item_left:last").text();
          messages.push({ role: "assistant", content: text });
          sessionStorage.setItem("bot-message",JSON.stringify(messages));
          $("body").removeClass("loading_message");
          if(text.includes("謝謝你的參與")){
            loadresult();
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
            if(data.choices[0].delta.finish_reason != 'stop')
            {
              let text = data.choices[0].delta.content;
              if(text){  
                let i=0;
                while (i < text.length) {
                  $(".chat_question_item_left:last")[0].innerHTML += text.charAt(i);
                  i++;                    
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