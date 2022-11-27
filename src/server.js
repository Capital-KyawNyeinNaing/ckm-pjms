const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

process.on('uncaughtException', (err) => {
  console.log(chalk.underline.red('UNCAUGHT EXCEPTION!!! shutting down...!!!'));
  console.log(err.name, err.message);
  process.exit(1);
});

const connectDB = async () => {
  const connection = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(
    chalk.underline.blue(`DB Connected to ${connection.connection.host}`)
  );
};

module.exports = connectDB;
