const Message = require('../Models/userChatMessage');
const SelectedUsers = require('../Models/userSelected');
const AnnouncementModel = require("../Models/ApartmentAnnouncementsModel");
const Apartment= require("../Models/ApartmentUserModel");

let users={}
class Iointialize {
    constructor() {
        this.io = null;
    }
    initSocket(io) {
        console.log("hit");
        this.io = io;
        io.on('connection', async (socket) => {
            console.log(`${socket.id} is connected`);

            socket.on('identify', async ({ username, aptId }) => {
                users[username] = socket.id;
                console.log(`${username} was from apt :${aptId} identified with socket: ${socket.id}`);
                socket.username = username;
                socket.aptId = aptId;

                const uniqueUsers = await Apartment.distinct('username', { apartment_id: aptId });
                io.emit('user-list', uniqueUsers);
            })


            socket.on('get-selected-users', async ({ username, aptId }) => {
                try {
                    if (!username || username.trim() === '') {
                        console.error('Invalid username received');
                        socket.emit('load-selected-users', ['groupchat']);
                        return;
                    }
                    const user = await SelectedUsers.findOne({ username, aptId });
                    if (user) {
                        console.log(user);
                        socket.emit('load-selected-users', user.selectedUsers);
                    } else {
                        socket.emit('load-selected-users', ['groupchat']);
                    }
                } catch (error) {
                    console.error('Error fetching selected users:', error);
                }
            });


            socket.on('save-selected-users', async ({ username, selectedUsers, aptId }) => {
                try {
                    let existingUser = await SelectedUsers.findOne({ username, aptId });
                    if (existingUser) {
                        existingUser.selectedUsers = selectedUsers;
                        await existingUser.save();
                    } else {
                        const newUser = new SelectedUsers({ username, selectedUsers, aptId });
                        await newUser.save();
                    }
                    console.log(`Selected users for ${username} in aptId:${aptId} saved successfully`);
                } catch (error) {
                    console.error('Error saving selected users:', error);
                }
            });

            socket.on('priv-chat-msgs', async (msg) => {
                console.log(`${socket.id} sent a private message to ${msg.to}:`, msg);
                if (users[msg.to]) {
                    socket.to(users[msg.to]).emit('priv-chat-msgs', msg);
                }
                const newMessage = new Message({
                    userId: msg.userId,
                    to: msg.to,
                    msg: msg.msg,
                    // aptId:socket.aptId,
                    aptId: msg.aptId,
                });
                try {
                    await newMessage.save();
                }
                catch (error) {
                    console.error(error)
                }
            });


            socket.on('get-priv-chat-history', async ({ from, to, aptId }) => {
                try {
                    const messages = await Message.find({
                        $or: [
                            { userId: from, to: to, aptId: aptId },
                            { userId: to, to: from, aptId: aptId }
                        ]
                    }).sort({ timestamp: 1 });
                    socket.emit('priv-chat-history', messages);
                } catch (error) {
                    console.error('Error fetching private chat history:', error);
                }
            });




            socket.on('get-grp-chat-history', async ({ to, aptId }) => {
                try {
                    const messages = await Message.find({
                        to: to, aptId: aptId,
                    }).sort({ timestamp: 1 });
                    socket.emit('grp-chat-history', messages);
                } catch (error) {
                    console.error('Error fetching group chat history:', error);
                }
            });


            socket.on('chat-msgs', async (msg) => {
                console.log(`${socket.id} said: `, msg);
                io.emit('chat-msgs', msg);
                const newMessage = new Message({
                    userId: msg.userId,
                    to: 'groupchat',
                    msg: msg.msg,
                    // aptId:socket.aptId,
                    aptId: msg.aptId,

                }); try {
                    await newMessage.save()
                } catch (error) {
                    console.error(error)
                }
            });



            socket.on('disconnect', () => {
                console.log(`${socket.id} disconnected`)
            });


        });
    }

}
module.exports = Iointialize;
