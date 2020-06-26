import { gql } from 'apollo-server-express'

export default gql`
 type Poll{
   id: ID!
   description: String
   image: String
   open: Boolean
   options: [Option!]!
   createdAt: String!
 }

 extend type Query {
  poll(id: ID!): Poll 
  polls:[Poll!]!
 }
 
 extend type Mutation {
  pollCreate(description: String, image: String!, options: [String!]!): Poll @auth
  pollEdit(id: ID!, description: String, image: String!): Poll @auth
  pollDelete(id: ID!): Poll @auth
 }
`