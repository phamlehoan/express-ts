import { Router } from 'express';
import { homeController } from '@controllers';
import apiRouter from './api';

const path = Router();

path.get('/', homeController.index);
path.use('/api', apiRouter);

export default path;
