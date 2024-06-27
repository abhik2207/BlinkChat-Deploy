import mongoose from "mongoose";
import chalk from 'chalk';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(chalk.hex('#00ff00').bold(`<--- DATABASE CONNECTED SUCCESSFULLY --->`));
    }
    catch(err) {
        console.log(chalk.hex('#ff0000').bold("Error while connecting to MONGODB!"));
        console.log(err);
    }
}

export default connectDB;