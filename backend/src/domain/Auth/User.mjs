import TipoUsuario from "./TipoUsuario.mjs";

class User {

    /**
     * 
     * @param {number} codigo 
     * @param {string} senha 
     * @param {string} email 
     * @param {string} nome 
     * @param {string} login 
     * @param {TipoUsuario} tipoUsuario 
     */
    constructor(codigo, senha, email, nome, login, tipoUsuario) {

        this._codigo = codigo;
        this._senha = senha;
        this._email = email;
        this._nome = nome;
        this._login = login;
        this._tipoUsuario = tipoUsuario
        
        this._hidePassword = true;
    }

    /**
     * @returns boolean
     */
    get hidePassword() {
        return this._hidePassword;
    }

    /**
     * @param {boolean} value
     */
    set hidePassword(value) {
        this._hidePassword = false;
    }

    /**
     * @returns number
     */
    get codigo() {
        return this._codigo;
    }

    /**
     * @param {number} value
     */
    set codigo(value) {
        this._codigo = value;
    }

    /**
     * @returns number
     */
    get codigo() {
        return this._codigo;
    }

    /**
     * @param {number} value
     */
    set codigo(value) {
        this._codigo = value;
    }

    /**
     * @returns string
     */
    get senha() {

        if (this.hidePassword) return '';
        return this._senha;
    }

    /**
     * @param {string} value
     */
    set senha(value) {
        this._senha = value;
    }

    /**
     * @returns string
     */
    get email() {
        return this._email;
    }

    /**
     * @param {string} value
     */
    set email(value) {
        this._email = value;
    }

    /**
     * @returns string
     */
    get nome () {
        return this._nome;
    }

    /**
     * @param {string} value
     */
    set nome(value) {
        this._nome = value;
    }

    /**
     * @returns string
     */
    get login () {
        return this._login;
    }

    /**
     * @param {string} value
     */
    set login(value) {
        this._login = value
    }

    /**
     * @returns TipoUsuario
     */
    get tipoUsuario() {
        return this._tipoUsuario;
    }

    /**
     * @param {TipoUsuario} value
     */
    set tipoUsuario(value) {
        this._tipoUsuario = value
    }

    
    toArray() {
        
        let retorno = {};
        for (const item in this) {

            if (item === '_hidePassword') continue;
            const i = item.split('_').pop();

            retorno[i] = typeof this[i] === 'object' 
                ? this[i].toArray()
                : this[i];
        }

        return retorno;
    }
}

export default User;