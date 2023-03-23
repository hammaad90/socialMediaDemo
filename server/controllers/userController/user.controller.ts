import { Request, Response } from 'express';
import UserService from '../../service/user.service';
import { userpayload, loginpayload, updateUserpayload } from './userPayload';
import * as Joi from 'joi';
import * as httpStatus from 'http-status'
import { superAdminPaylod } from '../../utils/constant';

import e = require('express');

export class UserController {
  private user_service: UserService = new UserService();

  // method to register user
  public async registerUser(req: Request, res: Response) {
    // check if admin or not:
    const admin = req['decoded'].role
    if (admin == superAdminPaylod.role) {
      const {
        error,
        value: payload
      } = Joi.validate(req.body, userpayload, {
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
        let getUser = await this.user_service.getUserByEamil(payload.email);
        if (getUser) {
          return res
            .status(httpStatus.UNAUTHORIZED)
            .send({ info: 'User Alredy created with that email' });
        } else {
          let createUser = await this.user_service.createUser(payload);
          return res
            .status(httpStatus.OK)
            .send({ info: 'User Successfully Registered', data: createUser })
        }

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
          error: 'You dont have required right to create a user'
        });
    }

  }

  // method to let user login
  public async login(req: Request, res: Response) {
    const {
      error,
      value: payload
    } = Joi.validate(req.body, loginpayload, {
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
      let getUser = await this.user_service.getUserByEamil(payload.email);
      if (!getUser) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .send({ info: 'No user Found With Email' });

      }
      else {
        let userLogin = await this.user_service.login(payload, getUser);
        if (!userLogin) {
          return res
            .status(httpStatus.UNAUTHORIZED)
            .send({ info: 'Password Not Matched' })
        } else {
          return res
            .status(httpStatus.OK)
            .send({ info: 'Login', data: userLogin })
        }
      }
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }


  // to get all user 
  public async getAllUser(req: Request, res: Response) {
    try {
      let allUser = await this.user_service.getAllUser(Number(req.query.skip), Number(req.query.limit));
      return res
        .status(httpStatus.OK)
        .send({ allUser })
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  // to get by id
  public async getUserById(req: Request, res: Response) {
    try {
      let user = await this.user_service.getUserById(req.params.id);
      return res
        .status(httpStatus.OK)
        .send({ user })
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }

  // to update a user
  public async updateUser(req: Request, res: Response) {
    const {
      error,
      value: payload
    } = Joi.validate(req.body, updateUserpayload, {
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
      let user = await this.user_service.updateUser(req.params.id, payload);
      return res
        .status(httpStatus.OK)
        .send({ user })
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }


  // to delete a user:
  // to get by id
  public async deleteUser(req: Request, res: Response) {
    const admin = req['decoded'].role
    if (admin == superAdminPaylod.role) {
      try {
        let user = await this.user_service.deleteUserById(req.params.id);
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
        .status(400)
        .send({
          info: 'Access Problem !!!',
          error: 'You dont have required right to create a user'
        });
    }
  }
}