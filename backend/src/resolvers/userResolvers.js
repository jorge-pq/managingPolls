import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { signUp, changePass } from '../schemas'
import { User } from '../models'
import * as Auth from '../auth'

export default {
    Query:{
        me: (root, args, { req }, info) => {

            return User.findOne({'username': req.user.username})                
        },
        users: async (root, args, { req }) => {
            const result = await Auth.userInRol(req.user.username, ["ADMIN"]);
            if (result) {
                return User.find({})

            }
            else {
                throw new AuthenticationError('Usted no es administrador del sitio.')
            }
        },
        user: async (root, { id }, { req }) => {
            const result = await Auth.userInRol(req.user.username, ["ADMIN"]);
            if (result) {
                if(!mongoose.Types.ObjectId.isValid(id)){
                    throw new UserInputError(`${id} is not a valid user ID.`)
                }
                return User.findById(id)
            }
            else {
                throw new AuthenticationError('Usted no es administrador del sitio.')
            }
           
        },
        roles: async (root, args, { req }) => {
            const result = await Auth.userInRol(req.user.username, ["ADMIN"]);
            if (result) {
                return Auth.Roles
            }
            else {
                throw new AuthenticationError('Usted no es administrador del sitio.')
            }       
        }
    },
    Mutation:{
        signUp: async (root, args, {res} ) => {

          const result = Joi.validate(args, signUp);
            if( result.error ) {
                return new UserInputError(result.error.details[0].context.label)
                }

            const user = await User.create(args)
            return user

        },
        signIn: async (root, args) => {
            const user = await Auth.attemptSignIn(args.username, args.password)
            const token = Auth.getToken(user)
            return token
        },
        changeAvatar: async(root, args, { req }) => {
            const user = await User.update({'username':args.username},{'avatar':args.avatar})

            return "Avatar updated!"   
        },    
        changeRol: async(root, args, { req }) => {
            const result = await Auth.userInRol(req.user.username, ["ADMIN"]);
            if (result) {
                const user = await User.update({'username':args.username},{'role':args.role})

                 return "Role updated!"
            }
            else {
                throw new AuthenticationError('Usted no es administrador del sitio.')
            }                 
        },    
        changePassword: async (root, args, { req }) => {

            await Joi.validate(args, changePass, { abortEarly: false })
            return Auth.changePassword(req.user.username,args.passwordOld, args.passwordNew)
        },
        userEdit: async (root,  args) => {
            const user = await User.update({'username':args.username},args)
            return "User updated!"
        },
        userDelete: async (root, args, { req }) => {
            const result = await Auth.userInRol(req.user.username, ["ADMIN"]);
            if (result) {
                return User.findByIdAndRemove(args.id)
            }
            else {
                throw new AuthenticationError('Usted no es administrador del sitio.')
            }       
                      
        }
    },
}