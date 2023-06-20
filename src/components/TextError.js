import React from 'react'
import '../css/styles.css'

function TextError(props) {
  return (
     <div className='error'>{ props.children}</div>
  )
}
export default TextError