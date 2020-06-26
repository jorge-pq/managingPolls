import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { Vote } from '../models'

export default {

    Mutation: {
        toVote: async (root, args, { req }) => {
           
            const vote = await Vote.create(args)
            return vote
         
        },
        voteEdit: async (root, args, { req }) => {
          
            return Vote.findByIdAndUpdate(args.id, args)
                    
        }
    }
}