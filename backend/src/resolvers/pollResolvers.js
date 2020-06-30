import mongoose from 'mongoose'
import { UserInputError, AuthenticationError } from 'apollo-server-express'
import { Poll, Option, Vote } from '../models'
import * as Auth from '../auth'

export default {
    Query: {
        poll: (root, { id }) => {

            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new UserInputError(`${id} is not a valid poll ID.`)
            }
            return Poll.findById(id)
        },
        polls: (root, args) => {
            return Poll.find({})
        }
    },
    Mutation: {
        pollCreate: async (root, args, { req }) => {

            const result = await Auth.userInRol(req.user.username, ["ADMIN", "POWER USER"]);
            if (result) {
                const parameters = { "description":args.description, "image": args.image} 
                const poll = await Poll.create(parameters)
                args.options.forEach(async item => {
                    const opts = { "description": item, "poll": poll}
                    const obj = await Option.create(opts)
                    await Poll.findByIdAndUpdate(poll.id, { $push: { options: obj } })
                });
                return poll
            }
            else {
                throw new AuthenticationError('No tiene acceso al recurso solicitado.')
            }
        },
        pollEdit: async (root, args, { req }) => {
            const result = await Auth.userInRol(req.user.username, ["ADMIN", "POWER USER"]);
            if (result) {
                if (!mongoose.Types.ObjectId.isValid(args.id)) {
                    throw new UserInputError(`${id} is not a valid poll ID.`)
                }
                const poll = await Poll.findByIdAndRemove(args.id)
                return poll
            }
            else {
                throw new AuthenticationError('No tiene acceso al recurso solicitado.')
            }
        },
        pollDelete: async (root, args, { req }) => {
            const result = await Auth.userInRol(req.user.username, ["ADMIN", "POWER USER"]);
            if (result) {
                if (!mongoose.Types.ObjectId.isValid(args.id)) {
                    throw new UserInputError(`${id} is not a valid poll ID.`)
                }
                const poll = await Poll.findByIdAndRemove(args.id)
                await Option.remove({'poll':args.id})
                await Vote.remove({'poll':args.id})
                return poll
            }
            else {
                throw new AuthenticationError('No tiene acceso al recurso solicitado.')
            }
        }
    },
    Poll: {
        options: async (poll, args, context, info) => {
            return (await poll.populate('options').execPopulate()).options
        },
    }
}