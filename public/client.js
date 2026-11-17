/**
 * @project FastekDot Real-Time Chat Client
 * @author Rana Yasir Mahy Ud Din
 * @website https://ranayasir.unaux.com/
 * @company FastekDot (https://www.fastekdot.com)
 */

const socket = io();

const joinScreen = document.getElementById('join-screen');
const chatScreen = document.getElementById('chat-screen');
const joinForm = document.getElementById('join-form');
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const roomNameDisplay = document.getElementById('room-name');
const usersList = document.getElementById('users-list');
const msgInput = document.getElementById('msg-input');
const typingIndicator = document.getElementById('typing-indicator');
const leaveBtn = document.getElementById('leave-btn');

let currentUser = '';
let typingTimeout;

// Join Workspace
joinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const room = document.getElementById('room').value;

  if (!username) return;
  currentUser = username;

  socket.emit('joinRoom', { username, room });

  joinScreen.classList.add('hidden');
  chatScreen.classList.remove('hidden');
});

// Update Room & Active Users List
socket.on('roomUsers', ({ room, users }) => {
  roomNameDisplay.textContent = `#${room}`;
  usersList.innerHTML = users
    .map(
      (u) => `
      <li class="flex items-center gap-2 text-slate-200">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
        <span>${u.username} ${u.id === socket.id ? '(You)' : ''}</span>
      </li>`
    )
    .join('');
});

// Receive & Render Messages
socket.on('message', (data) => {
  const div = document.createElement('div');

  if (data.isSystem) {
    div.className = 'text-center text-xs text-slate-400 my-2';
    div.innerHTML = `<span class="bg-slate-900/80 px-3 py-1 rounded-full">${data.text} • ${data.time}</span>`;
  } else {
    const isSelf = data.senderId === socket.id;
    div.className = `flex flex-col ${isSelf ? 'items-end' : 'items-start'}`;
    div.innerHTML = `
      <div class="max-w-md px-4 py-2.5 rounded-2xl ${
        isSelf ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-100 rounded-bl-none'
      }">
        <div class="flex items-center justify-between gap-4 mb-1">
          <span class="text-xs font-bold ${isSelf ? 'text-indigo-200' : 'text-indigo-400'}">${data.username}</span>
          <span class="text-[10px] opacity-75">${data.time}</span>
        </div>
        <p class="text-sm leading-relaxed break-words">${escapeHTML(data.text)}</p>
      </div>
    `;
  }

  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Send Message
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = msgInput.value.trim();
  if (!msg) return;

  socket.emit('chatMessage', msg);
  socket.emit('typing', false);
  msgInput.value = '';
  msgInput.focus();
});

// Handle Typing Events
msgInput.addEventListener('input', () => {
  socket.emit('typing', true);
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    socket.emit('typing', false);
  }, 1200);
});

socket.on('userTyping', ({ username, isTyping }) => {
  typingIndicator.textContent = isTyping ? `${username} is typing...` : '';
});

// Leave Room
leaveBtn.addEventListener('click', () => {
  window.location.reload();
});

// Basic XSS Protection
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag]));
}