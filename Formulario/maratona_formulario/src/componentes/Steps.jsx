/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import "./Steps.css"
import {AiOutlineUser,AiOutlineCode , AiOutlineTeam} from 'react-icons/ai'
import { FiSend } from 'react-icons/fi'

const Steps = ({currentStep}) => {
  return (
    <div className='steps'>
      <div className={`step ${currentStep >=1 ? "active": ""}`}>
            <AiOutlineCode />
            <p>Cursos</p>
        </div>
        <div className={`step ${currentStep >=2 ? "active": ""}`}>
            <AiOutlineTeam/>
            <p>Equipe</p>
        </div>
        <div className={`step ${currentStep >=3 ? "active": ""}`}>
            <AiOutlineUser/>
            <p>Participante</p>
        </div>
        <div className={`step ${currentStep >=4 ? "active": ""}`}>
            <FiSend/>
            <p>Finalizar</p>
        </div>
    </div>
  )
}

export default Steps