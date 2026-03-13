import express from 'express';
import path from 'path';
import routes from './routes';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
const projectRoot = process.cwd();
app.set('views', path.join(projectRoot, 'src', 'app', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
