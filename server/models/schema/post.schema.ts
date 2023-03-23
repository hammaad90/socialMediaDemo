import * as mongoose from 'mongoose';


const Schema = mongoose.Schema;

const schema = new Schema({
    post: {
        type: String
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

export default mongoose.model('posts', schema);