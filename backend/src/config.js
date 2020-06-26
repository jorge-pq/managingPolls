export const {
    NODE_ENV = 'development',
    SECRET = 'aslkdlkaj108309jdfjdfjd54asd',

    DB_USERNAME = '',
    DB_PASSWORD = '',
    DB_HOST = 'localhost',
    DB_PORT = 27017,
    DB_NAME = 'polls'

} = process.env

export const IN_PROD = NODE_ENV === 'production'