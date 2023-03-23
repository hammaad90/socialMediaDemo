import { Request, Response } from 'express';
import { PostService } from '../../service/post.service';
import { postpayload, updatePostpayload, commentpayload } from '../postControler/post.payload';
import * as Joi from 'joi';
import * as httpStatus from 'http-status'

export class PostController {
  private postService: PostService = new PostService();

  // method to register user
  public async createPost(req: Request, res: Response) {
    const userRole = req['decoded'].role
    if (userRole == 'USER') {
      const {
        error,
        value: payload
      } = Joi.validate(req.body, postpayload, {
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
        let result = await this.postService.createPost({ ...payload, user: req['decoded'].id });
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

  // method to register user
  public async addComment(req: Request, res: Response) {
    const userRole = req['decoded'].role
    if (userRole == 'USER') {
      const {
        error,
        value: payload
      } = Joi.validate(req.body, commentpayload, {
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
        let result = await this.postService.createComment({ ...payload, user: req['decoded'].id, post: req.params.id});
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
  public async getAllPost(req: Request, res: Response) {
    try {
      let alltodo = await this.postService.getAllPost(Number(req.query.skip), Number(req.query.limit));
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
  public async getCommentOfPost(req: Request, res: Response) {
    try {
      let alltodo = await this.postService.getCommentOfPost(req.params.postId, req['decoded'].id, Number(req.query.skip), Number(req.query.limit));
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
  public async getPostByID(req: Request, res: Response) {
    try {
      let alltodo = await this.postService.getPostByUserID(req['decoded'].id, Number(req.query.skip), Number(req.query.limit));
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
  public async updatePost(req: Request, res: Response) {
    const {
      error,
      value: payload
    } = Joi.validate(req.body, updatePostpayload, {
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
    const exists = await this.postService.getAllPostById(req.params.id, req['decoded'].id)
    if (exists) {
      try {
        let user = await this.postService.updatePost(req.params.id, req['decoded'].id, payload);
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
        .send({ message: 'No post Found !!!' });
    }

  }


  public async deletePost(req: Request, res: Response) {
    const user = req['decoded'].role
    if (user == 'USER') {
      const exists = await this.postService.getAllPostById(req.params.id, req['decoded'].id)
      if (exists) {
        try {
          let user = await this.postService.deletePostById(req.params.id, req['decoded'].id);
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