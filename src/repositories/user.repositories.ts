import UserEntity from './../entities/user.entities'

export default class userRepository {
    private _database: Array<UserEntity> = new Array()
    private _nextId : number = 0
    
    constructor () {
        let userAdmin = new UserEntity()
        userAdmin.setId( this.getNewId() )
        userAdmin.setUsername('admin')
        userAdmin.setPassword('admin')
        this._database.push(userAdmin)
    }

    private getNewId() : number {
        return ++this._nextId
    }

    public find () : UserEntity{
        const user = new UserEntity()
        return user
    }
    public findById () : UserEntity{
        const user = new UserEntity()
        return user
    }
    public create (user : UserEntity) : Number{
        
        return 1
    }
    public update () {}

    public delete () {}

}