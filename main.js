prediction_1="";

Webcam.set({
	width:350,
	height:300,
	image_format:'png',
	png_quality:99
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function speak() {
	var synth=window.speechSynthesis;
	speak_data_1="The First Prediction Of Emotion Is "+prediction_1;
	var utterThis=new SpeechSynthesisUtterance(speak_data_1);
	synth.speak(utterThis);
}

function take_snapshot() {
	Webcam.snap(function(data_uri){
		document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
	});
}

console.log('ml5 version is ', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1kjeRXk22/model.json', modelLoaded);

function modelLoaded() {
	console.log('model is loaded');
}

function check() {
	img=document.getElementById('captured_image');
	classifier.classify(img, gotResult);
}

function gotResult(error, results) {
	if(error) {
		console.error(error);
	}
	else {
		document.getElementById("result_emotion_name").innerHTML=results[0].label;
		gesture=results[0].label;
		console.log(results);
		if(gesture=="clapping") {
			prediction_1="This is the clapping hand gesture";
			document.getElementById("update_emoji").innerHTML="&#128079;";}
		
		else if(gesture=="victoryHand") {
			prediction_1="This is the victory hand gesture";
			document.getElementById("update_emoji").innerHTML="&#9996;";}
		
		else if(gesture=="horns") {
			prediction_1="This is the horns hand gesture";
			document.getElementById("update_emoji").innerHTML="&#129304;";}
		
		else if(gesture=="raisedFist") {
			prediction_1="This is the raisedFist hand gesture";
			document.getElementById("update_emoji").innerHTML="&#9994;";}
		
		else if(gesture=="thumbsUp") {
			prediction_1="This is the thumbs up hand gesture";
			document.getElementById("update_emoji").innerHTML="&#128077;";}
		
		else if(gesture=="okHand") {
			prediction_1="This is the ok hand gesture";
			document.getElementById("update_emoji").innerHTML="&#128076;";}
		speak();
	}
}
