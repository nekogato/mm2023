var camera, scene, renderer,composer, letter1, letter2, letter3, mouseX, mouseY, windowHalfX, windowHalfY, biggroup, movegroup, logogroup;
var controls, raycaster, pointer;
var objArr=[];
var objArr2=[];
var allArr=[];
var randomObjArr=[];
var letter1_rotate,letter2_button, letter2_tri, letter3_bigbtn, letter3_sidebtn, letter3_smallbtn1, letter3_smallbtn2, letter3_smallbtn3, letter3_smallbtn4;
var hoverLetter = "";
var activeLetter = "";
var startletter1_animation, startletter2_animation, startletter3_animation;
var changecolor = false;
const GLTFLoader = new THREE.GLTFLoader();
const dracoLoader = new THREE.DRACOLoader();
dracoLoader.setDecoderPath( 'script/lib/draco/' );
GLTFLoader.setDRACOLoader( dracoLoader );
var breakmodel=false;

var addElement2 = function ( myid,groupid,group, src, x, y, z,cubeTexture, roughnessTexture ) {


    const GLTFLoader = new THREE.GLTFLoader();
    GLTFLoader.setDRACOLoader( dracoLoader );

    

    GLTFLoader.load(src, function ( gltf ) {
        gltf.scene.scale.set( 10, 10, 10 );
        gltf.scene.position.set( x, y, z );

        const content = gltf.scene;
	
        //get all children inside gltf file
        content.traverse( function ( child ) {
            //get the meshes
            if ( child.isMesh ) {
                // only replace texture if a texture map exist
                child.material.color.setHex( 0xef5a24 );
                child.material.transparent=true;
                if($("body").hasClass("body_user_guide")){
                    child.visible=false;
                }else{
                    child.visible=true;
                }
                if($.cookie('played')){
                    child.visible = false;
                    child.material.opacity=0;
                }else{
                    child.material.opacity=1;
                }
                if($(".chat_answer_wrapper").hasClass("startchat") || $(".chat_answer_wrapper").hasClass("restartchat")){
                    objArr2[i].visible = false;
                }

                if (child.material.map){
                    child.material.map = "";
                //replace the map with another THREE texture
                child.material.envMap = cubeTexture;
                child.material.roughnessMap = roughnessTexture;
                child.material.metalness = 0.1;
                child.material.roughness = 0.3;

                //update
                child.material.envMap.needsUpdate = true;
                child.material.envMap.roughnessMap = true;
                child.material.envMap.metalness = true;
                child.material.envMap.roughness = true;
                }
                child.groupid = groupid;

                objArr2.push(child)
            }
        });
        if(myid){
            window[myid]=gltf.scene;
        }
        group.add(gltf.scene)
  
    } );

};
var addElement = function ( myid,groupid,group, src, x, y, z,cubeTexture, roughnessTexture ) {

    const GLTFLoader = new THREE.GLTFLoader();
    GLTFLoader.setDRACOLoader( dracoLoader );

    GLTFLoader.load(src, function ( gltf ) {
        gltf.scene.scale.set( 10, 10, 10 );
        gltf.scene.position.set( x, y, z );

        const content = gltf.scene;
	
        //get all children inside gltf file
        content.traverse( function ( child ) {
            //get the meshes
            if ( child.isMesh ) {
                // only replace texture if a texture map exist
                child.material.transparent=true;
                
                if($.cookie('played')){
                    child.material.opacity=1;
                }else{
                    child.material.opacity=0;
                }
                if(!$("body").hasClass("body_user_guide")){
                    child.visible=true;
                }else{
                    child.visible=false;
                }
                if (child.material.map){
                //replace the map with another THREE texture
                child.material.envMap = cubeTexture;
                child.material.roughnessMap = roughnessTexture;
                child.material.metalness = 0.1;
                child.material.roughness = 0.3;
                //child.material.map = "";

                //update
                child.material.envMap.needsUpdate = true;
                child.material.envMap.roughnessMap = true;
                child.material.envMap.metalness = true;
                child.material.envMap.roughness = true;
                }
                child.groupid = groupid;

                objArr.push(child)
            }
        });
        if(myid){
            window[myid]=gltf.scene;
        }
        group.add(gltf.scene)
        allArr.push(gltf.scene)
        var obj ={
            x:5-Math.random()*10,
            y:5-Math.random()*10,
            z:5-Math.random()*10,
            x2:5-Math.random()*10,
            y2:5-Math.random()*10,
            z2:5-Math.random()*10,
            x3:5-Math.random()*10,
            y3:5-Math.random()*10,
            z3:5-Math.random()*10,
            original_x:x,
            original_y:y,
            original_z:z,
        }
        randomObjArr.push(obj)
  
    } );

};

