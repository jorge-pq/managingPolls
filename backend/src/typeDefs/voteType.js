import { gql } from 'apollo-server-express'

export default gql`
 type Vote{
   id: ID!
   option: Option!
   user: [User!]!
   createdAt: String!
   updateAt: String!
 }

 extend type Mutation {
  toVote(option: ID!, user: ID!): Vote @auth
  voteEdit(option: ID!, user: ID!): Vote @auth 
 }
`