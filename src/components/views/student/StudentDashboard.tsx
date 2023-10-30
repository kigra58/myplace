import React from 'react'
import useFeth from '../../../hooks/useFetch'
import { TestEndpoints } from '../../../routes/routes'

const Dashboard:React.FC = () => {
 
  const {data}=useFeth(`${TestEndpoints.GET_USER_SOLUTION}`);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard