import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {IN_PROD, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, SECRET} from './config';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import jwt from 'jsonwebtoken';
import schemaDirectives from './directives';

var mongoose = require('mongoose');

(async ()=>{

  try {

    await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
     const app = express();
     app.use(cors());
  
     const addUser = async  (req) => {

      const token = req.headers.authorization
      try {
       const { user } = await jwt.verify(token, SECRET)
       req.user = user
      } catch (error) {
        console.log(error)
      }
      req.next()
    }

    app.use(addUser);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD ? false : {
        settings:{
          'request.credentials':'include'
        }
      },
      context:({req, res}) => ({req, res })
    })
  
    server.applyMiddleware({ app, path: '/graphql' });
  
    app.listen({ port: 8000 }, () => {
      console.log('Apollo Server on http://localhost:8000/graphql');
    })
  
  } catch (e) {
    console.error(e)
  }
})()
