import User from "../../domain/Auth/User.mjs";

class AuthRepository {

    constructor($conn) {
        this._conn = $conn;
    }

    /**
     * 
     * @param {string} login 
     * @param {string} password 
     */
    async userByLoginSenha(login, password) {

        const sql = `SELECT p.id, p.nome, u.login, u.email, u.senha FROM agendaLab.Pessoa p
            JOIN agendaLab.Usuario u ON (u.idPessoa = p.id)
            WHERE u.login = ? AND u.senha = MD5(?) LIMIT 1`
            ;

        const [rows] = await this._conn.execute(sql, [login, password]);

        let model = null
        if (rows.length) {

            const row = rows.shift(rows);
            model = new User(row.id, row.nome, row.login, row.senha, row.email);
        }

        return model
    }

    /**
     * @param {User} user 
     */
    async userSave(user) {

        try {

            await this._conn.beginTransaction();

            const sqlPessoa = `INSERT INTO agendaLab.Pessoa (nome, dataCadastro, horaCadastro)
            VALUES(?, CURDATE(), CURTIME())`;

            const [{ insertId }] = await this._conn.execute(sqlPessoa, [user.name]);

            user.id = insertId;
            user.hidePassword = !user.hidePassword;
            const paramters = [user.id, user.login, user.password, user.email];
            user.hidePassword = !user.hidePassword;

            const sqlUsuario = `INSERT INTO agendaLab.Usuario (idPessoa, login, senha, email)
            VALUES(?, ?, MD5(?), ?)`;

            await this._conn.execute(sqlUsuario, paramters);

            await this._conn.commit();
            return user;
        } catch (error) {

            await this._conn.rollback();
        }
    }
}

export default AuthRepository;