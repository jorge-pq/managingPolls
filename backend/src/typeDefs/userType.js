import { gql } from 'apollo-server-express'

export default gql`
 type User{
   id: ID!
   username: String!
   password: String!
   name: String!
   avatar: String
   role: String!
   email: String
   web: String
   city: String
   country: String
   phone: String
   createdAt: String!
 }

 type Role{
  name: String!
  description: String!
}

 extend type Query {
  me: User @auth
  user(id: ID!): User @auth
  users:[User!]! @auth
  roles: [Role!]! @auth
 }
 
 extend type Mutation {
  signUp(name: String!, username: String!, password: String!,email: String, web: String, city: String, phone: String, country: String): User
  signIn(username: String!, password: String!): String!
  changeRol(username: String!, role: String!): User @auth
  changePassword(passwordOld: String!, passwordNew: String!): User @auth
  changeAvatar(avatar: String!): User @auth
  userEdit(username: String!, name:String!,email: String, web: String, city: String, phone: String, country: String): User @auth
  userDelete(id: ID!): User @auth
 }
`