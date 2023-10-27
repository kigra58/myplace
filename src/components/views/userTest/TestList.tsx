import React from 'react'
import { TestListTH } from '../../../helper/constant'


const TestList:React.FC = () => {
  const Array:[]=[]
  return (
    <div>
      <table className="table">
  <thead>
    <tr>
       {TestListTH && TestListTH.length>0 && TestListTH.map((th,thIndex)=>(
         <th key={thIndex} scope="col">{th}</th>
       ))}
    </tr>
  </thead>
  <tbody>
    {Array && Array.length>0 && Array.map((it:{duration:number,
    total:number,
    obtained:number,
    percentage:number,
    created_ts:number
    },index:number)=>{
          return(
    <tr>
      <th scope="row">{index+1}</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
)})}

  </tbody>
</table>
    </div>
  )
}

export default TestList