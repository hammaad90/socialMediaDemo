import { Request, Response } from 'express';
import { TodoService } from '../../../service/todo.service';
import { todopayload, updateTodopayload } from '../todoController/todoPayload';
import * as Joi from 'joi';
import * as httpStatus from 'http-status'

export class TodoController {
  private todoService: TodoService = new TodoService();

  // method to register user
  public async createTodo(req: Request, res: Response) {
    const userRole = req['decoded'].role
    if (userRole == 'USER') {
      const {
        error,
        value: payload
      } = Joi.validate(req.body, todopayload, {
        abortEarly: false
      });

      if (error) {
        return res
          .status(400)
          .send({
            info: 'Insufficient parameters',
            error: error.message
          });
      }
      try {
        let result = await this.todoService.createTodo({ ...payload, user: req['decoded'].id });
        return res
          .status(httpStatus.OK)
          .send({ info: 'Created Successfully', data: result })
      } catch (error) {
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: error.message });
      }
    } else {
      return res
        .status(400)
        .send({
          info: 'Access Problem !!!',
          error: 'You dont have required rights !!!'
        });
    }

  }


  // to get all user 
  public async getAllTodo(req: Request, res: Response) {
    try {
      let alltodo = await this.todoService.getAllTodo();
      return res
        .status(httpStatus.OK)
        .send({ alltodo })
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  // to get all user 
  public async getTodoByID(req: Request, res: Response) {
    try {
      let alltodo = await this.todoService.getTodoByUserID(req['decoded'].id);
      return res
        .status(httpStatus.OK)
        .send({ alltodo })
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  // to update a user
  public async updateTodo(req: Request, res: Response) {
    const {
      error,
      value: payload
    } = Joi.validate(req.body, updateTodopayload, {
      abortEarly: false
    });

    if (error) {
      return res
        .status(400)
        .send({
          info: 'Insufficient parameters',
          error: error.message
        });
    }
    const exists = await this.todoService.getAllTodoById(req.params.id)
    if (exists) {
      try {

        let user = await this.todoService.updateTodo(req.params.id, req['decoded'].id, payload);
        return res
          .status(httpStatus.OK)
          .send({ user })
      } catch (error) {
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ message: error.message });
      }
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: 'No Todo Found !!!' });
    }

  }


  public async deleteTodo(req: Request, res: Response) {
    const user = req['decoded'].role
    if (user == 'USER') {
      const exists = await this.todoService.getAllTodoById(req.params.id)
      if (exists) {
        try {
          let user = await this.todoService.deleteTodoById(req.params.id, req['decoded'].id);
          return res
            .status(httpStatus.OK)
            .send({ user })
        } catch (error) {
          return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: error.message });
        }
      } else {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: 'No Todo Found !!!' });
      }

    } else {
      return res
        .status(400)
        .send({
          info: 'Access Problem !!!',
          error: 'You dont have required right to create a user'
        });
    }
  }

}