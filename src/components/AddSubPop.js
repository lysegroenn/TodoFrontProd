import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group'


const StyledAddSubPop = styled.div`

    background-color: #f7f3f3;
    position: absolute;
    top: 5%;
    bottom: 5%;
    right: 10%;
    left 10%;
    transition: transform 200ms ease-in-out;
`;



const AddSubPop =({setAddingSub, addSub, _id, state}) => {
    const [body, setBody] = React.useState('')

    useEffect(() => {
        setBody('')
    },[state])

    const setBodyF = (event) => {
        setBody(event.target.value)
    }

    return (
        <StyledAddSubPop className={`add-sub-pop-${state}`} >
            <input type="text" name="sub-body" onChange={setBodyF} value={body} />
            <button onClick={() => {addSub(_id, body); setAddingSub(false)}} >Add</button>
            <button onClick={() => setAddingSub(false)} >X</button>
        </StyledAddSubPop>
    )
}

export default AddSubPop;