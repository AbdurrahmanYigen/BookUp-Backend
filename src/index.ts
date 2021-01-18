// tslint:disable-next-line: no-var-requires
require('dotenv-safe').config();
import express, { Request, Response } from 'express';
import "reflect-metadata"
import { createDatabaseConnection } from './util/createDatabaseConnection';
import * as bodyParser from 'body-parser';
const port: number = Number(process.env.PORT);

export const startServer = async () => {
  try {
    const app = express()
    const dbConnection = await createDatabaseConnection();
    app.use(bodyParser.json());
    app.get('/', async (_: Request, res: Response) => {
      res.send('Hello world');
    });

    const server = app.listen(port, () => console.log(`Server is running on port ${port}`));
    return { server, dbConnection };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// tslint:disable-next-line: no-floating-promises
startServer();
