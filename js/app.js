"use strict";
/// <reference path="jquery.d.ts" />
var $ = require("jquery");
//lets make some initialization
var randomWord = "";
var wordBlanks = "";
var hangManState = -1;
function resetGame() {
    resetUI();
    randomWord = chooseWord();
    wordBlanks = blanksFromAnswer(randomWord);
    hangManState = 0;
    drawWord(wordBlanks);
}
$(document).ready(resetGame);
function winGame() {
    alert('You win');
    resetGame();
}
function loseGame() {
    alert('lose');
    resetGame();
}
function startGame() {
    var tempChar = $('#letter-input').val().toLowerCase();
    $('#letter-input').val("");
    var tempString = "";
    tempString = guessLetter(tempChar, wordBlanks, randomWord);
    console.log(tempString);
    console.log(tempChar);
    if (tempString != wordBlanks) {
        updateWord(tempString);
        wordBlanks = tempString;
        if (tempString === randomWord) {
            winGame();
        }
    }
    else {
        wrongLetter(tempChar);
        drawSequence[hangManState++]();
        if (hangManState === drawSequence.length) {
            loseGame();
        }
    }
}
$('#letter-input').keypress(startGame);
//Start again 
var words = ['cat', 'monkey', 'elephant'];
function chooseWord() {
    return words[Math.floor((Math.random() * words.length))];
}
// console.log(chooseWord());
function blanksFromAnswer(word) {
    var result = '';
    for (var i in words) {
        result += '_';
    }
    return result;
}
// console.log(blanksFromAnswer(chooseWord()));
function alterAt(pos, letter, originalString) {
    return originalString.substr(0, pos) + letter + originalString.substr(pos + 1, originalString.length);
}
function guessLetter(letter, show, originalString) {
    var checkIndex = 0;
    checkIndex = originalString.indexOf(letter);
    while (checkIndex >= 0) {
        show = alterAt(checkIndex, letter, show);
        checkIndex = originalString.indexOf(letter, checkIndex + 1);
    }
    return show;
}
// console.log(guessLetter('a', '___','eata'));
//User interface
//draw dinamically body part of hang man 
function drawHead() {
    $('.draw-area').append($('<div/>').addClass("body-part head"));
}
function drawTorso() {
    $('.draw-area').append($('<div/>').addClass("body-part armbox").append($('<div/>').addClass("body-part torso")));
    $('.draw-area').append($('<div/>').addClass("body-part legbox").append($('<div/>').addClass("body-part pelvis")));
}
function drawLeftArm() {
    $('.armbox').prepend($('<div/>').addClass("body-part leftarm"));
}
function drawRightArm() {
    $('.armbox').prepend($('<div/>').addClass("body-part rightarm"));
}
function drawLeftLeg() {
    $('.legbox').prepend($('<div/>').addClass("body-part leftleg"));
}
function drawRightLeg() {
    $('.legbox').prepend($('<div/>').addClass("body-part rightleg"));
}
var drawSequence = [drawHead, drawTorso, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg];
// for(let i  in drawSequence){
//     drawSequence[i]();
// }
function wrongLetter(letter) {
    $('#wrong-letters').append($('<span/>').addClass('<guessed-letter').text(letter));
}
function resetUI() {
    $('.body-part').remove();
    $('.guessed-letter').remove();
    $('.shown-letter').remove();
}
//_ _ _
function drawWord(word) {
    for (var i in word) {
        $('.word-display').append($('<span/>').addClass('shown-letter').html('&nbsp'));
    }
}
//update word based on the new word
function updateWord(word) {
    var shownLetter = $('.shown-letter:first');
    for (var i in word) {
        if (word.charAt(i) != '_') {
            shownLetter.text(word.charAt(i));
        }
        else {
            shownLetter.html('&nbsp');
        }
        shownLetter = shownLetter.next();
    }
}
//# sourceMappingURL=app.js.map