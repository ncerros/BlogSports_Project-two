// const session = require('express-session');
// const routes = require('./routes');
// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);


const http = require('http');
const express = require('express');
const path = require('path');
const socketio =require('socket.io');

const server = http.createServer(app);
const app = express();
const io = cocketio(server);




const exphbs = require('express-handlebars');
const hbs = exphbs.create({  });

const PORT = process.env.PORT || 3001;

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'publicblog')));

// Run when the user connetcs
io.on('connection', socket => {
  console.log('New WS Connection');

  socket.emit('message', 'Welcome to BlogSports');

  // broadcating when users connect
  socket.broadcast.emit('message', 'A user has joined the blog');

  

});
// app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Blog Sports  is LIVE on http://localhost:${PORT}`));
});

