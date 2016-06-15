/// <reference path="jquery.d.ts" />
import * as $ from "jquery";

//lets make some initialization

let randomWord: string= "";
let wordBlanks: string = "";
let hangManState: number= -1;


function resetGame(){
    resetUI();
    randomWord = chooseWord();
    wordBlanks = blanksFromAnswer(randomWord);
    hangManState = 0;
    drawWord(wordBlanks);
}

$(document).ready(resetGame);

function winGame(){
    alert('You win');
    resetGame();
}

function loseGame(){
    alert('lose');
    resetGame();
}

function startGame(): void{
    
    let tempChar: string = $('#letter-input').val().toLowerCase();
   
     $('#letter-input').val("");
     
     let tempString: string = "";
     tempString = guessLetter(tempChar, wordBlanks, randomWord);
     
     console.log(tempString);
     console.log(tempChar);
     
     if(tempString != wordBlanks){ //c__ !== ___
         updateWord(tempString);
         wordBlanks = tempString;
         if(tempString  === randomWord){
             winGame();
         }
     }else{
         wrongLetter(tempChar);
         drawSequence[ hangManState++ ]();
         if(hangManState === drawSequence.length){
             loseGame();
         }
     }
}

$('#letter-input').keypress( startGame );

//Start again 

let words: string[] = ['cat', 'monkey', 'elephant'];

function chooseWord(): string{
    return words[Math.floor((Math.random() * words.length))];
}

// console.log(chooseWord());

function blanksFromAnswer(word: string): string{
    
    let result: string = '';
    for(let i in words){
        
        result += '_';
    }
    
    return result;
}

// console.log(blanksFromAnswer(chooseWord()));

function alterAt(pos: number, letter: string, originalString: string): string{
    return originalString.substr(0, pos) + letter + originalString.substr(pos + 1, originalString.length);
}

function guessLetter(letter: string, show : string, originalString: string){
    
    let checkIndex: number = 0; 
    checkIndex = originalString.indexOf(letter);
    
    while(checkIndex >= 0){
        show = alterAt(checkIndex, letter, show);
        checkIndex = originalString.indexOf(letter, checkIndex + 1);
    }
    
    return show;
    
}

// console.log(guessLetter('a', '___','eata'));

//User interface
//draw dinamically body part of hang man 

function drawHead (): void{
  $('.draw-area').append( $('<div/>').addClass("body-part head") );
}

function drawTorso () : void {
  $('.draw-area').append(
      $('<div/>').addClass("body-part armbox").append(
          $('<div/>').addClass("body-part torso")));
  $('.draw-area').append(
      $('<div/>').addClass("body-part legbox").append(
          $('<div/>').addClass("body-part pelvis")));
}

function drawLeftArm (): void {
 $('.armbox').prepend( $('<div/>').addClass("body-part leftarm") );
}

function drawRightArm (): void {
 $('.armbox').prepend( $('<div/>').addClass("body-part rightarm") );   
}

function drawLeftLeg (): void {
 $('.legbox').prepend( $('<div/>').addClass("body-part leftleg") );   
}

function drawRightLeg(): void {
 $('.legbox').prepend( $('<div/>').addClass("body-part rightleg") );   
}

let drawSequence = [drawHead, drawTorso, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg];

// for(let i  in drawSequence){
//     drawSequence[i]();
// }

function wrongLetter(letter): void{
    $('#wrong-letters').append(
        $('<span/>').addClass('<guessed-letter').text(letter)
    );
}

function resetUI(): void{
    $('.body-part').remove();
    $('.guessed-letter').remove();
    $('.shown-letter').remove();
}

//_ _ _
function drawWord(word): void{
  for(let i in word){
      $('.word-display').append(
          $('<span/>').addClass('shown-letter').html('&nbsp')
      );
  }   
}

//update word based on the new word
function updateWord(word): void{
    
   let shownLetter = $('.shown-letter:first');
    for(let i in word ){
        if(word.charAt(i) != '_'){
            shownLetter.text( word.charAt(i) );
        }else{
            shownLetter.html('&nbsp');
        }
        
        shownLetter = shownLetter.next();
    }
}


