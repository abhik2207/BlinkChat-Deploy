import chalk from 'chalk';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signupUser = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match!" });
        }

        const userExists = await UserModel.findOne({ username });
        if (userExists) {
            return res.status(409).json({ error: "User already exists!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new UserModel({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePicture: gender === 'male' ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            await generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            console.log(chalk.hex('#03befc').bold("~ Signed up an user!"));
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilePicture: newUser.profilePicture
            });
        }
        else {
            return res.status(400).json({ error: "Invalid user data!" });
        }
    }
    catch (err) {
        console.log(chalk.hex('#ff0000').bold("~ Error while signing up an user!"));
        console.log(err.message);
        res.status(500).json({ error: 'Internal Server Error!' });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        generateTokenAndSetCookie(user._id, res);

        console.log(chalk.hex('#03befc').bold("~ Logged in an user!"));
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            profilePicture: user.profilePicture
        });
    }
    catch (err) {
        console.log(chalk.hex('#ff0000').bold("~ Error while logging in an user!"));
        console.log(err.message);
        res.status(500).json({ error: 'Internal Server Error!' });
    }
}

export const logoutUser = (req, res) => {
    try {
        res.cookie('jwt', "", { maxAge: 0 });
        console.log(chalk.hex('#03befc').bold("~ Logged out an user!"));
        res.status(200).json({message: "Logged out successfully!"})
    }
    catch (err) {
        console.log(chalk.hex('#ff0000').bold("~ Error while logging out an user!"));
        console.log(err.message);
        res.status(500).json({ error: 'Internal Server Error!' });
    }
}