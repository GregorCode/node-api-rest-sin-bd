import productsRouter from './products.router';
import usersRouter from './users.router';
import categoriesRouter from './categories.router';

const express = require('express');

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);

  /*  const router = express.Router();
  app.use('/api/v2', router); */
};

export default routerApi;
