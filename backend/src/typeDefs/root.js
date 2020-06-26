import { gql } from 'apollo-server-express'

export default gql`
  directive @auth on FIELD_DEFINITION
 
  scalar Date

  type Query {
  _: String
 }
 
  type Mutation {
  _: String
 }

 type Subscription {
  _: String
 }
`