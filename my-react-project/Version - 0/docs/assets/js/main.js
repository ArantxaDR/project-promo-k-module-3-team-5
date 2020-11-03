"use strict";const fr=new FileReader,uploadBtn=document.querySelector(".js__box-button"),fileField=document.querySelector(".js__box-button-hidden"),profileImage=document.querySelector(".js__profile-image"),profilePreview=document.querySelector(".js__profile-preview"),div=document.querySelector(".js-div");function getImage(e){const t=e.currentTarget.files[0];fr.addEventListener("load",writeImage),fr.readAsDataURL(t)}function writeImage(){profileImage.style.backgroundImage=`url(${fr.result})`,profilePreview.style.backgroundImage=`url(${fr.result})`,div.classList.add("js__hidden-img"),data.photo=fr.result,localStorage.setItem("form",JSON.stringify(data)),changeCreateBtn()}function fakeFileClick(){fileField.click()}uploadBtn.addEventListener("click",fakeFileClick),fileField.addEventListener("change",getImage);const buttonContainer=document.querySelectorAll(".js-collapsable"),sectionContainer=document.querySelectorAll(".js-section"),buttonArrow=document.querySelectorAll(".js-arrow"),btnCreate=document.querySelector(".js-createBtn");function collapseMenu(e){for(let t=0;t<buttonContainer.length;t++)e.currentTarget===buttonContainer[t]?(sectionContainer[t].classList.toggle("js__hidden"),buttonArrow[t].classList.toggle("js__button-arrow")):(sectionContainer[t].classList.add("js__hidden"),buttonArrow[t].classList.remove("js__button-arrow"))}for(const e of buttonContainer)e.addEventListener("click",collapseMenu);const hiddenLink=document.querySelector(".js-sectionHidden");function createCard(e){hiddenLink.classList.remove("js__hiddenlink"),e.preventDefault(),btnCreate.classList.add("js-cardCreated"),sendRequest()}function activateClass(e,t){e.classList.remove("palette-1","palette-2","palette-3"),e.classList.add(t)}function stylePicker(e){let t="palette-"+e.currentTarget.id.slice(-1);const n=document.querySelector(".card__name-surname"),o=document.querySelector(".card__occupation"),r=document.querySelectorAll(".card__contact-container"),a=document.querySelectorAll(".js-icons");activateClass(n,t),activateClass(o,t);for(let e of r)activateClass(e,t);for(let e of a)activateClass(e,t)}btnCreate.addEventListener("click",createCard);const designColors=document.querySelectorAll(".js-customize-design__colors");for(let e of designColors)e.addEventListener("click",stylePicker);let data={name:"",job:"",email:"",photo:"",phone:"",linkedin:"",github:""};const saveData=function(e){const t=e.currentTarget.name;if("name"===t||"job"===t){const n=document.querySelector(".js__error-message-"+t);e.currentTarget.value.length<19?(data[t]=e.currentTarget.value,n.classList.add("js__hidden")):(n.classList.remove("js__hidden"),e.currentTarget.value=e.currentTarget.value.slice(0,-1))}else data[t]=e.currentTarget.value;changeCreateBtn(),render()};function changeCreateBtn(){""!==data.name&&""!==data.job&&""!==data.email&&""!==data.phone&&""!==data.linkedin&&""!==data.github&&""!==data.photo?btnCreate.classList.remove("js-cardCreated"):btnCreate.classList.add("js-cardCreated")}changeCreateBtn();const render=function(){document.querySelector(".js-nameSurname").innerHTML=data.name||"Nombre Apellido",document.querySelector(".js-occupation").innerHTML=data.job||"Front-end developer",document.querySelector(".js-phone").href="tel:"+data.phone,document.querySelector(".js-email").href="mailto:"+data.email,document.querySelector(".js-linkedin").href="https://www.linkedin.com/in/"+data.linkedin,document.querySelector(".js-github").href="https://www.github.com/"+data.github,localStorage.setItem("form",JSON.stringify(data))},inputList=document.querySelectorAll(".js-input");for(const e of inputList)e.addEventListener("keyup",saveData);const getDataFromLocalStorage=function(){if(localStorage.getItem("form")){data=JSON.parse(localStorage.getItem("form")),""!==data.photo&&(profileImage.style.backgroundImage=`url(${data.photo})`,profilePreview.style.backgroundImage=`url(${data.photo})`,document.querySelector(".js-div").classList.add("js__hidden-img"));for(const e in data){const t=document.querySelector(".js-input-"+e);null!==t&&(t.value=data[e])}render()}};getDataFromLocalStorage();const resetButton=document.querySelector(".js-reset"),handleReset=function(){data.name="",data.job="",data.email="",data.phone="",data.linkedin="",data.github="",data.photo="";for(const e of inputList)e.value="",profileImage.style.backgroundImage="none",profilePreview.style.backgroundImage="none",div.classList.remove("js__hidden-img");render()};resetButton.addEventListener("click",handleReset);const linkCont=document.querySelector(".customize-share__link-cont");function sendRequest(){fetch("https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card/",{method:"POST",body:JSON.stringify(data),headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(e){showURL(e)})).catch((function(e){console.log(e)}))}const linkTwitCont=document.querySelector(".js-twitter-url");function showURL(e){e.success?(linkTwitCont.href=e.cardURL,linkTwitCont.innerHTML=e.cardURL):linkTwitCont.innerHTML="ERROR:"+e.error}const buttonTwitter=document.querySelector(".customize-share__twitter--hidden");function createTwitterLink(e){const t=encodeURIComponent("¡He creado mi tarjeta con Awesome Profile Cards de <em>y</em>! Puedes verla en: "),n=linkTwitCont.href;buttonTwitter.href=`https://twitter.com/intent/tweet?text=${t}&url=${n}`}buttonTwitter.addEventListener("click",createTwitterLink);