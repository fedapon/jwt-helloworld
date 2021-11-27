class UserEntity {
    private _id: Number = 0
    private _username: String = ''
    private _passwordHashed: String = ''

    constructor(username: String, password: String) {
        this._username = username
        this._passwordHashed = password
    }

    public setId (id: Number) {
        this._id = id
    }
    public getId () : Number {
        return this._id
    }

    public setUsername (username: String) {
        this._username = username
    }
    public getUsername () : String {
        return this._username
    }

    public setPassword (password: String) {
        this._passwordHashed = password
    }
    public verifyPassword (password: String) : Boolean {
        return (this._passwordHashed==password) ? true : false
    }

}

export default UserEntity