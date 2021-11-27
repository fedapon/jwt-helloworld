import UserEntity from './../entities/user.entities'

export default class userRepository {
    private _database: Array<UserEntity> = new Array()
    private _nextId : number = 0
    
    constructor () {
        let userAdmin = new UserEntity('admin','admin')
        userAdmin.setId( this.getNewId() )
        this._database.push(userAdmin)
    }

    private getNewId() : number {
        return ++this._nextId
    }

    public findByUsername (username: String) : UserEntity{
        const userFound = this._database.find( (user)=>{
            return (user.getUsername()==username)
        })
        return userFound as UserEntity
    }
    public create (user : UserEntity) : UserEntity{
        user.setId(this.getNewId())
        this._database.push(user)
        return user
    }
    public update () {}

    public delete () {}

}