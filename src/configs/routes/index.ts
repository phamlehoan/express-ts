import { Router } from 'express';
import { homeController, devController } from '@controllers';
import { resource } from '../../lib/resource';

const path = Router();

path.get('/', homeController.index);
resource(path, 'dev', devController);

export default path;
