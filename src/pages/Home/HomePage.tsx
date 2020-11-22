import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { UsersList } from '../../components/UsersList'

interface IUsers {
  name: string
  age: string
  id: string
}

export const HomePage: React.FC = () => {
  const [users, setUsers] = useState([]) 

  const getUsers = async () => {
    const query = `
      query {
        getUsers {
          name age id
        }
      }
    ` 
    const {data} = await axios.post('http://localhost:3001/graphql', {query})
    setUsers(data.data.getUsers)
  }

  useEffect(() => {
    getUsers()    
  }, [])

  return (
    <div>
      <ul>
        {users.map((user: IUsers) => (
          <UsersList key={user.id} name={user.name} age={user.age} />
        ))}
      </ul>
    </div>
  )
}