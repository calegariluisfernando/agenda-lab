import express, { json, urlencoded } from 'express';
import cors from 'cors';

import indexRouter from './src/application/routes/index/index.mjs';
import usersRouter from './src/application/routes/users/users.mjs';

const app = express();

app.use(json());''
app.use(urlencoded({ extended: false }));
app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.use(cors());
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;