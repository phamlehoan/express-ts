// src/configs/routes/api.ts
import { Router } from 'express';
import { categoryController, productController, customerController } from '../../app/controllers/api';

const apiRouter = Router();

// Category routes
apiRouter.get('/categories', categoryController.getAll);
apiRouter.post('/categories', categoryController.create);

// Product routes
apiRouter.get('/products', productController.getAll);
apiRouter.get('/products/:id', productController.getById);
apiRouter.post('/products', productController.create);
apiRouter.put('/products/:id', productController.update);
apiRouter.delete('/products/:id', productController.delete);

// Customer routes
apiRouter.get('/customers', customerController.getAll);
apiRouter.get('/customers/:id', customerController.getById);
apiRouter.post('/customers', customerController.create);
apiRouter.put('/customers/:id', customerController.update);
apiRouter.delete('/customers/:id', customerController.delete);

export default apiRouter;
