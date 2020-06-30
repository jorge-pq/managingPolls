import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { User } from './models'
import { SECRET } from './config'
import { hash } from 'bcryptjs'

export const attemptSignIn = async (username, password) => {

    const message = 'Usuario o contraseña incorrectos. Intente nuevamente.'
    const user = await User.findOne({ username })
    if (!user) {
        throw new AuthenticationError(message)
    }
    if (!await user.matchesPassword(password)) {
        throw new AuthenticationError(message)
    }
    return user
}

export const ensureSignedIn = req => {

    try {
        const id = req.user.id
    } catch (e) {
        throw new AuthenticationError('Usted debe estar autenticado.')
    }
}

export const userInRol = async (username, roles) => {

    const user = await User.findOne({ username })
    var result = false;
    var i = 0
    var flag = false
    while(i<roles.length && !flag){
        if(user.role==roles[i]) {
            result = true
            flag = true;
        }
        i++;
    }
   
   return result;
}

export const changePassword = async (username, passwordOld, passwordNew) => {

    const password = passwordOld;
    const user = await User.findOne({username})
    if (!await user.matchesPassword(password)) {
        throw new AuthenticationError("Contraseña incorrecta")
    }
    const pass = await hash(passwordNew, 10)
    user.password = pass
    return User.findOneAndUpdate({username}, user)
}

export const getToken = async (user) => {

    const token = jwt.sign({
            user: _.pick(user, ['username', 'role']),
        },
        SECRET, {
            expiresIn: '1y',
        })
    return token
}

//-------------------------Roles------------------------------

export const Roles = [{
        name: 'USER',
        description: 'Usuario simple',
    },
    ,
    {
        name: 'POWER USER',
        description: 'Usuario con privilegios para gestionar encuestas',
    },
    {
        name: 'ADMIN',
        description: 'Administrador del sitio',
    }
]