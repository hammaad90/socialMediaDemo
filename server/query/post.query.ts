import post from '../models/schema/post.schema';
import comment from '../models/schema/comment.schema';

// query to create user
export async function savepost(data) {
    let result = await post.create(data);
    return result ? result : null;
}

export async function addComment(data) {
    let result = await comment.create(data);
    return result ? result : null;
}

export async function getComment(query, skip, limit) {
    let result = await comment.find(query).populate('user', '_id firstName lastName role').populate('post', '_id post').skip(skip).limit(limit).sort('createdAt');
    return result ? result : null;
}

// query to get all user
export async function findAllpost(query, skip, limit) {
    let result = await post.find(query).populate('user', '_id firstName lastName role').skip(skip).limit(limit).sort('createdAt')
    return result ? result : null;
}


// query to get user detail
export async function getpostById(query) {
    let result = await post.findOne(query).populate('user', '_id firstName lastName role');
    return result ? result : null;
}

export async function updatepost(query, data) {
    let result = await post.update(query, data, {new: true});
    return result ? result : null;
}

// query to get all user
export async function deletepost(query) {
    let result = await post.update(query, {is_deleted: true});
    return result ? result : null;
}