import TipoUsuario from "../../domain/Auth/TipoUsuario.mjs";
import User from "../../domain/Auth/User.mjs";

class UserRepository {

    constructor($conn) {
        this._conn = $conn;
    }

    /**
    * @param {User} user 
    * @returns User
    */
    async userSave(user) {

        const estadoAnteriorUsuario = user.hidePassword;
        user.hidePassword = false;
        const sql = `INSERT INTO usuario(usu_senha, usu_email, usu_nome, usu_login, tip_codigo)
                VALUES(?,?,?,?,?)`;

        const [ { insertId } ] = await this._conn.execute(sql, [user.senha, user.email, user.nome, user.login, user.tipoUsuario.codigo]);

        user.id = insertId;
        user.hidePassword = estadoAnteriorUsuario;

        return user;
    }

    /**
     * @returns TipoUsuario[]
     */
    async getAllTiposUsuarios() {

        const sql = `SELECT tip_codigo, tip_descricao FROM agendaLab.tipousuario`;
        const [ tiposUsuarios ] = await this._conn.execute(sql);

        const retorno = [];
        for (const tipoUsuario of tiposUsuarios) {
            
            retorno.push(new TipoUsuario(tipoUsuario.tip_codigo, tipoUsuario.tip_descricao));
        }

        return retorno;
    }
}

export default UserRepository;