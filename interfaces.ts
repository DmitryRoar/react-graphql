export interface IUsers {
  name: string
  age: string
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