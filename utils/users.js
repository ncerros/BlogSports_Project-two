const users = [];

// The user will join the blog
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

// it will find current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// It will show when user leaves the blog
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// It will get rooms for the users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin, 
    userLeave, 
    getCurrentUser, 
    getRoomUsers
};