init();
animate();

function init() {

	raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

	var container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 20000 );
  	camera.position.set( 0, 0, 25 );


	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );
    scene.fog = new THREE.Fog(0x000000, 25, 50);        // 0xc8c8c8


	// Add ambient light to illuminate the entire scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Add directional light for more realistic shading
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-0.2, 0.1, 0.5); // Adjust light direction
    scene.add(directionalLight);

    // Add directional light for more realistic shading
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight2.position.set(1, 0.1, 1); // Adjust light direction
    scene.add(directionalLight2);

    // Add directional light for more realistic shading
    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight3.position.set(0, 1, -1); // Adjust light direction
    scene.add(directionalLight3);


	window.addEventListener( 'resize', onWindowResize, false );

	// Block iframe events when dragging camera

	var blocker = document.getElementById( 'blocker' );
	blocker.style.display = 'none';


	renderer = new THREE.WebGLRenderer(  );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'fixed';
	renderer.domElement.style.top = 0;
	document.body.appendChild( renderer.domElement );
	controls = new THREE.TrackballControls( camera, renderer.domElement );

	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.05;

	// controls.screenSpacePanning = false;
	// controls.enableZoom = false;
	// controls.enablePan = false;
	// controls.enableRotate = false;


	controls.maxPolarAngle = Math.PI / 2;


	// Load the cube map images
    const cubeTexture = new THREE.CubeTextureLoader()
    .setPath('images/textures/') // Replace with the path to your cube texture images
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
    cubeTexture.encoding = THREE.sRGBEncoding;
  
	const normalTexture = new THREE.TextureLoader().load('images/textures/TexturesCom_Paint_Hammerite_512_normal.jpg');
    normalTexture.wrapT = THREE.RepeatWrapping;
    normalTexture.wrapS = THREE.RepeatWrapping;
    normalTexture.repeat.set(20, 10);

	const roughnessTexture = new THREE.TextureLoader().load('images/textures/TexturesCom_Metal_AluminumBrushed_1K_roughness.jpg');
    roughnessTexture.wrapT = THREE.RepeatWrapping;
    roughnessTexture.wrapS = THREE.RepeatWrapping;
    roughnessTexture.repeat.set(5, 10);

	const topTexture = new THREE.TextureLoader().load('images/model-outline-002.png');
	topTexture.minFilter = THREE.NearestFilter;
	topTexture.magFilter = THREE.NearestFilter;

	letter1 = new THREE.Group();
	letter2 = new THREE.Group();
	letter3 = new THREE.Group();

    scene.add(letter1)
    scene.add(letter2)
    scene.add(letter3)



    addElement2( "","letter1",letter1,'asset/4/ok.gltf', 1.25, 0, 0.18, cubeTexture, roughnessTexture )
    addElement2( "","letter1",letter1,'asset/5/ok.gltf', -1.25, 0, -0.18, cubeTexture, roughnessTexture )
    addElement2( "","letter1",letter1,'asset/2/ok.gltf', 0.57, 0.55, 0.4, cubeTexture, roughnessTexture )
    addElement2( "","letter1",letter1,'asset/3/ok.gltf', 0.3, 1.25, 0.45, cubeTexture, roughnessTexture )
    addElement2( "letter1_rotate","letter1",letter1,'asset/1/ok.gltf', 1.75, -0.75, 0.2, cubeTexture, roughnessTexture )



    addElement2( "","letter2",letter2,'asset/20/ok.gltf', 0, 0.75, 0.2, cubeTexture, roughnessTexture )
    addElement2( "","letter2",letter2,'asset/21/ok.gltf', 0, -1.05, -0.2, cubeTexture, roughnessTexture )
    addElement2( "","letter2",letter2,'asset/19/ok.gltf', 0, 0.10, 0.35, cubeTexture, roughnessTexture )
    addElement2( "letter2_button","letter2",letter2,'asset/18/ok.gltf', 0, 2.3, 0.2, cubeTexture, roughnessTexture )
    addElement2( "letter2_tri","letter2",letter2,'asset/17/ok.gltf', 0, 0.45, 0.5, cubeTexture, roughnessTexture )


    addElement2( "","letter3",letter3,'asset/12/ok.gltf', -1.25, 0.25, 0.4, cubeTexture, roughnessTexture )
    addElement2( "","letter3",letter3,'asset/14/ok.gltf', -1.25, 0, 0.2, cubeTexture, roughnessTexture )
    addElement2( "","letter3",letter3,'asset/13/ok.gltf', -1.25, -1.35, 0.36, cubeTexture, roughnessTexture )
    addElement2( "","letter3",letter3,'asset/16/ok.gltf', 1.25, 0, -0.2, cubeTexture, roughnessTexture )
    addElement2( "","letter3",letter3,'asset/11/ok.gltf', 1.75, 0.75, 0.1, cubeTexture, roughnessTexture )
    addElement2( "letter3_bigbtn","letter3",letter3,'asset/10/ok.gltf', -2.2, 0.45, 0.6, cubeTexture, roughnessTexture )
    addElement2( "letter3_sidebtn","letter3",letter3,'asset/15/ok.gltf', -0.2, 1.7, 0.2, cubeTexture, roughnessTexture )
    addElement2( "letter3_smallbtn1","letter3",letter3,'asset/9/ok.gltf', -1.715, -0.3, 0.55, cubeTexture, roughnessTexture )
    addElement2( "letter3_smallbtn2","letter3",letter3,'asset/9/ok.gltf', -1.411, -0.3, 0.55, cubeTexture, roughnessTexture )
    addElement2( "letter3_smallbtn3","letter3",letter3,'asset/9/ok.gltf', -1.107, -0.3, 0.55, cubeTexture, roughnessTexture )
    addElement2( "letter3_smallbtn4","letter3",letter3,'asset/9/ok.gltf', -0.793, -0.3, 0.55, cubeTexture, roughnessTexture )


  

    addElement( "","letter1",letter1,'asset/4/ok.gltf', 1.25, 0, 0.18, cubeTexture, roughnessTexture )
    addElement( "","letter1",letter1,'asset/5/ok.gltf', -1.25, 0, -0.18, cubeTexture, roughnessTexture )
    addElement( "","letter1",letter1,'asset/2/ok.gltf', 0.57, 0.55, 0.4, cubeTexture, roughnessTexture )
    addElement( "","letter1",letter1,'asset/3/ok.gltf', 0.3, 1.25, 0.45, cubeTexture, roughnessTexture )
    addElement( "letter1_rotate","letter1",letter1,'asset/1/ok.gltf', 1.75, -0.75, 0.2, cubeTexture, roughnessTexture )



    addElement( "","letter2",letter2,'asset/20/ok.gltf', 0, 0.75, 0.2, cubeTexture, roughnessTexture )
    addElement( "","letter2",letter2,'asset/21/ok.gltf', 0, -1.05, -0.2, cubeTexture, roughnessTexture )
    addElement( "","letter2",letter2,'asset/19/ok.gltf', 0, 0.10, 0.35, cubeTexture, roughnessTexture )
    addElement( "letter2_button","letter2",letter2,'asset/18/ok.gltf', 0, 2.3, 0.2, cubeTexture, roughnessTexture )
    addElement( "letter2_tri","letter2",letter2,'asset/17/ok.gltf', 0, 0.45, 0.5, cubeTexture, roughnessTexture )


    addElement( "","letter3",letter3,'asset/12/ok.gltf', -1.25, 0.25, 0.4, cubeTexture, roughnessTexture )
    addElement( "","letter3",letter3,'asset/14/ok.gltf', -1.25, 0, 0.2, cubeTexture, roughnessTexture )
    addElement( "","letter3",letter3,'asset/13/ok.gltf', -1.25, -1.35, 0.36, cubeTexture, roughnessTexture )
    addElement( "","letter3",letter3,'asset/16/ok.gltf', 1.25, 0, -0.2, cubeTexture, roughnessTexture )
    addElement( "","letter3",letter3,'asset/11/ok.gltf', 1.75, 0.75, 0.1, cubeTexture, roughnessTexture )
    addElement( "letter3_bigbtn","letter3",letter3,'asset/10/ok.gltf', -2.2, 0.45, 0.6, cubeTexture, roughnessTexture )
    addElement( "letter3_sidebtn","letter3",letter3,'asset/15/ok.gltf', -0.2, 1.7, 0.2, cubeTexture, roughnessTexture )
    addElement( "letter3_smallbtn1","letter3",letter3,'asset/9/ok.gltf', -1.715, -0.3, 0.55, cubeTexture, roughnessTexture )
    addElement( "letter3_smallbtn2","letter3",letter3,'asset/9/ok.gltf', -1.411, -0.3, 0.55, cubeTexture, roughnessTexture )
    addElement( "letter3_smallbtn3","letter3",letter3,'asset/9/ok.gltf', -1.107, -0.3, 0.55, cubeTexture, roughnessTexture )
    addElement( "letter3_smallbtn4","letter3",letter3,'asset/9/ok.gltf', -0.793, -0.3, 0.55, cubeTexture, roughnessTexture )


    letter1.position.set( -6, -1, 0 );
	letter1.rotation.y = 2 * Math.PI * (30 / 360);
    letter2.position.set( 0, -1, 0 );
	letter2.rotation.y = 2 * Math.PI * (30 / 360);
    letter3.position.set( 6, -1, 0 );
	letter3.rotation.y = 2 * Math.PI * (30 / 360);

    

    // const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
    // const material = new THREE.MeshStandardMaterial( {
    //   color: 0x870098
    // } ); 
    // const cube = new THREE.Mesh( geometry, material ); 
    // scene.add( cube );



	mouseX = 0;
	mouseY = 0;
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	onWindowResize();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );


    $(".test_humanity_btn").on( "click", function() {
        if(!$("body").hasClass("body_played_test")){
            $(".chat_answer_wrapper").addClass("stopTyping");
            $(".start_typing:last").scrambler({
                effect: "typing",
                final_text: $(".start_typing:last").text(),
                speed: 10,
                reveal: 10,
                onFinish: function(){
                    $(".chat_answer_wrapper").removeClass("stopTyping");
                }
            });
        }

        $("body").addClass("body_test_humanity")
        if(objArr.length>0){
            for ( var i = 0; i < objArr.length; i++ ) { 
                objArr[i].visible = true;
            }
        }
        if(objArr2.length>0){
            for ( var i = 0; i < objArr2.length; i++ ) { 
                if($.cookie('played')){

                }else{
                    if(!$(".chat_answer_wrapper").hasClass("startchat") && !$(".chat_answer_wrapper").hasClass("restartchat")){
                        objArr2[i].visible = true;
                    }
                }
            }
        }
        do_pushstate("?id=HumanityTest");
    });

    $(".user_guide_btn").on( "click", function() {
        var myid = $(".book_wrapper:visible:last").attr("data-id")
        do_pushstate("?id="+myid);
        $("body").addClass("body_user_guide")
        if(objArr.length>0){
            for ( var i = 0; i < objArr.length; i++ ) { 
                objArr[i].visible = false;
            }
        }
        if(objArr2.length>0){
            for ( var i = 0; i < objArr2.length; i++ ) { 
                objArr2[i].visible = false;
            }
        }
    });

    

    $(".leave_chat_btn").on( "click", function() {
        $("body").removeClass("body_test_humanity")
        $("body").removeClass("body_test_humanity_result_loading")
        $("body").removeClass("body_test_humanity_result_done")
        $(".chat_result_identity_icon").removeClass("show")
        do_pushstate("?id=Home");
    });

    $(".leave_chat_result_btn").on( "click", function() {
        $("body").removeClass("body_test_humanity_result_loading")
        $("body").removeClass("body_test_humanity_result_done")
        $(".chat_result_identity_icon").removeClass("show")
        $(".chat_answer_wrapper").removeClass("endchat")
        $(".chat_answer_wrapper").removeClass("forceendchat")

        $("body").removeClass("orange_bg")
        $("body").removeClass("black_bg")
        $("body").removeClass("silver_bg")
        
        $(".chat_answer_wrapper").addClass("restartchat")
        if(currentlang=="en"){
            $(".chat_question").append('<div class="chat_question_item chat_question_item_system"><div  class="text5 start_typing">Press "Start Again" to restart.</div></div>')
        }else{
            $(".chat_question").append('<div class="chat_question_item chat_question_item_system"><div  class="text5 start_typing">請按Start Again重新開始</div></div>')
        }
        

        $(".start_typing:last").scrambler({
            effect: "typing",
            final_text: $(".start_typing:last").text(),
            speed: 50,
            reveal: 50
        });
        do_pushstate("?id=Home");
        messagesArr=[];
    });

    $(".leave_user_guide_btn").on( "click", function() {
        $("body").removeClass("body_user_guide")
        if(objArr.length>0){
            for ( var i = 0; i < objArr.length; i++ ) { 
                objArr[i].visible = true;
            }
        }
        if(objArr2.length>0){
            for ( var i = 0; i < objArr2.length; i++ ) { 
                if($.cookie('played')){

                }else{
                    if(!$(".chat_answer_wrapper").hasClass("startchat") && !$(".chat_answer_wrapper").hasClass("restartchat")){
                        objArr2[i].visible = true;
                    }
                }
            }
        }
        do_pushstate("?id=Home");
    });


}


