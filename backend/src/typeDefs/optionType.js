import { gql } from 'apollo-server-express'

export default gql`
 type Option{
   id: ID!
   description: String
   poll: Poll
   votes: [Vote!]!
 }

 extend type Query {
  option(id: ID!): Option
  options: [Option!]!
  getVotes: [Vote!]!
 }
 
 extend type Mutation {
  optionCreate(description: String, poll: ID): Option @auth
  optionEdit(id: ID!, name: String!, description: String): Option @auth
  optionDelete(id: ID!): Option @auth
 }
`