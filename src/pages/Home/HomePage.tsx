import React, {useEffect} from 'react'
import classes from './HomePage.module.scss'

import {useDispatch, useSelector} from 'react-redux'
import {CreateUser} from '../../containers/CreateUser/CreateUser'
import {Loader} from '../../components/Loader/Loader'
import {UsersList} from '../../components/UserList/UsersList'

import {getUsers} from '../../store/actions/home'
import {IUsers} from '../../interfaces'
import {logout} from '../../store/actions/auth'
import { Button } from '../../components/Button/Button'

export const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: any) => state.home.users)
  const loading = useSelector((state: any) => state.home.loading)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div>
      {
        loading
          ? <Loader/>
          : <div className={classes.Wrap}>
            <CreateUser/>
            <div>
              <ul>
                {users.map((user: IUsers, idx: number) => (
                  <UsersList key={idx} name={user.name} age={user.age}/>
                ))}
              </ul>

              <Button className='danger' onClick={logoutHandler}>LogOut</Button>
            </div>

          </div>
      }
    </div>
  )
}