import React from 'react'

interface Props {
  name: string
  age: string
}

export const UsersList: React.FC<Props> = ({name, age}) => {
  return (
    <li>
      <span>Name/Age: </span>
      <strong>{name}, {age}</strong>
    </li>
  )
}