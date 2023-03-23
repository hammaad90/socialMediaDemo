import { IPost } from "models/models/post.model";
import { savepost, findAllpost, getpostById, updatepost, deletepost, addComment, getComment } from '../query/post.query';
import * as _ from 'lodash';
import { IComment } from "models/models/comment.model";

export class PostService {

    // method to register user
    public async createPost(payload: IPost) {
        const result = await savepost(payload);
        const res =  _.pick(result, ['_id', 'post', 'is_deleted', 'user'])
        return res;
    }

    public async createComment(payload: IComment) {
        const result = await addComment(payload);
        const res =  _.pick(result, ['_id', 'comment'])
        return res;
    }

    public async getCommentOfPost(postId, userId, skip, limit) {
        const result = await getComment({post: postId, user: userId}, skip, limit);
        return result;
    }

    // to get all user
    public async getAllPost(skip, limit) {
        let query = {is_deleted: false}
        let result = await findAllpost(query, skip, limit)
        return result;
    }

    // to get user by id
    public async getPostByUserID(userId, skip, limit) {
        let query = {user: userId}
        let result = await findAllpost(query, skip, limit)
        return result;
    }

    // to get user by id
    public async getAllPostById(id, userId) {
        let query = {_id: id, user:userId, is_deleted: false}
        let result = await getpostById(query)
        return result;
    }

    public async updatePost(postId, userId, payload) {
        const exists: any = await getpostById({_id: postId, is_deleted: false})
        let query = {_id: postId, user: userId}
        let updatedData = {
            post: payload.post ? payload.post : exists.post,
        }
        let result = await updatepost(query, updatedData)
        return result;
    }

    // to delete user by id
    public async deletePostById(todoId, userId) {
        let query = {_id: todoId, user:userId}
        let result = await deletepost(query)
        return result;
    }
}