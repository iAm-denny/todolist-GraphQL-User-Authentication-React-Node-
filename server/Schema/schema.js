const graphql = require('graphql')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const List = require('../model/List')


const createToken = (id,name) => {
    return jwt.sign({id,name}, 'toDoList', {
        expiresIn: "7d"
    })
}

const ListType = new graphql.GraphQLObjectType({
    name: "ListType",
    fields: () => ({
        id: {type: graphql.GraphQLID},
        header: { type: graphql.GraphQLString },
        context: { type:  graphql.GraphQLString },
        userId: { type: graphql.GraphQLID },
        user: {
            type:UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        }
    })
})

const UserType = new graphql.GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: graphql.GraphQLID },
        email: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
        name: {type: graphql.GraphQLString}
    })
});
const LoginType = new graphql.GraphQLObjectType({
    name: "Login",
    fields: () => ({
        id: {type: graphql.GraphQLID },
        email: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
        user: {
            type: UserType,
            resolve(parent , args) {
                return User.findOne({email: parent.email})
            }
        }
    })
});
const SingupType = new graphql.GraphQLObjectType({
    name: "SignUp",
    fields: () => ({
        email: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString}
    })
})

const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        lists: {
            type: new graphql.GraphQLList(ListType),
            args: { userId: { type: graphql.GraphQLID}},
            resolve(parent, args) {
                const { userId } = args
                return List.find({userId})
            }
        },
        login: {
            type: LoginType,
            args: { email: {type: graphql.GraphQLString}, password: { type: graphql.GraphQLString } },
            async resolve(parent, args, { res }) {
                const { email, password } = args
                const user = await User.findOne({email})
                if(user) {
                    const pwd =  await bcrypt.compare(password, user.password)
                    if(pwd) {
                        const token = createToken(user.id, user.name)
                        res.cookie("userId", token , {maxAge: 3*24*60*60*1000, httpOnly: true})
                        return user
               
                    }
                }
            }
        }, 
        user: {
            type: UserType,
            args: {id: {type: graphql.GraphQLID}},
            resolve(parent, args) {
                return User.findById(args.id)
            }
        }
    }
})

const Mutation = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields:{
        signup: {
            type: SingupType,
            args: { email: {type: graphql.GraphQLString}, password: { type: graphql.GraphQLString }, name: { type: graphql. GraphQLString } },
            resolve(parent, args) {
                const { email, password, name } = args
                    return  User.create({ email, password, name })
            }
        },
        addList: {
            type: ListType,
            args: {
                header: { type: graphql.GraphQLString },
                context: {type: graphql.GraphQLString},
                userId: {type: graphql.GraphQLID }
            },
          async resolve(parent, args) {
              const {header, context, userId} = args
            return await List.create({header, context, userId})
            }
        },
        deletelist: {
            type: ListType,
            args: {id: {type: graphql.GraphQLID}},
            resolve(parent, args) {
                return List.findByIdAndDelete(args.id)
            }
        }
    }
})
module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})