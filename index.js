import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routerApi from './routes/index';
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from './middlewares/error.handler';
const port = process.env.PORT || 3000;

const app = express();
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS
/* var allowlist = ['http://example1.com', 'http://example2.com'];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
}; */

/* app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
  })
); */

/* app.use(
  cors({
    origin: '*',
  })
);
 */

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

//ROUTES
routerApi(app);

//MIDDLEWARES
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

/*
app.get('/products', (req, res) => {
  const { limit } = req.query; //http://localhost:3000/products?limit=5
  const products = [];
  for (let i = 0; i < (limit || 10); i++) {
    // Suponiendo que nuestro límite por defecto es 10
    products.push({
      companyName: faker.company.companyName(),
      productName: faker.commerce.productName(),
      productPrice: Number(faker.commerce.price()),
      productImage: faker.image.imageUrl(),
    });
  }
  res.json({
    limit: limit || 'No limit defined',
    data: products,
  });
});

app.get('/products/filter', (req, res) => {
  res.send('soy un filtro');
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'iPhone X3',
    price: 32000,
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

app.get('/categories/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json({
    categoryId,
    category: 'Computers & Accesories',
  });
});

app.get('/people', (req, res) => {
  res.json([
    {
      name: 'Arturo',
      type: 'employee',
    },
    {
      name: 'Jimena',
      type: 'customer',
    },
  ]);
});

app.get('/people/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Arturo',
    type: 'employee',
  });
});
*/
