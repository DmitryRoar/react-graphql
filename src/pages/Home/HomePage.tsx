import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {CreateUser} from '../../containers/CreateUser'
import {Loader} from '../../components/Loader/Loader'
import {UsersList} from '../../components/UsersList'

import {getUsers} from '../../store/actions/home'
import {IUsers} from '../../interfaces'

export const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: any) => state.home.users)
  const loading = useSelector((state: any) => state.home.loading)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <div>
      {loading && <Loader/>}
      <CreateUser/>
      <ul>
        {users.map((user: IUsers, idx: number) => (
          <UsersList key={idx} name={user.name} age={user.age}/>
        ))}
      </ul>
    </div>
  )
}