var timer;

function startAnalysing(){
    clearTimeout(timer);

    $("body").addClass("startAnalysing")

    $(".random_text .col").each(function(){
        myScrambledWriter($(this));
    })

    timer = setTimeout(function(){
        $("body").removeClass("startAnalysing")
        $("body").addClass("finishAnalysing")
        $(".home_status").scrambler({
            effect: "typing",
            final_text: "DONE! PLEASE VIEW YOUR RESULT.",
            speed: 50,
            reveal: 50
        });
        // $("body").removeClass("hasActiveLetter")
        // activeLetter="";
    },3000)
}

var timer2;

function myScrambledWriter($div){
    clearTimeout(timer2);
    var srcText = $(".source").html();
    var i = 0;
    var result = srcText[i];
    timer2 = setInterval(function() {
        if(i == srcText.length) {
            clearInterval(this);
            return;
        };
        i++;
        if(srcText[i]){
            result += srcText[i].replace("\n", "<br />");
            $div.html( result+"_");
            $div.scrollTop(99999)
        }
    },
    0); // the period between every character and next one, in milliseonds.
}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );	

}

function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;


    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1; 
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 

    trackmouse();
}

function trackmouse(){
    raycaster.setFromCamera( pointer, camera ); 
    const intersects = raycaster.intersectObjects( objArr );

    if (intersects.length > 0) {
        for ( var i = 0; i < intersects.length; i++ ) { 
            if(intersects[ i ].object.groupid == "letter1"){
                hoverLetter = "letter1"
                // t2.pause();
                // t3.pause();
                // startletter2_animation=false;
                // startletter3_animation=false;
            }
            if(intersects[ i ].object.groupid == "letter2"){
                hoverLetter = "letter2"
                // tl.pause();
                // t3.pause();
                // startletter1_animation=false;
                // startletter3_animation=false;
            }
            if(intersects[ i ].object.groupid == "letter3"){
                hoverLetter = "letter3"
                // tl.pause();
                // t2.pause();
                // startletter1_animation=false;
                // startletter2_animation=false;
            }
            //intersects[ i ].object.material.color.set( 0xff0000 ); 
        }
        //$("body").addClass("ishover")
    }else{
        //$("body").removeClass("ishover")
        hoverLetter = "";
    }

}

