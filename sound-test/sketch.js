/*
    title: 
    author: LenaMK
    date: 2023-03-06
    description: test de son
    inspiration: https://www.youtube.com/watch?v=q2IDNkUws-A&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=8

*/

var showEllipse = false
var volTranslate = false
var showCircleViz = false

//to use these, I would need to store the history on a file and get it (preload (would it lag?), make sure it's empty before starting a test) to be able to change the values without losing the history.

var mic, vol, fft, spectrum
var volHistoryMax
var volHistory = []
var ampHistory = []


function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    createCanvas(windowWidth, windowHeight); 
    angleMode(DEGREES)
    mic = new p5.AudioIn()
    mic.start()

    fft = new p5.FFT()
    //

    //amp = new p5.Amplitude()
    //amp.setInput(mic)
} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function volLine(){

    stroke(0, 0, 100, 250)
    noFill()
    
    var currentY = map(vol*10, 0, 1, height, 0)

    push()
    //translate to currentY so 
    if (volTranslate)
        translate(0, height/2 - currentY)


    beginShape()
    for (var i = 0; i<volHistory.length; i++){
        var y = map(volHistory[i], 0, 1, height, 0)
        vertex(i, y)
    }
    endShape()

    pop()

    stroke(341, 100, 67, 250)
    line(volHistory.length, 0, volHistory.length, height)


}


function mouthEllipse(){
    fill(0, 0, 100, 120)

    ellipse(windowWidth/2, windowHeight/2, windowWidth, vol*5000)

}

function circleViz(){
    push()
    stroke(0, 0, 100, 250)
    noFill()

    translate(width/2, height/2)
    beginShape();
    for (var i = 0; i < 360; i++){
        r = map(volHistory[i], 0, 1, 100, 500 )
        var x = r*cos(i)
        var y = r*sin(i)
        vertex(x,y)
    }
    endShape();


    pop()
}

function frequencyViz(){
    
}

function draw() { 
     
    background(0, 0, 0);   

    vol = mic.getLevel()
    //mic.getLevel is the same thing as having the amp of mic...

    spectrum = fft.analyze()

    volHistory.push(vol*10)
    
    if (showCircleViz)
        volHistoryMax = 360
    else
        volHistoryMax = windowWidth-100

    
    if (volHistory.length > volHistoryMax){
        volHistory.splice(0,1)
    }


    fill(0, 0, 100, 250)    
    text("vol * 10", windowWidth-200, windowHeight-120) 
    text(vol*10, windowWidth-200, windowHeight-100); 

    //need to finish this: https://www.youtube.com/watch?v=2O3nm0Nvbi4&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=11
    text("FFT spectrum", windowWidth-200, windowHeight-70) 
    text(spectrum.length, windowWidth-200, windowHeight-50); 

    if (showEllipse) {
        mouthEllipse()
    }

    if (showCircleViz)
        circleViz()
 
    frequencyViz();

    
} 


