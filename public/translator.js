import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
let translateTo = document.querySelector('#locale-select').value;

const lightWord = word =>  `<span class="highlight">${word}</span>`;
const getTransArray = input => {
  input.map((word, i)=>{
    if(translateTo==='american-to-british'){
      if(americanOnly[word.toLowerCase()]){
        input[i] = lightWord(americanOnly[word])
      }
      if(americanToBritishSpelling[word.toLowerCase()]){
        input[i] = lightWord(americanToBritishSpelling[word])
      }
      if(americanToBritishTitles[word.toLowerCase()]){
        input[i] = lightWord(americanToBritishTitles[word])
      }
      if(word.match(/[0-9][0-9]:[0-9][0-9]/)){
        input[i] = lightWord(word.replace(':','.'))
      }
    } else {
      if(britishOnly[word.toLowerCase()]){
        input[i] = lightWord(britishOnly[word])
      }
      if(Object.values(americanToBritishSpelling).indexOf(word.toLowerCase()) > -1){
        input[i] = lightWord(Object.keys(americanToBritishSpelling)[Object.values(americanToBritishSpelling).indexOf(word.toLowerCase())])
      }
      if(Object.values(americanToBritishTitles).indexOf(word.toLowerCase()) > -1){
        input[i] = lightWord(Object.keys(americanToBritishTitles)[Object.values(americanToBritishTitles).indexOf(word.toLowerCase())])
      }
      if(word.match(/[0-9][0-9].[0-9][0-9]/)){
        input[i] = lightWord(word.replace('.',':'))
      }
    }
  });
  return input;
};
const trimArr = arr => arr.filter(v=> v.toString().length > 0)
const noTransInArr = arr => arr.find(v => v.toString().includes('<span class="highlight">'));


// @desc clear btn
window.clearInput = function(){
  document.getElementById("text-input").value = "";
  document.getElementById("error-msg").innerHTML = "";
  document.getElementById("translated-sentence").innerHTML = "";
}

// @desc translate to dropdown
window.translateTo = function(){
  translateTo = document.querySelector('#locale-select').value;
}

// @desc on translate btn click
window.onTranslate = function(){
  let input = trimArr(getTransArray(document.querySelector('#text-input').value.toString().split(/[' ',]/)));

  if(input.length == 0){
    return document.querySelector('#error-msg').innerHTML = "Error: No text to translate.";
  } else { document.querySelector('#error-msg').innerHTML = "" }

  if(noTransInArr(input)==undefined){
    return document.querySelector('#translated-sentence').innerHTML = "Everything looks good to me!";
  }

  document.querySelector('#translated-sentence').innerHTML=input.join(' ');
}

try {
  module.exports = {
      clearInput: window.clearInput,
      translateTo: window.translateTo,
      onTranslate: window.onTranslate
  }
} catch (e) {

}