import React from "react"


const CreateItem = (props) => {
    return (
        <>
        <li style={{border: '1px solid black'}}>{props.textItem}</li>
        </>
    )   
}

export default CreateItem;