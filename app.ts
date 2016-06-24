/// <reference path="jquery.d.ts" />
/// reference path="phaser.comments.d.ts" />
/// reference path="pixi.comments.d.ts" />
/// reference path="p2.d.ts" />

$(document).ready(createGame);

var game:Phaser.Game;

let randomWord: string = "";
let wordBlanks: string = "";
let hangmanState: number = -1;

var hangmanImages:Phaser.Group;
var guessedLetterGroup:Phaser.Group;
var showLettersGroup: Phaser.Group;

var guessedLetterText;
var showLetters;

var guessedLetterBackGr;
var showLettersBackGr;

function createGame():void {
    game = new Phaser.Game(700, 800, Phaser.CANVAS,"game",
    {preload: myPreload, create: myCreate}); //creating an instance of Phaser Game obj   
}

//Web Graphics Library - JS Api for renderirane na 3D komp graphics
// bez da izpolzvate plugini

function myPreload():void {
    game.load.image("head", 'head.jpg');
    game.load.image("leftarm",'leftarm.png');
    game.load.image("rightarm",'rightarm.png');
    game.load.image("rightleg",'rightleg.png');
    game.load.image("leftleg",'leftleg.png');
    game.load.image("torso",'torso.png');
    game.load.image("showLetters", 'showLetters.png');
    game.load.image("guessedLetters", 'showLetters.png');
    // game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');
}

function myCreate():void{

   hangmanImages = game.add.group();
   hangmanImages.x = 500;
   hangmanImages.y = 100;
   guessedLetterGroup = game.add.group();
   
   game.stage.backgroundColor = 0x5d5d5d;

   var style = { font: "30px Arial", fill: "#ff0044", align: "center", backgroundColor: "#ffff00" };
   guessedLetterText = game.add.text(20, 20, 'Guess a Letter', style, guessedLetterGroup);
   showLetters = game.add.text(20, 200, 'Guessed Letters', style, showLettersGroup);
   
   guessedLetterBackGr = game.add.sprite(20 ,100, 'showLetters');
   showLettersBackGr = game.add.sprite(20 ,300, 'guessedLetters');
   

// showLettersBackGr.events.onInputDown.add();

   resetGame();
}

function resetGame(){
    resetUi();
    randomWord = chooseWord();
    wordBlanks = blanksFromAnswer(randomWord);
    hangmanState = 0;
    drawWord(wordBlanks);
}

// resetGame();
//start again 
function win(): void{
    alert('You win');
    resetGame();
}

function lose(): void{
    alert('You lose');
    resetGame();
}


var letterInput = $('#letter-input');

var drawSequence = [drawHead, drawTorso, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg];

function startGame(): void{

  var tempChar: string = $('#letter-input').val().toLowerCase();
  $('#letter-input').val("");

  var tempString: string = "";

  tempString = guessLetter(tempChar,wordBlanks, randomWord); 

  if(tempString != wordBlanks){
       updateWord(tempString);
       wordBlanks = tempString;
       if(tempString === randomWord){
          win();
       }
 }else{
       wrongLetter(tempChar);
       drawSequence[hangmanState++]();
    //    hangmanState =  hangmanState++;
       if(hangmanState === drawSequence.length){
            lose();
       }
       
  }
}

$('#letter-input').keyup(startGame);

// startGame();

var words: string[] = ['cat', 'monkey', 'elephant'];

function chooseWord(): string{
    // let words: string[] = ['cat', 'monkey', 'elephant'];
    return words[Math.floor((Math.random() * words.length))];
}

// alert(chooseWord());

function blanksFromAnswer(word): string{
    
    let result: string = '';
    for(let i in word){
        
        result += '_';
    }
    
    return result;
}

// console.log(blanksFromAnswer(chooseWord()));

function alterAt(pos: number, letter: string, originalString: string): string{
    return originalString.substr(0, pos) + letter + originalString.substr(pos + 1, originalString.length);
}

function guessLetter(letter: string, show : string, originalString: string){
    
    let checkIndex: number = -1; 
    checkIndex = originalString.indexOf(letter);
    
    while(checkIndex >= 0 && checkIndex < originalString.length){
        show = alterAt(checkIndex, letter, show);
        checkIndex = originalString.indexOf(letter, ++checkIndex);
    }

    return show;
}

// console.log(guessLetter('a', '___','eata'));

//User interface
//draw dinamically body part of hang man 

function drawHead(): void{
// $('.draw-area').append( $('<div/>').addClass("body-part head") );
  var head = game.add.sprite(60, 60, "head");
  hangmanImages.add(head);
}

// console.log(drawHead());

function drawTorso(): void {
//   $('.draw-area').append(
//       $('<div/>').addClass("body-part armbox").append(
//           $('<div/>').addClass("body-part torso")));
//   $('.draw-area').append(
//       $('<div/>').addClass("body-part legbox").append(
//           $('<div/>').addClass("body-part pelvis")));
  var torso = game.add.sprite(65, 100, "torso");
  hangmanImages.add(torso);
}

function drawLeftArm(): void {
//  $('.armbox').prepend( $('<div/>').addClass("body-part leftarm") );
//    game.add.image();
  var leftarm = game.add.image(20, 100, "leftarm");
  hangmanImages.add(leftarm);
//    game.add.group();
}

function drawRightArm(): void {
//  $('.armbox').prepend( $('<div/>').addClass("body-part rightarm") );   
 var rightarm = game.add.image(93, 100, "rightarm");
  hangmanImages.add(rightarm);
}

function drawLeftLeg(): void {
//  $('.legbox').prepend( $('<div/>').addClass("body-part leftleg") ); 
   
  var leftleg =  game.add.sprite(10, 120, "leftleg");
    // sprite =   game.add.sprite(400, 300, 'leftleg');
    // sprite.anchor.setTo(0.5, 0.5);
    // game.add.sprite(400, 300, 'leftleg');
     hangmanImages.add(leftleg);
}

function drawRightLeg(): void {
//  $('.legbox').prepend( $('<div/>').addClass("body-part rightleg") );
var rightleg = game.add.sprite(85, 133, "rightleg");   
 hangmanImages.add(rightleg);
}

// for(let i  in drawSequence){
//     drawSequence[i]();
// }

function wrongLetter(letter): void{

    $('#wrong-letters').append(
        $('<span/>').addClass('<guessed-letter').text(letter)
    );
   
}

function resetUi(): void{
    // $('.body-part').remove();
    // sprite.destroy();
    // var child  = hangmanImages.children;

    // console.log(childs);
    // var firstItem = 
    // for(var i = 0; i < drawSequence.length; i++){
    //     hangmanImages.remove(drawSequence[i]);
    // }
    
    
     //hangmanImages.removeChild(hangmanImages);

     //hangmanImages.removeAll();

     for (var i = hangmanImages.children.length - 1; i >= 0; i--) {
         var element = hangmanImages.children[i];

         element.scale.set(2,2)
         hangmanImages.remove(element)
     }

    //  var s = game.add.graphics(0,0)

    // s.beginFill(0xFF0000);
    // s.drawRect(0,0,1,1);
    
    //  game.add.tween(image).to({x:40, y:100},1000).start();

    // hangmanImages.remove(child);
    $('.guessed-letter').remove();
    $('.shown-letter').remove();
}

// function dropHandler(){
//    hangmanImages.remove(hangmanImages);
// }

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






