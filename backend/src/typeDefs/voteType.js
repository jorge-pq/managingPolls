import { gql } from 'apollo-server-express'

export default gql`
 type Vote{
   id: ID!
   option: Option!
   user: User!
   poll: Poll!
   createdAt: Date!
   updatedAt: Date!
 }

 extend type Mutation {
  toVote(poll: ID!, option: ID!, user: String!): Vote @auth
  voteEdit(option: ID!, user: ID!): Vote @auth 
 }
`