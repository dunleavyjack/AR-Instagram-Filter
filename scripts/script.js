// Spark AR APIs
const Time = require('Time');
const Patches = require('Patches');
const Instruction = require('Instruction');
const Materials = require('Materials');
const Textures = require('Textures')

// Objects
const display = Materials.get('display'); 
const pics = ['7ELEVEN', 'EMART', 'GS', 'MINISTOP', 'CU'];

// Variables
let randInterval = null;
let status = 'ready';

// Setting Initial Instruction
Instruction.bind(true, 'tap_to_start');

// Main loop
Patches.getPulseValue('tap').subscribe(function (e) {
    Instruction.bind(false, 'tap_to_start')
    if (status === 'ready') {
        start();
    } 
    else if (status === 'running'){
        return;
    }
    else if (status === 'finished'){
        reset();
    } 
});

// Functions
function start(){
    status = 'running';
    randInterval = Time.setInterval(function (){
        randomImage();
    }, 100);
    beginCountDown();
};

function beginCountDown(){
    Time.setTimeout(function(){
        stop();
    }, 3000);
};

function stop(){
     Time.clearInterval(randInterval);
     Instruction.bind(true, 'tap_to_reply')
     status = "finished";
};

function reset(){
    Instruction.bind(false, 'tap_to_reply')
    Instruction.bind(true, 'tap_to_start')
    display.diffuse = Textures.get('WHICH_CVS');
    status = 'ready';
};

// Logic Functions
function randomImage(){
    let randomNumber = randomlyChoose(0, pics.length);
    let pickedImage = pics[randomNumber]
    display.diffuse = Textures.get(pickedImage);
};

function randomlyChoose(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
};