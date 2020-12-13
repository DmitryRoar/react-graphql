export interface IUser {
  name: string
  age: string
  _id: string
}

export interface IAction {
  type: string
  payload: any
}

export interface IAuthProps {
  email: string
  password: string
  confirmPassword?: string
}

export interface IForUserIdFind {
  owner: string
}