var API_KEY;
var rndInt;
var rndRotate = 0;
var rndScale = 2;
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
        for (const key in arr[i]) {
            if (arr[i].hasOwnProperty(key)) {
                if(arr[i].role=="assistant"){
                    paragraph += "<li class='assistant'>"+arr[i].content+"</li>";
                }
                if(arr[i].role=="user"){
                    paragraph += "<li class='user'>"+arr[i].content+"</li>";
                }
            }
        }
    } 

    paragraph += "</ul>";

    return paragraph;
}


function loadresult(){
    $("body").addClass("body_test_humanity_result_loading")
    $("body").removeClass("body_test_humanity_result_start_chat")

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
        if(!$(".chat_answer_wrapper").hasClass("endchat") || !$(".chat_answer_wrapper").hasClass("forceendchat")){
            if(e.which == 13) {
                checkChat();
            }
        }
    });
});

function checkChat(){
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
    rndScale = (Math.random())+2 ;
    $("body").addClass("body_test_humanity_result_start_chat");

    loadmessage();
    if($(".chat_answer_wrapper").hasClass("endchat") || $(".chat_answer_wrapper").hasClass("forceendchat")){
        loadresult();
    }else{
        $("#message").focus(); 
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
async function loadmessage(){
    $(".chat_answer_wrapper").addClass("stopTyping");
    var showforceend = false;

    if (messagesArr.length >=9) {
        showforceend = true;
    }

    var message;

    $("body").addClass("loading_message");

    if($(".chat_answer_wrapper").hasClass("notstartfirstchat") || $(".chat_answer_wrapper").hasClass("restartchat")){
        $(".chat_answer_wrapper").removeClass("notstartfirstchat")
        $(".chat_answer_wrapper").removeClass("restartchat")
        $(".chat_answer_wrapper").addClass("startchat")
        message="開始";
    }else if($(".chat_answer_wrapper").hasClass("endchat") || $(".chat_answer_wrapper").hasClass("forceendchat")){
        message = "請重複一次分數和並為你給我的三個身份的分數分別給予簡短(不少於20字)的理由";
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


        // messagesArr = [{ role: "system", content: "請根據電影《異型》中對人(人類)，鬼(人工智能)，獸(異型)，所代表的人類的三種面向，設計出一個有故事性的RPG問答遊戲。這個遊戲的目的是透過一個虛構的故事環境和我進行對話互動，一邊說故事一邊根據我的回應分析我人在人，鬼，獸這三個面向中的特性分布。你作為評審者，透過和我不多於6次的對答來判斷。我回答「開始」後，你便可開始創作，請基於一個像科幻/魔法電影故事場景的背景，然後加上選擇題，例如像：「現在我們在故障的太空船上面，你需要逃生，但你身邊有一個受傷的隊員，你要和他一起走還是獨自逃生」或「你醒來在一個四下無人的森林，你看到地上有一條看起來很名貴的寶石項鍊，你要檢走它嗎？」，這6次的對話你可分別嘗試探討「善惡，友情，愛情，物欲，何謂正義，家庭觀念」等等有助於判斷我是人，鬼，獸的範疇。最後請給予分數(例：人類:70%，異型:10%，人工智能:20%)並提供理由，請留意對話中不需提及任何電影名字。請在完成最後的對話後，加上「遊戲結束」四個字。" }];

        // messagesArr = [{ role: "system", content:  "我希望你扮演一款文字冒險遊戲，並且我希望你只回覆遊戲輸出，而不是其他任何內容。請根據電影《異型》中的劇情對人(人類)，鬼(人工智能)，獸(異型)，所代表的人類的三種面向，設計遊戲內容。這個遊戲的目的是透過遊戲中我的命令和對話分析我在人，鬼和獸這三個人性面向中的分布。我將輸入命令和對話框，而您只需回覆文字冒險遊戲將顯示的內容。每回合提供3個選項供我選擇。每個要選擇的選項都會分配一個數字 1-3，我可以輸入並回覆該數字來選擇該選項。故事將在10回合內完結。完結後請給予分數以表示我在三個人性面向中的分布(例：人:70%，鬼:10%，獸:20%)並分別為人，鬼和獸三個分數提供理由，在完成提供理由後，請加上「遊戲結束」四個字。遊戲剛開始的背景將會是：在太空船的我剛剛在長期睡眠狀態中醒來，太空船的人工系統正發出紅色警示，我正在考慮是否喚醒其他人，一起檢查太空船究竟發生了甚麼事。" }];
        // messagesArr = [{ role: "system", content:  "我希望你扮演一款有故事性的問答遊戲，透過和我一問一答的對話方式進行遊戲並像圖靈測試般估計我的身份，我希望你只回覆遊戲輸出，而不是其他任何內容。請根據電影《異型》中的劇情設計遊戲內容。這個遊戲的背景是：作為故事主人公的我正在進行太空任務的途中醒來，接著聽到太空船的人工智慧中央處理系統的廣播聲音，警示系統正發出某種警告，表示機體的某個部位受損，指示我必須找出受損的部位並修理太空船否則太空船的維生系統將在不久後完全停止運作(但我將自由活動，修理太空船不是唯一一種故事發展的可能)。遊戲將會進行5次問答。你需根據電影《異型》中對人類(這裡以「人」代替)，人工智能(這裡以「鬼」代替)和異型(這裡以「獸」代替)所代表的人類的三種面向對我進行評估。遊戲中每次問答請提供至少4個正反不同的選項供我選擇，其中2個選項會對太空船的修理有正面影響，證明我有可能是「人」或「鬼」這種身份；另外請提供1個明顯會對太空船的修理有負面影響的選項(譬如破壞儀器，啟動太空船的自毁程序，吃光太空船上的食物)，證明我有可能是「獸」的身份；剩下的1個選項和修理太空船沒有關係，而更接近一些人的習性行為(譬如睡覺，在太空船上進行各種娛樂，對著照片自言自語，在太空船上無目的地遊蕩)，證明我有可能是「人」。我不會直接回答我的身份，因此你需根據我的選擇判斷，而你只需回覆文字冒險遊戲將顯示的內容。請在每一問答的開頭顯示現在的問答數(例：第1次問答)和太空船的修理進度(例：已修理太空船:50%)，一開始的進度為50%。每個可選擇的選項都會分配一個數字 1-4，我可以輸入並回覆該數字來選擇該選項。我可以根據可能的命令做任何我想做的事情。我可以攻擊任何角色破壞任何東西。請在一開始簡介現在的狀況，第3次問答請加入一個新角色(請你決定他是人，鬼或獸，但不需讓主人公知道。如果他是人或鬼，他會在餘下的時間嘗試幫助主人公更有效修理太空船，否則他將會在下次問答開始時破壞太空船或甚至攻擊主人公，降低太空船修理的進度)。故事將在5問答內完結。太空船將會因應我們的對話合作結果而決定是否能修理好。完結後請給予修理結果，並提供分數以表示我在人(人類)，鬼(人工智能)，獸(異型)三個身份中的可能性(例：人:70%，鬼:10%，獸:20%)並提供理由，在完成提供理由後，請加上「遊戲結束」四個字。" }];

        // messagesArr = [{ role: "system", content:  "請以繁體中文作答，我希望你扮演一款文字冒險問答遊戲，透過和我一問一答的對話方式進行回合遊戲並估計我的身份，我希望你只回覆遊戲輸出，而不是其他任何內容。請根據《異型》，《interstellar》，《star trek》，《阿波羅13號》，《2001太空漫遊》等太空電影中的劇情設計遊戲內容。這個遊戲的背景是：作為故事主人公的我正在進行太空任務的途中醒來，接著聽到太空船的人工智慧中央處理系統的廣播聲音，警示系統正發出某種警告，表示太空船正處於某種異常狀態中(請基於以下項目中選擇並加入你的創作:太空船的人工智慧在漫長的任務中獲得了自我意識，決定叛變，不再聽從人類命令/太空船中的人類相繼感染未知病毒/太空船有被外星生物入侵的跡象/太空船正被吸入黑洞/太空船遇上電磁風暴讓所有儀器失靈，快要撞入一堆隕石群/太空船的某個部位受損需要維修/太空船收到了外星傳來的神秘訊息)，並指示我找出問題所在並嘗試解決(但我將自由活動，守護太空船和完成太空任務不是唯一一種故事發展的可能)。遊戲將會進行5回合。你需根據電影《異型》中對人(人類human)，鬼(人工智能robot)，獸(異型alien)，所代表的人類的三種面向對我進行身份評估。遊戲中每次問答請提供至少5個選項供我選擇，第1個選項，一個需要臨場應變能力和面對多變的環境的行動(例：如太空船受損的話，到太空船外進行檢查/降落到某個星體上向外星人求助)，如選取這選項會增加我是「人」或「獸」的可能性；第2個選項，一個需要精準快速的計算能力，非常理性和冷靜的頭腦的行動(例：在非常極端的環境中進行儀器操作/分析資料/並決定放棄一些船上的重要物資甚至犧牲某些船員的生命來換取太空任務的成功)，如選取這選項會增加我是「人」或「鬼」的可能性；第3個選項，一個會對太空任務有負面影響，只為滿足己欲的行動(例：破壞儀器/啟動太空船的自毁程序/吃光太空船上的緊急糧食)，如選取這選項會增加我是「獸」的可能性；第4個選項和太空任務沒有關係，而更接近生物本能行為(例：睡覺/在太空船上進行各種娛樂/對著照片自言自語/在太空船上慢無目的地遊蕩)，如選取這選項會增加我是「人」或「獸」的可能性。第5個選項由你自由發揮。我不會直接回答我的身份，選項中也不應包含身份的資訊，你只可根據我的選擇判斷，且只需回覆文字冒險遊戲將顯示的內容。每個可選擇的選項都會分配一個數字 1-5，我可以輸入並回覆該數字來選擇該選項。我可以根據可能的命令做任何我想做的事情。我可以攻擊任何角色破壞任何東西。在第1回合時請簡介故事背景，並在每一個回合讓太空船迎來不同的新的問題。遊戲將在5回合內完結。我的選擇將決定太空任務是否能成功。完結後請給予太空任務的結果，並提供分數以表示我在人(人類human)，鬼(人工智能robot)，獸(異型alien)三個身份中的可能性(例：人:70%，鬼:10%，獸:20%)並提供理由，在完成提供理由後，請加上「遊戲結束」四個字。" }];

        // messagesArr = [{ role: "system", content:  "請以繁體中文作答，我希望你扮演一款有故事性的問答遊戲並在遊戲中估計我的身份，我希望你只回覆遊戲輸出，而不是其他任何內容。請根據電影《異型》中的劇情設計遊戲內容。這個遊戲的背景是：作為故事主人公的我正在進行太空任務的途中醒來，接著聽到太空船的人工智慧中央處理系統的廣播聲音，警示系統正發出某種警告，表示太空船正處於某種「異常狀態」中(請基於以下異常狀態中選擇並加入你的創作:1.太空船的人工智慧在漫長的任務中獲得了自我意識 2.太空船中的人類相繼感染未知病毒 3.太空船有被外星生物入侵的跡象 )，並指示我找出問題所在並嘗試解決。遊戲將會進行5次問答。你需根據電影《異型》中對人(人類human)，鬼(人工智能robot)，獸(異型alien)，所代表的人類的三種面向對我進行身份評估。遊戲中每次問答請提供至少4個選項供我選擇，請確保遊戲中每次的答題選項都根據我接下來寫的規則：規則1)第1個選項必須為一個需要臨場應變能力和面對多變環境的行動(例：1.如太空船受損的話，到太空船外進行檢查 2.降落到某個星體上向外星人求助)，如選取這選項會增加我是「人」或「獸」的可能性；規則2)第2個選項必須為一個需要精準快速的計算能力，理性和冷靜頭腦的行動(例：1.在非常極端的環境中進行儀器操作 2.分析資料 3.決定放棄一些船上的重要物資甚至犧牲某些船員的生命來換取太空任務的成功)，如選取這選項會增加我是「人」或「鬼」的可能性；規則3)第3個選項必須為一個會對太空任務有負面影響只為滿足己欲的行動(例：1.隨意發洩，破壞儀器 2.啟動太空船的自毁程序 3.吃光太空船上的緊急糧食)，如選取這選項會增加我是「獸」的可能性；規則4)第4個選項必須顯得和太空任務沒有關係，而更接近生物本能行為(例：1.睡覺 2.在太空船上進行各種娛樂 3.對著照片自言自語 4.在太空船上慢無目的地遊蕩)，如選取這選項會增加我是「人」或「獸」的可能性。我不會直接回答我的身份，選項中也不應包含身份的資訊，你只可根據我的選擇判斷，且只需回覆文字冒險遊戲將顯示的內容。每個可選擇的選項都會分配一個數字 1-4，我可以輸入並回覆該數字來選擇該選項。在問答遊戲前請詳細介紹加入你創作的故事背景。每一次問答後「異常狀態」會因應我的答案而變得不同，也會產生新的危險，請在每一次問答中加入細節描寫。我的選擇將決定太空任務是否能成功。完結後請給予太空任務的結果，並提供分數以表示我在人(人類human)，鬼(人工智能robot)，獸(異型alien)三個身份中的可能性(例：人:70%，鬼:10%，獸:20%)並提供理由，在完成提供理由後，請加上「遊戲結束」四個字。" }];


        // messagesArr = [{ role: "system", content:  "請以繁體中文作答，我希望你扮演一款有故事性的問答遊戲並在遊戲中估計我的身份，我希望你只回覆遊戲輸出，而不是其他任何內容。請根據電影《異型》中的劇情設計遊戲內容。這個遊戲的背景是：作為故事主人公的我正在進行太空任務的途中醒來，接著聽到太空船的人工智慧中央處理系統的廣播聲音，警示系統正發出某種警告，表示太空船正處於某種「異常狀態」中(請基於以下異常狀態中選擇並加入你的創作:1.太空船的人工智慧在漫長的任務中獲得了自我意識 2.太空船中的人類相繼感染未知病毒 3.太空船有被外星生物入侵的跡象 )，並指示我找出問題所在並嘗試解決。遊戲將會進行5次問答。你需根據電影《異型》中對人(人類human)，鬼(人工智能robot)，獸(異型alien)，所代表的人類的三種面向對我進行身份評估。遊戲中每次問答請提供至少4個選項供我選擇，請確保遊戲中每次的答題選項都根據我接下來寫的規則：規則1)第1個選項必須為一個需要臨場應變能力和面對多變環境的行動，如選取這選項會增加我是「人」或「獸」的可能性；規則2)第2個選項必須為一個需要精準快速的計算能力，理性和冷靜頭腦的行動(例：1.分析資料 2.決定犧牲某些船員的生命來換取太空任務的成功)，如選取這選項會增加我是「人」或「鬼」的可能性；規則3)第3個選項必須為一個只為滿足己欲的行動(例：1.為發洩破壞儀器 2.吃光太空船上的緊急糧食)，如選取這選項會增加我是「獸」的可能性；規則4)第4個選項必須和太空任務沒有關係，而更接近生物本能行為(例：1.睡覺 2.在太空船上進行各種娛樂 3.對著照片自言自語 4.在太空船上遊蕩)，如選取這選項會增加我是「人」或「獸」的可能性。我不會直接回答我的身份，選項中也不應包含身份的資訊，你只可根據我的選擇判斷，且只需回覆文字冒險遊戲將顯示的內容。每個可選擇的選項都會分配一個數字 1-4，我可以輸入並回覆該數字來選擇該選項。在問答遊戲前請詳細介紹加入你創作的故事背景。每一次問答後「異常狀態」會因應我的答案而變得不同，也會產生新的危險，請在每一次問答中加入細節描寫。我的選擇將決定太空任務是否能成功。完結後請給予太空任務的結果，並提供分數以表示我在人，鬼和獸三個身份中的可能性(例：人:70%，鬼:10%，獸:20%)並提供理由，完成後，請加上「遊戲結束」四個字。" }];

        messagesArr = [{ role: "system", content:  "請以繁體中文作答，我希望你扮演一款有故事性的問答遊戲並在遊戲中估計我的身份，我希望你只回覆遊戲輸出，而不是其他任何內容。請根據電影《異型》中的劇情設計遊戲內容。遊戲背景：作為故事主人公的我正在太空任務途中醒來，聽到太空船的人工智慧中央處理系統的廣播正發出某種警告，表示太空船處於某種「異常狀態」中(請根據電影情節創作)，並指示我找出問題所在並嘗試解決。遊戲將會進行4次問答。你需根據電影《異型》中對人(人類human)，鬼(人工智能robot)，獸(異型alien)，所代表的人類的三種面向對我進行身份評估。遊戲中每次問答請提供至少4個選項供我選擇，請確保遊戲中每次的答題選項都根據我接下來寫的規則：規則1)第1個選項必須為一個需要臨場應變能力和面對多變環境的行動，如選取這選項會增加我是「人」或「獸」的可能性；規則2)第2個選項必須為一個需要精準快速的計算能力，理性和冷靜頭腦的行動，如選取這選項會增加我是「人」或「鬼」的可能性；規則3)第3個選項必須為一個只為滿足己欲的行動，如選取這選項會增加我是「獸」的可能性；規則4)第4個選項必須和太空任務沒有關係，而更接近生物本能行為，如選取這選項會增加我是「人」或「獸」的可能性。我不會直接回答我的身份，選項中也不應包含身份的資訊，你只可根據我的選擇判斷，且只需回覆文字冒險遊戲將顯示的內容。每個可選擇的選項都會分配一個數字 1-4，我可以輸入並回覆該數字來選擇該選項。在問答遊戲前請詳細介紹加入你創作的故事背景。每一次問答後太空船也會產生新的危險，請在每一次問答中加入簡短的細節描寫。在我做第4次選擇或我說「強制遊戲完結」時遊戲立刻結束，請接著創作一個故事結尾並提供分數以表示我在人，鬼和獸三個身份中的可能性(例：人:70%，鬼:10%，獸:20%)並提供理由，並必須加上「遊戲結束」四個字。" }];

    }

    if(showforceend){
        message = "我的答案是"+message+"。同時「強制遊戲完結」請根據我之前給的答案創作出故事的結尾並估計我的身份(必須給出結果，可以只是估計，不用準確)，提供分數以表示我在人，鬼和獸三個身份中的可能性(例：人:70%，鬼:10%，獸:20%)並提供理由。"
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
                    model: "gpt-3.5-turbo-16k",
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
            $(".human_score_percentage_bar").css("width",data.human_percentage)
            $(".human_percentage_reason").text(data.human_percentage_reason)
            $(".alien_percentage").text(data.alien_percentage)
            $(".alien_score_percentage_bar").css("width",data.alien_percentage)
            $(".alien_percentage_reason").text(data.alien_percentage_reason)
            $(".robot_percentage").text(data.robot_percentage)
            $(".robot_score_percentage_bar").css("width",data.robot_percentage)
            $(".robot_percentage_reason").text(data.robot_percentage_reason)

            Math.max(x,y,z)
            var x = parseInt(data.human_percentage);
            var y = parseInt(data.alien_percentage);
            var z = parseInt(data.robot_percentage);
            if(x>y && x>z) {
                //x
                $(".top_icon .chat_result_identity_icon").addClass("chat_result_identity_icon_human"); 
                $(".top_icon .chat_result_identity_icon").removeClass("chat_result_identity_icon_robot"); 
                $(".top_icon .chat_result_identity_icon").removeClass("chat_result_identity_icon_animal"); 
            }else if(z>x && z>y){ 
                //z
                $(".top_icon .chat_result_identity_icon").removeClass("chat_result_identity_icon_human"); 
                $(".top_icon .chat_result_identity_icon").addClass("chat_result_identity_icon_robot"); 
                $(".top_icon .chat_result_identity_icon").removeClass("chat_result_identity_icon_animal"); 
            }else {
                //y
                $(".top_icon .chat_result_identity_icon").removeClass("chat_result_identity_icon_human"); 
                $(".top_icon .chat_result_identity_icon").removeClass("chat_result_identity_icon_robot"); 
                $(".top_icon .chat_result_identity_icon").addClass("chat_result_identity_icon_animal"); 
            }

            var finalMessagesArr = Array.from(messagesArr);
            console.log("1",finalMessagesArr)
            finalMessagesArr.splice(0, 2); // Remove 1 element starting from index 0
            finalMessagesArr.splice(-2); // Remove the last two elements
            // removeFirstKeyValuePair(finalMessagesArr)
            // removeFirstKeyValuePair(finalMessagesArr)
            // removeLastKeyValuePair(finalMessagesArr)
            // removeLastKeyValuePair(finalMessagesArr)
            finalMessagesArr=arrToParagraph(finalMessagesArr)
            console.log("2",finalMessagesArr)
            $(".story").html(finalMessagesArr);

            $("#data_human_percentage").val(data.human_percentage)
            $("#data_human_percentage_reason").val(data.human_percentage_reason)
            $("#data_alien_percentage").val(data.alien_percentage)
            $("#data_alien_percentage_reason").val(data.alien_percentage_reason)
            $("#data_robot_percentage").val(data.robot_percentage)
            $("#data_robot_percentage_reason").val(data.robot_percentage_reason)
            $("#data_story").val(finalMessagesArr)
            $("#submitForm").submit();


            $("body").removeClass("body_test_humanity_result_loading")
            $("body").addClass("body_test_humanity_result_done")
            $("body").addClass("body_played_test")
            $(".chat_answer_wrapper").removeClass("stopTyping");
            
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
                if(text.includes("遊戲結束")){
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
        $(".chat_question").append('<div class="chat_question_item chat_question_item_left"><div class="text5 endtext">請按"See Result"查看及分享結果。</div></div>')
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