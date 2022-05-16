import { Router } from 'express';
import connection from '../../../infrastructure/connection.mjs';

const router = Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {

  const [fileds] = await connection.execute('select * from usuario');
  console.log('fields', fileds);

  res.send('respond with a resource');
});

export default router;
