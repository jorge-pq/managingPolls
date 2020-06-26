import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types

const voteSchema = Schema({
    option:{
        type: ObjectId,
        ref: 'Option'
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
}, { timestamps: true })

export default mongoose.model('Vote', voteSchema) 
 