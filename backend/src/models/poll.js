import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types

const pollSchema = Schema({
    description: String,
    image: String,
    open: {  // indica si la encuesta esta abierta a votacion o no
        type: Boolean,
        default: true
    },
    options: [{
        type: ObjectId,
        ref: 'Option'
    }]
}, { timestamps: true })

export default mongoose.model('Poll', pollSchema) 