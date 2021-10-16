
/*Choose a random word*/
var wordsArray =['STARK', 'LANNISTER', 'GREYJOY', 'BARATHEON', 'MARTELL', 'TYRELL', 'TARGARYEN', 'ARRYN', 'TULLY'];
var randomWord = wordsArray[Math.floor(Math.random()*wordsArray.length)]; 
var randomWordLength = randomWord.length;

/*Hide the chosen word in the page*/
var wordToGuess = document.getElementById("word");
var hiddenWord="";
for(let i=0;i < randomWordLength;i++){
	hiddenWord = hiddenWord + "_"
}
wordToGuess.innerHTML = hiddenWord;
array1 = hiddenWord.split("");

/*Number of tries remaining*/
var countToDeath = 10;
var lettersCount = 0;

/*Choice of letters and look for a match*/
var letters = document.getElementsByClassName('letter');
var chosenLetter="";
var x=0;
var index=0;

/*Message*/
var message = document.getElementById("message");

/*Shortcut to end the game*/
var shortcut = document.getElementById("shortcut");

/*Hangman svg for animation*/
var hangman = document.getElementsByClassName('hangman');

/*Hint*/
var revealHint = document.getElementById("hint_hidden");
var hint = document.getElementById("hint");
var revealedHint = document.getElementById("hint_revealed");

function revealTheHint(){
	revealHint.style.display = "none";
	revealedHint.style.display="inline";
	hint.style.cursor="default";
	hint.classList.remove("hintnotrevealed");
	hint.removeEventListener('click', revealTheHint);
}

window.onload=function(){
	for(let j=0; j<26; j++){
		letters[j].addEventListener('click', function(){
			let target = letters[j];
			if (target.classList.contains('chosen')){
				message.innerHTML ="<p>This letter was already chosen!</p>"
			}
			else{
				target.classList.add('chosen');
				target.classList.remove('available');
				chosenLetter=target.innerHTML;			
				x=randomWord.indexOf(chosenLetter);
				if(x==-1){
					countToDeath-=1;
				}
				else{
					while(x!=-1){					
						array1[x]=chosenLetter;
						lettersCount +=1;
						hiddenWord=array1.join("");
						wordToGuess.innerHTML = hiddenWord;
						index+=x+1;
						x=randomWord.indexOf(chosenLetter,index);					
					}
					index=0;
				}
				if (countToDeath==0){
					message.innerHTML ="<p>You lost ! The word was <span style='text-decoration:underline;'>"+ randomWord +"</span></p>"
					hangman[9-countToDeath].style.display="inline";
					shortcut.style.display ="block";
				}	
				else{
					message.innerHTML="<p>Guesses left : " + countToDeath +"</p>";
					if (countToDeath<10){
						hangman[9-countToDeath].style.display="inline";
					}					
				}			
				if (lettersCount==randomWordLength){
					message.innerHTML ="<p>Good job ! The word was <span style='text-decoration:underline;'>"+ randomWord +"</span></p>"
					shortcut.style.display ="block";
				}
			}
		})
	}
	hint.addEventListener('click', revealTheHint);
}

