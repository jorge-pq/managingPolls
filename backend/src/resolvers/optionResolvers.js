import mongoose from 'mongoose'
import { UserInputError, AuthenticationError } from 'apollo-server-express'
import { Option } from '../models'
import * as Auth from '../auth'

export default {
    Query: {
        option: (root, { id }) => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new UserInputError(`${id} is not a valid option ID.`)
            }
            return Option.findById(id)
        },
        options: (root, args) => {

            return Option.find({})
        }
    },
    Mutation: {
        optionCreate: async (root, args, { req }) => {

            const result = await Auth.userInRol(req.user.username, ["ADMIN", "POWER USER"]);
            if (result) {
                const option = await Option.create(args)
                return option
            }
            else {
                throw new AuthenticationError('No tiene acceso al recurso solicitado.')
            }
        },
        optionEdit: async (root, args, { req }) => {
            const result = await Auth.userInRol(req.user.username, ["ADMIN", "POWER USER"]);
            if (result) {
                if (!mongoose.Types.ObjectId.isValid(args.id)) {
                    throw new UserInputError(`${id} is not a valid option ID.`)
                }
                const option = await Option.findByIdAndUpdate(args.id, args)
                return option
            }
            else {
                throw new AuthenticationError('No tiene acceso al recurso solicitado.')
            }
        },
        optionDelete: async (root, args, { req }) => {
            const result = await Auth.userInRol(req.user.username, ["ADMIN", "POWER USER"]);
            if (result) {
                if (!mongoose.Types.ObjectId.isValid(args.id)) {
                    throw new UserInputError(`${id} is not a valid option ID.`)
                }
                const option = await Option.findByIdAndRemove(args.id)
                return option
            }
            else {
                throw new AuthenticationError('No tiene acceso al recurso solicitado.')
            }
        }
    },
    Option: {
        votes: async (option, args, context, info) => {
            let lista = (await option.populate('votes').execPopulate()).votes   
            return lista
        }
    }
}