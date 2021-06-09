import React, { useState, useEffect, useRef } from 'react'
import { addOneOff } from '../../../store/actions'

const AddOneOff = () => {

  const [newOneOff, setNewOneOff] = useState('')
  const ref = useRef(null);

  useEffect(() => {

    const keyupOne = (e) => {
      if(e.code === "Slash" && document.activeElement.nodeName !== 'TEXTAREA' && document.activeElement.nodeName !== "INPUT"){
        ref.current.focus()
      }
    }

    document.addEventListener("keyup", keyupOne);

    return(() => {
      document.removeEventListener("keyup", keyupOne);
    })
  })

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
      <input ref={ref} className="formInput mt-2" placeholder="Add One Off" value={newOneOff} onChange={change}></input>
    </form>
   );
}
 
export default AddOneOff;