var startletter1_timer;
var startletter2_timer;
var startletter3_timer;
var t1 = gsap.timeline();
var t2 = gsap.timeline();
var t3 = gsap.timeline();

function doletter1animation(){
    if(!startletter1_animation){
        if(letter1_rotate){
            clearTimeout(startletter1_timer);
            startletter1_animation=true;
            t1.clear();
            t1.to(letter1_rotate.rotation, {z: 2, duration: 1});
            t1.to(letter1_rotate.rotation, {z: -4, duration: 1});
            t1.to(letter1_rotate.rotation, {z: -2, duration: 1});
            t1.to(letter1_rotate.rotation, {z: 4, duration: 1});
            t1.to(letter1_rotate.rotation, {z: 2, duration: 1});
            t1.to(letter1_rotate.rotation, {z: 0, duration: 1});
            t1.play();
            startletter1_timer = setTimeout(function(){
                startletter1_animation=false;
                doletter1animation();
            },6000)
        }
    }
}

function doletter2animation(){
    if(!startletter2_animation ){
        if(letter2_tri && letter2_button){
            clearTimeout(startletter2_timer);
            startletter2_animation=true;
            t2.clear();
            t2.to(letter2_button.position, {y: 2.15, duration: 1});
            t2.to(letter2_tri.position, {x: -0.5, duration: 1}, "<");
            t2.to(letter2_tri.position, {x: -0.2, duration: 1});
            t2.to(letter2_tri.position, {x: 1, duration: 1});
            t2.to(letter2_tri.position, {x: -0.8, duration: 1});
            t2.to(letter2_tri.position, {x: 0, duration: 1});
            t2.to(letter2_button.position, {y: 2.3, duration: 1});
            t2.play();
            startletter2_timer = setTimeout(function(){
                startletter2_animation=false;
                doletter2animation();
            },6000)
        }
    }
}

