import { Router } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { v4 as uuidv4} from 'uuid';
import UserRepository from '../../../infrastructure/Auth/UserRepository.mjs';
import connection from '../../../infrastructure/connection.mjs';

const router = Router();

/* GET users listing. */
router.post('/login', async function (req, res, next) {

  const repo  = new UserRepository(connection);
  const {login, password} = req.body;

  const user = await repo.userByLoginSenha(login, password);

  if (!user) {

    return res.json({ status: false, resultSet: { error: 'User not found.'}});
  }

  const token = jsonwebtoken.sign({ user }, process.env.SECRET_TOKEN_KEY, { expiresIn: '1 days', jwtid: uuidv4() });

  return res.json({ status: true, resultSet: { user: user.toArray(), token } });
});

export default router;
