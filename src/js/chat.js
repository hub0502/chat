"use strict"
const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")
const displayContainer = document.querySelector(".display-container");

sendButton.addEventListener("click", ()=>{

  const params = {
    name: nickname.value,
    msg: chatInput.value,
  }
  socket.emit("chatting", params)
  console.log(params);
})

socket.on("chatting", (data)=>{
  const {name, msg, time} = data;
  const item = new LiModel(name, msg, time);
  item.makeLi();
  displayContainer.scrollTo(0, displayContainer.scrollHeight)
})

function LiModel(name, msg, time){
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = () =>{
    const li = document.createElement("li");
    li.classList.add(nickname.value === this.name ? "sent" : "received");
    const dom = ` <span class="profile">
    <span class="user">${this.name}</span>
    <img src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="any" class="image">
  </span>
  <span class="message">${this.msg}</span>
  <span class="time">${this.time}</span>`;
  li.innerHTML = dom;
  chatList.appendChild(li);
  }
}