function doletter3animation(){
    if(!startletter3_animation){
        if(letter3_bigbtn && letter3_sidebtn && letter3_smallbtn1 && letter3_smallbtn2 && letter3_smallbtn3 && letter3_smallbtn4){
            clearTimeout(startletter3_timer);
            startletter3_animation=true;
            t3.clear();
            t3.to(letter3_bigbtn.rotation, {z: -4, duration: 1});
            t3.to(letter3_smallbtn1.position, {y: -0.5, duration: 1}, "<");
            t3.to(letter3_smallbtn2.position, {y: -0.55, duration: 1}, "<");
            t3.to(letter3_smallbtn3.position, {y: -0.3, duration: 1}, "<");
            t3.to(letter3_smallbtn4.position, {y: -0.25, duration: 1}, "<");
            t3.to(letter3_bigbtn.rotation, {z: 0, duration: 1});
            t3.to(letter3_sidebtn.rotation, {z: 2, duration: 1}, "<");
            t3.to(letter3_smallbtn1.position, {y: -0.3, duration: 1}, "<");
            t3.to(letter3_smallbtn2.position, {y: -0.15, duration: 1}, "<");
            t3.to(letter3_smallbtn3.position, {y: -0.4, duration: 1}, "<");
            t3.to(letter3_smallbtn4.position, {y: -0.25, duration: 1}, "<");
            t3.to(letter3_sidebtn.rotation, {z: 5, duration: 1}, "<");
            t3.to(letter3_bigbtn.rotation, {z: 2, duration: 1});
            t3.to(letter3_smallbtn1.position, {y: -0.1, duration: 1}, "<");
            t3.to(letter3_smallbtn2.position, {y: -0.35, duration: 1}, "<");
            t3.to(letter3_smallbtn3.position, {y: -0.2, duration: 1}, "<");
            t3.to(letter3_smallbtn4.position, {y: -0.45, duration: 1}, "<");
            t3.to(letter3_sidebtn.rotation, {z: 0, duration: 1}, "<");
            t3.to(letter3_bigbtn.rotation, {z: 6, duration: 1});
            t3.to(letter3_smallbtn1.position, {y: -0.3, duration: 1}, "<");
            t3.to(letter3_smallbtn2.position, {y: -0.45, duration: 1}, "<");
            t3.to(letter3_smallbtn3.position, {y: -0.3, duration: 1}, "<");
            t3.to(letter3_smallbtn4.position, {y: -0.35, duration: 1}, "<");
            t3.to(letter3_bigbtn.rotation, {z: -4, duration: 1});
            t3.to(letter3_smallbtn1.position, {y: -0.5, duration: 1}, "<");
            t3.to(letter3_smallbtn2.position, {y: -0.55, duration: 1}, "<");
            t3.to(letter3_smallbtn3.position, {y: -0.3, duration: 1}, "<");
            t3.to(letter3_smallbtn4.position, {y: -0.25, duration: 1}, "<");
            t3.to(letter3_bigbtn.rotation, {z: 0, duration: 1});
            t3.to(letter3_sidebtn.rotation, {z: 2, duration: 1}, "<");
            t3.to(letter3_smallbtn1.position, {y: -0.1, duration: 1}, "<");
            t3.to(letter3_smallbtn2.position, {y: -0.35, duration: 1}, "<");
            t3.to(letter3_smallbtn3.position, {y: -0.2, duration: 1}, "<");
            t3.to(letter3_smallbtn4.position, {y: -0.45, duration: 1}, "<");
            t3.play();
            startletter3_timer = setTimeout(function(){
                startletter3_animation=false;
                doletter3animation();
            },6000)
        };
    }
}

