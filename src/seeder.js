const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// load env var
dotenv.config({ path: "src/config/config.env" });

// load model
const Assessment = require("./model/assessment");
const Company = require("./model/company");
const File = require("./model/file");
const Permission = require("./model/permission");
const Role = require("./model/role");
const Stage = require("./model/stage");
const { User } = require("./model/user");

// connect db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// // read json file
// const assessemnts = JSON.parse(fs.readFileSync(`${__dirname}/_data/assessment.json`, 'utf-8'))
// const companies = JSON.parse(fs.readFileSync(`${__dirname}/_data/company.json`, 'utf-8'))
// const files = JSON.parse(fs.readFileSync(`${__dirname}/_data/file.json`, 'utf-8'))
// const permissions = JSON.parse(fs.readFileSync(`${__dirname}/_data/permission.json`, 'utf-8'))
// const roles = JSON.parse(fs.readFileSync(`${__dirname}/_data/role.json`, 'utf-8'))
// const stages = JSON.parse(fs.readFileSync(`${__dirname}/_data/stage.json`, 'utf-8'))
// const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/user.json`, 'utf-8'))

// // import into to db
// const importData = async () => {
//   try {
//     await Assessment.create(assessemnts)
//     await Company.create(companies)
//     await file.create(files)
//     await Permission.create(permissions)
//     await Role.create(roles)
//     await Stage.create(stages)
//     await User.create(users)
//     console.log('Data Import'.green.inverse)
//     process.exit()
//   } catch (err) {
//     console.error(err)
//   }
// }

// delete into to db
const deleteData = async () => {
  try {
    await Assessment.deleteMany();
    await Company.deleteMany();
    await File.deleteMany();
    await Permission.deleteMany();
    await Role.deleteMany();
    await Stage.deleteMany();
    await User.deleteMany();
    console.log("Delete Data".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
