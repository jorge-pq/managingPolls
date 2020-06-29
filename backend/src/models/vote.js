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
    poll: {
        type: ObjectId,
        ref: 'Poll'
    },
}, { timestamps: true })

export default mongoose.model('Vote', voteSchema) 
 