import { Router } from 'express';
import { homeController, devController, authController } from '@controllers';
import { resource } from '../../lib/resource';

const path = Router();

path.get('/', homeController.index);
path.post('/auth/login', authController.login);
path.post('/auth/re-login', authController.refreshToken);
path.post('/auth/forgot-password', authController.forgotPassword);
path.post('/auth/recover-password', authController.recoverPassword);


resource(path, 'dev', devController);

export default path;
