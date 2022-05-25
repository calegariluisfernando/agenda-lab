import { Router } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../../../domain/Auth/User.mjs';
import AuthRepository from '../../../infrastructure/Auth/AuthRepository.mjs';
import connection from '../../../infrastructure/connection.mjs';

const router = Router();

/* GET users listing. */
router.post('/auth/login', async function (req, res, next) {

  const repo = new AuthRepository(connection);
  const { login, password } = req.body;

  const user = await repo.userByLoginSenha(login, password);
  const date = new Date();

  if (!user) {

    return res.json({ status: false, data: { message: 'User not found.' } });
  }

  const token = jsonwebtoken.sign(
    {
      user: user.toArray()
    },
    process.env.SECRET_TOKEN_KEY,
    {
      algorithm: 'HS256',
      expiresIn: '1 days',
      jwtid: uuidv4()
    }
  );

  const data = {
    user: user.toArray(),
    token,
    tokenCreatedAt: date.getTime(),
    tokenExpirationAt: new Date(date.getTime() + (60 * 60 * 24 * 1000)).getTime()
  }

  return res.json({ code: 200, data });
});

router.post('/save', async function (req, res, next) {

  const repo = new AuthRepository(connection);
  const { nome, login, senha, confirmSenha, email } = req.body;

  const model = new User(0, nome, login, senha, email);
  const user  = await repo.userSave(model);

  return res.json(user.toArray());
});

export default router;
