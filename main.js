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
		console.log(results);
	}
}