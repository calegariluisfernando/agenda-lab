import { Router } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import TipoUsuario from '../../../domain/Auth/TipoUsuario.mjs';
import User from '../../../domain/Auth/User.mjs';
import AuthRepository from '../../../infrastructure/Auth/AuthRepository.mjs';
import connection from '../../../infrastructure/connection.mjs';
import UserRepository from '../../../infrastructure/User/UserRespository.mjs';
import ResponseUtil from '../../util/ResponseUtil.mjs';

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

  return res.json(ResponseUtil.responseWithData(data));
});

router.post('/save', async function (req, res, next) {

  const repo = new UserRepository(connection);
  const { senha, confirmSenha, email, nome, login, tipoUsuario } = req.body;

  const model = new User(0, senha, email, nome, login, new TipoUsuario(tipoUsuario));
  const user  = await repo.userSave(model);

  return res.json(ResponseUtil.responseWithData(user.toArray()));
});

router.get('/tipos-usuarios', async function(req, res, next) {
  
  const repo = new UserRepository(connection);
  const tiposUsuarios = await repo.getAllTiposUsuarios();
  
  const t = tiposUsuarios.map(e => e.toArray());
  return res.json(ResponseUtil.responseWithData(t));
});

export default router;
