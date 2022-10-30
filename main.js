//https://teachablemachine.withgoogle.com/models/Evr9gllVV/

prediction_1="";
prediction_2="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src= "+data_uri+">";
    });
}

console.log("ml5version-", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Evr9gllVV/model.json", model_Loaded);

function model_Loaded(){
    console.log("Model is Loaded");
}
function speak(){
var synth = window.speechSynthesis;
speak_data_1 = "The first prediction is   " + prediction_1;
speak_data_2 = "and the second prediction is    " + prediction_2;
var utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
synth.speak(utterthis);
}


function predict(){
img = document.getElementById("captured_img");
classifier.classify(img,got_result);
}


function got_result(error,result){
if (error){
    console.log(error);

}
else{
console.log(result);
document.getElementById("result_hand_name").innerHTML = result[0].label;
document.getElementById("result_hand_name2").innerHTML = result[1].label;
prediction_1 = result[0].label;
prediction_2 = result[1].label;
speak();

if(result[0].label == "wave"){
    document.getElementById("update_hand").innerHTML = "&#128400;";
}


if(result[0].label == "peace"){
document.getElementById("update_hand").innerHTML = "&#9996;";
}

if(result[0].label == "thumbs up"){
    document.getElementById("update_hand").innerHTML = "&#128077;";
    }

    if(result[1].label == "wave"){
        document.getElementById("update_hand2").innerHTML = "&#128400;";
    }
    
    
    if(result[1].label == "peace"){
    document.getElementById("update_hand2").innerHTML = "&#9996;";
    }
    
    if(result[1].label == "thumbs up"){
        document.getElementById("update_hand2").innerHTML = "&#128077;";
        }
}
}
