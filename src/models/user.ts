import { Schema, model, Document } from 'mongoose';

export type InputCreate = {
  input: {
    email: string,
    password: string
  }
}

export type InputUpdate = {
  input: {
    _id: string,
    name: string,
    role: string,
    status: number
  }
}

export type InputUpdatePassword = {
  input: {
    _id: string,
    password: string,
    newPassword: string
  }
}

export type InputID = {
  input: {
    _id: string
  }
}

export type InputFetch = {
  input: {
    condition: object
  }
}

export interface IUser extends Document {
  _doc: IUser | PromiseLike<IUser>;
  name: string,
  email: string,
  role: string,
  password: string,
  status: number,
  resetToken: string,
  resetTokenExpiration: Date
}

export const User = model<IUser>('User', new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    pages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Page'
      }
    ]
  },
  { timestamps: true }
));