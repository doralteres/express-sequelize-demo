/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  // Load environment variables from .env file in non prod environments
  require('dotenv').config();
}

import indexRouter from './routes/index';
import { DB, createModels } from './models';

const app = express();

DB()
  .then(async (db) => {
    app.use(logger('dev'));
    app.use(express.json());

    /**
     * Connect DB & SYNC
     */
    createModels(db);
    try {
      if (process.env.SYNC_DB) {
        await db.sync(
          process.env.SYNC_DB === 'force' ? { force: true } : { alter: true },
        );
      }
      app.set('db', db);
    } catch (error) {
      console.error('Failed to sync DB:', error);
      throw new Error(error);
    }

    app.use(cookieParser(process.env.COOKIE_SECRET));

    if (process.env.WHITELISTED_DOMAINS) {
      //Add the client URL to the CORS policy
      const whitelist = process.env.WHITELISTED_DOMAINS
        ? process.env.WHITELISTED_DOMAINS.split(',')
        : [];

      const corsOptions = {
        origin: function (origin, callback) {
          if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(new Error(`Not allowed by CORS origin [${origin}]`));
          }
        },

        credentials: true,
      };

      app.use(cors(corsOptions));
    }

    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join('.', 'public')));

    app.use('/', indexRouter);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      next(createError(404));
    });

    // error handler
    app.use((err: any, req: Request, res: Response) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
    app.emit('ready');
  })
  .catch((e) => console.error(e));

export default app;
