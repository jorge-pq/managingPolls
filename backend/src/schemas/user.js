import Joi from 'joi'

const username = Joi.string().alphanum().min(4).max(10).required().label("Invalid username")
const name = Joi.string().max(254).required().label("Invalid name")
const password = Joi.string().min(8).max(30).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/).
label("The password must be at least a lowercase letter, a uppercase letter, a digit and a special character")


const passwordNew = Joi.string().min(8).max(30).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/).options({
    language: {
        string: {
            regex: {
                base: 'La contraseña debe tener al menos una letra minuscula, una mayuscula, un digito y un caracter especial'
            }
        }
    }
})
const passwordOld = Joi.string().min(8).max(30).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/).options({
    language: {
        string: {
            regex: {
                base: 'La contraseña debe tener al menos una letra minuscula, una mayuscula, un digito y un caracter especial'
            }
        }
    }
})
const email = Joi.string().email()
const web = Joi.string().max(254)
const city = Joi.string().max(254)
const country = Joi.string().max(254)
const avatar = Joi.string().max(254)
const phone = Joi.number()

export const signUp = Joi.object().keys({
    username, name, password, email, web, city, country, avatar, phone
})

export const changePass = Joi.object().keys({
    passwordOld, passwordNew
})