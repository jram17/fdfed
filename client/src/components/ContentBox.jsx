import React from 'react'

function ContentBox(props) {
  return (
    <div>
      <div className="contentbox-div" onClick={props.onClick}>
        {props.name}
      </div>
    </div>
  )
}

export default ContentBox
