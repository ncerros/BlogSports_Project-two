const blogForm = document.getElementById('blog-form');
const blogMessages = document.querySelector('.blog-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// will find username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Joining  blogroom
socket.emit('joinRoom', { username, room });

// Go to room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// will  Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scrolling down
  blogMessages.scrollTop = blogMessages.scrollHeight;
});

// This will submit the message
blogForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // This will get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // This will sent message to server
  socket.emit('blogMessage', msg);

  // This will Clear all the input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// This action will message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.blog-messages').appendChild(div);
}

// Created room name and will be added to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Created users will be added to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//This will prompt the user before leaving blog room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('You are leaving the blogroom!');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});