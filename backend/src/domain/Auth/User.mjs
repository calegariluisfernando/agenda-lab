class User {

    constructor(id, name, login, password, email) {

        this._id        = id;
        this._name      = name;
        this._login     = login;
        this._password  = password;
        this._email     = email;

        this._hidePassword = true;
    }

    get hidePassword() {
        return this._hidePassword;
    }

    set hidePassword(value) {
        this._hidePassword = false;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get login() {
        return this._login;
    }

    set login(value) {
        this._login = value;
    }

    get password() {

        if (this.hidePassword) return '';

        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    toArray() {
        
        let retorno = {};
        for (const item in this) {

            if (item === '_hidePassword') continue;
            const i = item.split('_').pop();

            retorno[i] = this[i]
        }

        return retorno;
    }
}

export default User;