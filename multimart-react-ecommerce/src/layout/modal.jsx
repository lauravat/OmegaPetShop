import React from 'react'
import './modal.css'

function Modal ({ children, CloseModal }) {
  return (
    <section className='modal'>
      <div className='contenedor_modal'>
        <a href='#' className='modal_close' onClick={() => CloseModal(true)}>
          X
        </a>
        <br />
        {children}
      </div>
    </section>
  )
}

export default Modal
