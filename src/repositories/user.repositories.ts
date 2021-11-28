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

    public create (user : UserEntity) : UserEntity{
        user.setId(this.getNewId())
        this._database.push(user)
        return user
    }

    public findById (id: Number) : UserEntity{
        const userFound = this._database.find( (user)=>{
            return (user.getId()==id)
        })
        return userFound as UserEntity
    }

    public findByUsername (username: String) : UserEntity{
        const userFound = this._database.find( (user)=>{
            return (user.getUsername()==username)
        })
        return userFound as UserEntity
    }

    public update (user : UserEntity) {
        const newUserList = this._database.filter((item=> {
            return (user.getId() != item.getId())
        }))
        newUserList.push(user)
        this._database = [...newUserList]
    }

    public delete (id: Number) {
        const newUserList = this._database.filter((user=> {
            return (id != user.getId())
        }))
        this._database = [...newUserList]
    }

}