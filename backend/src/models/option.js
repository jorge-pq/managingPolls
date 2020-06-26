import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types

const optionSchema = Schema({
    description: String,
    poll:{
        type: ObjectId,
        ref: 'Poll'
    },
    votes: [{
        type: ObjectId,
        ref: 'Vote'
    }]
})

export default mongoose.model('Option', optionSchema) 