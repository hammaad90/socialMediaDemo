import todo from '../models/schema/todo.schema';

// query to create user
export async function saveTodo(data) {
    let result = await todo.create(data);
    return result ? result : null;
}

// query to get all user
export async function findAllTodo(query) {
    let result = await todo.find(query).populate('user', '_id firstName lastName role')
    return result ? result : null;
}


// query to get user detail
export async function getTodoById(query) {
    let result = await todo.findOne(query).populate('user', '_id firstName lastName role');
    return result ? result : null;
}

export async function updateTodo(query, data) {
    let result = await todo.update(query, data, {new: true});
    return result ? result : null;
}

// query to get all user
export async function deleteTodo(query) {
    let result = await todo.update(query, {is_deleted: true});
    return result ? result : null;
}