

const chatInput=document.querySelector("#chat-input");
const sendButton=document.querySelector("#send-btn");
const chatContainer=document.querySelector(".chat-container");
const lightmode=document.querySelector("#theme-btn");
const deletebtn=document.querySelector("#delete-btn");
const bod=document.querySelector("body");

let userText=null;
const API_KEY="sk-proj-LtEpC6GzQ33A4l2QtRKGT3BlbkFJSE9fPSNNMp59NPBpLJrU";

const createElement=(html,className)=>{
    const chatDiv=document.createElement("div");
    chatDiv.classList.add("chat",className);
    chatDiv.innerHTML=html;
    return chatDiv;
}
const getChatResponse= async(incomingChatDiv)=>{
    const API_URL="https://api.openai.com/v1/completions";
    const pElement=document.createElement("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model:"gpt-3.5-turbo-instruct",
            prompt: userText,
            max_tokens: 1047,
            temperature: 0.2,
            n: 1
            
            
        })

    }
    try {
    const response =await (await fetch(API_URL,requestOptions)).json();
    pElement.textContent=response.choices[0].text.trim();
    } catch(error){
        console.log(error);
    }
    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    chatInput.value="";
}
const copyResponse=(copyBtn)=> {
  const responseTextElement=copyBtn.parentElement.querySelector("p"); 
  navigator.clipboard.writeText(responseTextElement.textContent);
  copyBtn.textContent="done";
  setTimeout(()=> copyBtn.textContent="Copy" ,1000);

}

const showTypingAnimation=async()=>{
    const html=` <div class="chat-content">
    <div class="chat-details">
        <img src="images/chatbot.jpg" alt="chatbot-img">
        <div class="typing-animation">
            <div class="typing-dot" style="--delay: 0.1s"></div>
            <div class="typing-dot" style="--delay: 0.2s"></div>
            <div class="typing-dot" style="--delay: 0.3s"></div>
        </div>
    </div>
    <span onclick="copyResponse(this)" class="material-symbols-rounded" style ="font-size: 15px;">Copy</span>
</div>`;
  const incomingChatDiv=createElement(html,"incoming");
  chatContainer.appendChild(incomingChatDiv);
  getChatResponse(incomingChatDiv);
}


const handleOutgoingChat=()=>{
userText=chatInput.value.trim();
if(!userText){
    return;
}
 const html=`<div class="chat-content">
 <div class="chat-details">
     <img src="images/user.jpg" alt="user-img">
     <p></p>
 </div>
</div>`;
  const outgoingChatDiv=createElement(html,"outgoing");
  outgoingChatDiv.querySelector("p").textContent=userText;
  chatContainer.appendChild(outgoingChatDiv);
  setTimeout(showTypingAnimation,500);
}
sendButton.addEventListener("click" , handleOutgoingChat);




lightmode.addEventListener("click",function(){
    bod.classList.toggle("light-mode");
});


deletebtn.addEventListener("click",function(){
    location.reload();
})