import chalk from 'chalk';
import MessageModel from '../models/message.model.js';
import ConversationModel from '../models/conversation.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await ConversationModel.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new MessageModel({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        console.log(chalk.hex('#03befc').bold("~ Sent a message!"));
        res.status(201).json(newMessage);
    }
    catch (err) {
        console.log(chalk.hex('#ff0000').bold("~ Error while sending a message!"));
        console.log(err.message);
        res.status(500).json({ error: 'Internal Server Error!' });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if(!conversation) {
            return res.status(200).json([]);
        }

        const messagesWithUser = conversation.messages;

        res.status(200).json(messagesWithUser);
    }
    catch (err) {
        console.log(chalk.hex('#ff0000').bold("~ Error while getting messages!"));
        console.log(err.message);
        res.status(500).json({ error: 'Internal Server Error!' });
    }
}