import mongoose from 'mongoose'
import GraphQlScalarType from 'graphql'
import { UserInputError } from 'apollo-server-express'
import { Vote, User, Option } from '../models'

export default {

    Mutation: {
        toVote: async (root, args, { req }) => {
 
            const userId = (await User.findOne({'username': req.user.username})).id
            const arr = { "poll": args.poll, "user": userId}
 
            const result = await Vote.findOne(arr)
            if(result==null)
            {
                const variables = { "poll": args.poll, "option":args.option, "user": userId}
                const vote = await Vote.create(variables)
                await Option.findByIdAndUpdate(args.option, { $push: { votes: vote } })
                return vote
            }
            else{
                return new UserInputError("You have a vote for this poll")
            }  
        },
        voteEdit: async (root, args, { req }) => {
          
            return Vote.findByIdAndUpdate(args.id, args)
                    
        }
    },
    Vote: {
        user: async (vote, args, context, info) => {
            return (await vote.populate('user').execPopulate()).user
        }
    }
}