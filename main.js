song = "";


function preload()
{
    song = loadSound("music.mp3");  
}

leftwristX = 0;
leftwristY = 0;

rightwristX = 0;
rightwristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup()
{
    canvas =  createCanvas(600, 500);
	canvas.center();
    
	video = createCapture(VIDEO);
	video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded()
 {
    console.log('Posenet is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
{
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist =  " + scoreLeftWrist);

    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftwristX + "leftwristY = ", leftwristY );

    rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    console.log("RightWristX = " + rightwristX + "rightwristY = ", rightwristY );
}}



function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

        if(scoreLeftWrist > 0.2)
	{
		circle(leftwristX,leftwristY,20);
		InNumberleftWristY = Number(leftwristY); 
		remove_decimals = floor(InNumberleftWristY);
		volume = remove_decimals/500;
		document.getElementById("volume").innerHTML = "Volume = " + volume;		
		song.setVolume(volume);	
	}
}

function play() {
    song.play();
}

function stop() {
    song.stop();
}

function pause() {
    song.pause();
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}