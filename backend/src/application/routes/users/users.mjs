import { Router } from 'express';
import UserRepository from '../../../infrastructure/Auth/UserRepository.mjs';
import connection from '../../../infrastructure/connection.mjs';

const router = Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {

  const repo = new UserRepository(connection);
  const users = await repo.userByLoginSenha('lfccalegari', '123');

  return res.json({ users: users.toArray() });
});

export default router;
