import * as mongoose from 'mongoose';


const Schema = mongoose.Schema;

const schema = new Schema({
    comment: {
        type: String
    },
    post: {
        type: Schema.Types.ObjectId, ref: 'posts'
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

export default mongoose.model('comments', schema);