import chalk from 'chalk';
import UserModel from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const allOtherUsers = await UserModel.find({ _id: { $ne: loggedInUserId} }).select('-password');

        res.status(200).json(allOtherUsers);
    }
    catch (err) {
        console.log(chalk.hex('#ff0000').bold("~ Error while users list!"));
        console.log(err.message);
        res.status(500).json({ error: 'Internal Server Error!' });
    }
}