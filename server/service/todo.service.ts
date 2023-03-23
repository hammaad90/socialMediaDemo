import { ITodo } from "models/models/todo.model";
import { saveTodo, findAllTodo, getTodoById, updateTodo, deleteTodo } from '../query/todo.query';
import * as _ from 'lodash';

export class TodoService {

    // method to register user
    public async createTodo(payload: ITodo) {
        const result = await saveTodo(payload);
        const res =  _.pick(result, ['_id', 'todo', 'status', 'is_deleted', 'user'])
        return res;
    }

    // to get all user
    public async getAllTodo(skip, limit) {
        let query = {is_deleted: false}
        let result = await findAllTodo(query, skip, limit)
        return result;
    }

    // to get user by id
    public async getTodoByUserID(userId, skip, limit) {
        let query = {user: userId}
        let result = await findAllTodo(query, skip, limit)
        return result;
    }

    // to get user by id
    public async getAllTodoById(id, userId) {
        let query = {_id: id, user: userId, is_deleted: false}
        let result = await getTodoById(query)
        return result;
    }

    public async updateTodo(todoId, userId, payload) {
        const exists: any = await getTodoById({_id: todoId, is_deleted: false})
        let query = {_id: todoId, user: userId}
        let updatedData = {
            todo: payload.todo ? payload.todo : exists.todo,
            status: payload.status ? payload.status : exists.status
        }
        let result = await updateTodo(query, updatedData)
        return result;
    }

    // to delete user by id
    public async deleteTodoById(todoId, userId) {
        let query = {_id: todoId, user:userId}
        let result = await deleteTodo(query)
        return result;
    }
}