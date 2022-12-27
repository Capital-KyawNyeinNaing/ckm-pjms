const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const colors = require('colors');
var path = require('path');

// swagger imports
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// error handling
const errorHandler = require('./middleware/error');

// db
const connectDb = require('./server');

// load env
dotenv.config({ path: './config.env' });

// connect db
connectDb();

// route imports
const auth = require('./routes/auth.route');
const user = require('./routes/user.route');
const role = require('./routes/role.route');
const permission = require('./routes/permission.route');
const pendingUser = require('./routes/pendingUser.route');
const member = require('./routes/member.route');
const company = require('./routes/company.route');
const task = require('./routes/task.route');
const project = require('./routes/project.route');
const file = require('./routes/file.route');

const app = express();

// set static path
app.use('/images', express.static(path.join(__dirname, '../public/uploads/images')))

// body paser
app.use(express.json());

// cookie setup
app.use(cookieParser());

// cors
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// data sanitize
app.use(mongoSanitize());

// swagger setup
const swaggerDocument = YAML.load('./swagger.yaml');
app.use(
  '/api/v1/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);

// mount routes
app.get('/', (req, res) => {
  res.send(`Server is running ${process.env.NODE_ENV} mode. 🚀`);
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.use(`/api/v1/auth`, auth);
app.use(`/api/v1/user`, user);
app.use(`/api/v1/role`, role);
app.use(`/api/v1/permission`, permission);
app.use(`/api/v1/pendingUser`, pendingUser);
app.use('/api/v1/member', member);
app.use('/api/v1/company', company);
app.use('/api/v1/task', task);
app.use('/api/v1/project', project);
app.use('/api/v1/file', file);
app.use(errorHandler);

let PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
);

// handle unhandle promise rejection
process.on('unhandledRejection', (error, promise) => {
  console.log(`server error: ${error.message}`.red);
  // server close & process exit
  server.close(() => process.exit(1));
});
