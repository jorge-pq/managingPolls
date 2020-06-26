import GraphQlScalarType from 'graphql'
import { Kind } from 'graphql/language'

export default {

    Date:() => {
        return new GraphQlScalarType({
            name: 'Date',
            description: 'Date custom',
            parseValue(value){
                return new Date(value);
            },
            serialize(value){
                return value.getTime();
            },
            parseLiteral(ast){
                if(ast.kind === Kind.INT){
                    return new Date(ast.value)
                }
                return null;
            }
        })
    }
}