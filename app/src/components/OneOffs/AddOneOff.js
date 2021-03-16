import React, { useState } from 'react'
import { addOneOff } from '../../store/actions'

const AddOneOff = () => {

  const [newOneOff, setNewOneOff] = useState('')

  const change = (e) => {
    setNewOneOff(e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    addOneOff(newOneOff)
    setNewOneOff('')
  }

  return ( 
    <form onSubmit={submit}>
      <input className="rounded-lg border-2 border-black focus:outline-none" value={newOneOff} onChange={change}></input>
    </form>
   );
}
 
export default AddOneOff;