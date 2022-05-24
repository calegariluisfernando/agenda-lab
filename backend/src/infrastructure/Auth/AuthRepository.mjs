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
            
        const [ rows ] = await this._conn.execute(sql, [login, password]);

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

        const sql = `INSERT INTO agendaLab.Pessoa (nome, dataCadastro, horaCadastro)
            VALUES(?, CURDATE(), CURTIME())`;

        const [ rows ] = await this._conn.execute(sql, [ user.name ]);
        
        // INSERT INTO agendaLab.Usuario (idPessoa, login, senha, email)
        // VALUES(?, ?, ?, ?)

        return rows
    }
}

export default AuthRepository;