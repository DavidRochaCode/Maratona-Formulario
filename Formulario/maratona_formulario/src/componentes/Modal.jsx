/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import react from 'react'

const Modal = ({onClose = () =>{},  children}) =>{
   return <div className='modal'>
      <div className='modalContainer'>
      <button className='modalClose' onClick={onClose}/>
      <div className='modalContent'>{children}</div>
      </div>
   </div>
}

export default Modal