function animate() {
    
    if(!$("body").hasClass("body_user_guide")){
        camera.position.y += ( - mouseY/10 - camera.position.y ) * .05;

        if(allArr.length){
            if(breakmodel){
                for ( var i = 0; i < allArr.length; i++ ) { 
                    allArr[i].position.x += (  randomObjArr[i].x - allArr[i].position.x ) * .05;
                    allArr[i].position.y += (  randomObjArr[i].y - allArr[i].position.y ) * .05;
                    allArr[i].position.z += (  randomObjArr[i].z - allArr[i].position.z ) * .05;
                }
            }else{
                for ( var i = 0; i < allArr.length; i++ ) { 
                    allArr[i].position.x += (  randomObjArr[i].original_x - allArr[i].position.x ) * .05;
                    allArr[i].position.y += (  randomObjArr[i].original_y - allArr[i].position.y ) * .05;
                    allArr[i].position.z += (  randomObjArr[i].original_z - allArr[i].position.z ) * .05;
                }
            }
        }


        //camera.lookAt( scene.position );

        if($(".mobile_show:last").is(":hidden")){
            // desktop
            if($("body").hasClass("body_test_humanity") || $("body").hasClass("body_user_guide")){
                letter1.position.y += ( 0 - letter1.position.y ) * .05;
                letter2.position.y += ( 0 - letter2.position.y ) * .05;
                letter3.position.y += ( 0 - letter3.position.y ) * .05;

            }else{
                letter1.position.y += ( -1 - letter1.position.y ) * .05;
                letter2.position.y += ( -1 - letter2.position.y ) * .05;
                letter3.position.y += ( -1 - letter3.position.y ) * .05;
            }
            


            if($("body").hasClass("body_test_humanity_result_loading")){
                letter1.rotation.y +=0.02;
                letter1.rotation.y %= Math.PI*2;
                letter2.rotation.y +=0.02;
                letter2.rotation.y %= Math.PI*2;
                letter3.rotation.y +=0.02;
                letter3.rotation.y %= Math.PI*2;
            }else{
                letter1.rotation.y += ( 0 * Math.PI * (30 / 360) - letter1.rotation.y ) * .05;
                letter2.rotation.y += ( 0 * Math.PI * (30 / 360) - letter2.rotation.y ) * .05;
                letter3.rotation.y += ( 0 * Math.PI * (30 / 360) - letter3.rotation.y ) * .05;
            }

            if($("body").hasClass("body_test_humanity_result_start_chat")){
                if(rndInt==1){
                    letter1.position.x += ( 0 - letter1.position.x ) * .05;
                    letter2.position.x += ( 20 - letter2.position.x ) * .05;
                    letter3.position.x += ( 26 - letter3.position.x ) * .05;
                }
                if(rndInt==2){
                    letter1.position.x += ( -20 - letter1.position.x ) * .05;
                    letter2.position.x += ( 0 - letter2.position.x ) * .05;
                    letter3.position.x += ( 20 - letter3.position.x ) * .05;
                }
                if(rndInt==3){
                    letter1.position.x += ( -26 - letter1.position.x ) * .05;
                    letter2.position.x += ( -20 - letter2.position.x ) * .05;
                    letter3.position.x += ( 0 - letter3.position.x ) * .05;
                }
                
                letter1.rotation.x += ( Math.PI * (rndRotate / 360) - letter1.rotation.x ) * .05;
                letter2.rotation.x += ( Math.PI * (rndRotate / 360) - letter2.rotation.x ) * .05;
                letter3.rotation.x += ( Math.PI * (rndRotate / 360) - letter3.rotation.x ) * .05;

                letter1.scale.x += ( rndScale - letter1.scale.x ) * .05;
                letter1.scale.y += ( rndScale - letter1.scale.y ) * .05;
                letter2.scale.x += ( rndScale - letter2.scale.x ) * .05;
                letter2.scale.y += ( rndScale - letter2.scale.y ) * .05;
                letter3.scale.x += ( rndScale - letter3.scale.x ) * .05;
                letter3.scale.y += ( rndScale - letter3.scale.y ) * .05;

            }else{
                letter1.position.x += ( -6 - letter1.position.x ) * .05;
                letter2.position.x += ( 0 - letter2.position.x ) * .05;
                letter3.position.x += ( 6 - letter3.position.x ) * .05;

                letter1.scale.x += ( 1 - letter1.scale.x ) * .05;
                letter1.scale.y += ( 1 - letter1.scale.y ) * .05;
                letter2.scale.x += ( 1 - letter2.scale.x ) * .05;
                letter2.scale.y += ( 1 - letter2.scale.y ) * .05;
                letter3.scale.x += ( 1 - letter3.scale.x ) * .05;
                letter3.scale.y += ( 1 - letter3.scale.y ) * .05;
            }
        }else{
            //mobile
            letter1.rotation.y +=0.02;
            letter1.rotation.y %= Math.PI*2;
            letter2.rotation.y +=0.02;
            letter2.rotation.y %= Math.PI*2;
            letter3.rotation.y +=0.02;
            letter3.rotation.y %= Math.PI*2;

            letter1.position.x += ( 0 - letter1.position.x ) * .05;
            letter1.position.y += ( 4.1 - letter1.position.y ) * .05;
            letter2.position.x += ( 0 - letter2.position.x ) * .05;
            letter2.position.y += ( 0 - letter2.position.y ) * .05;
            letter3.position.x += ( 0 - letter3.position.x ) * .05;
            letter3.position.y += ( -4.2 - letter3.position.y ) * .05;

            letter1.scale.x += ( 0.8 - letter1.scale.x ) * .05;
            letter1.scale.y += ( 0.8 - letter1.scale.y ) * .05;
            letter2.scale.x += ( 0.8 - letter2.scale.x ) * .05;
            letter2.scale.y += ( 0.8 - letter2.scale.y ) * .05;
            letter3.scale.x += ( 0.8 - letter3.scale.x ) * .05;
            letter3.scale.y += ( 0.8 - letter3.scale.y ) * .05;

        }
        

        $(".scrolltonext").each(function(){
            var $p_scroll = $(this).parents(".book_page_scroll_wrapper").find(".book_page_scroll");
            var mywidth = parseInt($(this).find(".progress").width());
            var progress = parseInt($(this).find(".progress").attr("data-progress"));
            if($(this).hasClass("show")){
                mywidth += ( progress - mywidth ) * .05;
                $(this).find(".progress").css("width",mywidth+"px")
            }else{
                if(!$(this).hasClass("ok")){
                    if(mywidth>1){
                        mywidth -=2;
                        $(this).find(".progress").css("width",mywidth+"px")
                        $(this).find(".progress").attr("data-progress",mywidth)
                    }else{
                        $(this).find(".progress").css("width","0px")
                        $(this).find(".progress").attr("data-progress",0)
                    }
                }
            }
        })
        
    }
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );

}


