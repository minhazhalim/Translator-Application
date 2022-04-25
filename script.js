const fromText = document.querySelector('.from-text');
const toText = document.querySelector('.to-text');
const exchange = document.querySelector('.exchange');
const button = document.querySelector('button');
const select = document.querySelectorAll('select');
const icons = document.querySelectorAll('.row .fas');
select.forEach((tag,id) => {
     for(let country_code in countries){
          let selected = id === 0 ? country_code == 'en-GB' ? 'selected' : "" : country_code == 'hi-IN' ? 'selected' : "";
          let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
          tag.insertAdjacentHTML('beforeend',option);
     }
});
exchange.addEventListener('click',() => {
     let temporaryText = fromText.value;
     let temporaryLanguage = select[0].value;
     fromText.value = toText.value;
     toText.value = temporaryText;
     select[0].value = select[1].value;
     select[1].value = temporaryLanguage;
});
fromText.addEventListener('keyup',() => {
     if(!fromText.value){
          toText.value = "";
     }
});
button.addEventListener('click',() => {
     let text = fromText.value.trim();
     let translateFrom = select[0].value;
     let translateTo = select[1].value;
     if(!text) return;
     toText.setAttribute('placeholder','translating...');
     let mainApiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
     fetch(mainApiUrl).then(res => res.json()).then(data => {
          toText.value = data.responseData.translatedText;
          data.matches.forEach(match => {
               if(data.id === 0){
                    toText.value = data.translation;
               }
          });
          toText.setAttribute('placeholder','translation');
     });
});
icons.forEach(icon => {
     icon.addEventListener('click',({target}) => {
          if(!fromText.value || !toText.value) return;
          if(target.classList.contains('fa-copy')){
               if(target.id == 'from'){
                    navigator.clipboard.writeText(fromText.value);
               }else{
                    navigator.clipboard.writeText(toText.value);
               }
          }else{
               if(target.id == 'from'){
                    let speechSynthesisUtterance = new SpeechSynthesisUtterance(fromText.value);
                    speechSynthesisUtterance.lang = select[0].value;
               }else{
                    let speechSynthesisUtterance = new SpeechSynthesisUtterance(toText.value);
                    speechSynthesisUtterance.lang = select[1].value;
               }
               speechSynthesis.speak(speechSynthesisUtterance);
          }
     });
});