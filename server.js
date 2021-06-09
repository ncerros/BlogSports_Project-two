const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'publicblog')));

const botName = 'SportsBlog';

// It will stablish connection when user runs the page
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // It will welcome the each user that join the room
    socket.emit('message', formatMessage(botName, 'Welcome to SportsBlog!'));

    // It will broadcast the connection of a new user
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the blog`)
      );

    // Provide the user the room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // User will get the blogMessage
  socket.on('blogMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // It will show a message when user disconnets
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the blog`)
      );

      // will take the user and provide the room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 3001

server.listen(PORT, () => console.log(` SportsBlog  is LIVE on http://localhost:${PORT}`));



// const session = require('express-session');
// const routes = require('./routes');
// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({  });

// const PORT = process.env.PORT || 3001;

// // Configure and link a session object with the sequelize store
// const sess = {
//   secret: 'Super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'publicblog')));

// // Run when the user connetcs
// io.on('connection', socket => {
//   console.log('New WS Connection');

//   socket.emit('message', 'Welcome to BlogSports');

//   // broadcating when users connect
//   socket.broadcast.emit('message', 'A user has joined the blog');

  

// });
// // app.use(routes);

// // turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Blog Sports  is LIVE on http://localhost:${PORT}`));
// });

