import * as mongoose from 'mongoose';


const Schema = mongoose.Schema;

const schema = new Schema({
    todo: {
        type: String
    },
    status: {
        type: String,
        enum: ['COMPLETE', 'INCOMPLETE'],
        default: 'INCOMPLETE'
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
);

export default mongoose.model('todos', schema);