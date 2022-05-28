class TipoUsuario {

    constructor(codigo, descricao) {

        this._codigo = codigo;
        this._descricao = descricao;
    }

    /**
     * @returns number
     */
    get codigo () {
        return this._codigo;
    }

    /**
     * @param {number} value
     */
    set codigo (value) {
        this._codigo = value;
    }

    /**
     * @returns string
     */
    get descricao () {
        return this._descricao;
    }

    /**
     * @param {string} value
     */
    set descricao (value) {
        this._descricao = value;
    }

    /**
     * @returns {}
     */
    toArray() {

        let retorno = {};
        for (const item in this) {

            const i = item.split('_').pop();

            retorno[i] = typeof this[i] === 'object' 
                ? this[i].toArray()
                : this[i];
        }

        return retorno;
    }
}

export default TipoUsuario;