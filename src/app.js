const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const logger = require('./middleware/logger')
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const errorHandler = require('./middleware/error');
const connectDb = require('./server');

//* load env
dotenv.config({ path: './config.env' });

//* connect db
connectDb();

//* route file
const auth = require('./routes/auth.routes');
const user = require('./routes/user.routes');
const role = require('./routes/role.routes');
const permission = require('./routes/permission.routes');
const pendingUser = require('./routes/pendingUser.routes');
const member = require('./routes/member.routes');
const company = require('./routes/company.routes');

const app = express();

//* file upload
app.use('/src/asset/upload', express.static('src/asset/upload'));

//* body paser
app.use(express.json());

//* cookie setup
app.use(cookieParser());

//* cors
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//* data sanitize
app.use(mongoSanitize());

const swaggerDocsOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Juncture Backend',
      version: '1.0.0',
    },
  },
  apis: ['server.js'], // files containing annotations as above
};

app.get('/', (req, res) => {
  res.send('Juncture ATS Backend');
});

//* swagger setup
const swaggerDocument = swaggerJsdoc(swaggerDocsOptions);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//* mount route
/**
 * @swagger
 */
app.use(`/api/v1/auth`, auth);
app.use(`/api/v1/user`, user);
app.use(`/api/v1/role`, role);
app.use(`/api/v1/permission`, permission);
app.use(`/api/v1/pendingUser`, pendingUser);
app.use('/api/v1/member', member);
app.use('/api/v1/company', company);
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
