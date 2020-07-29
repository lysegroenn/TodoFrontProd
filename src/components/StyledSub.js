import React, { useState, useEffect, Component } from 'react';
import styled from 'styled-components';
import TickButton from './TickButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const StyledSubDiv = styled.div`
border: 1px solid black;
background-color: #e1dbdb;
min-width: 15vmax;
max-width: 30vmax;
height: 25vh;
display: grid;
grid-template-columns: auto auto 7vh;
grid-template-rows: auto;
grid-template-areas: 
"body body util"

`;

const StyledTitleDiv = styled.div`
    grid-area: body;
    min-width: 15vw;
    text-align: center;
`;

const StyledUtilsDiv = styled.div`
    grid-area: util;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const StyledEditingDiv = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    

    & > textarea {
        resize: none;
        
        width 100%;
    }
`;


const SubDone = ({ sub, _id, ind, remove, tick, edit, editing, setEditing }) => (
    <StyledSubDiv>
    <StyledTitleDiv>
        <p>{sub.body}</p>
    </StyledTitleDiv>
    <StyledUtilsDiv>
        <TickButton _id={_id} ind={ind} ticked={sub.ticked} onClick={tick}></TickButton>
        <DeleteButton _id={_id} ind={ind} onClick={remove}></DeleteButton>
        <EditButton _id={_id} ind={ind} editing={editing} setEdit={setEditing}></EditButton>
    </StyledUtilsDiv>
    </StyledSubDiv>
)

const SubEditing = ({ _id, ind, editing, setEditing, newBody, setNewBody, setNewBodyF, editBodySub }) => (
    <StyledSubDiv>
        <StyledEditingDiv>
            <textarea onChange={setNewBodyF} value={newBody} ></textarea>
            <button onClick={() => {editBodySub(_id, ind, newBody); setEditing(false); setNewBody('')}}>Fire</button>
        </StyledEditingDiv>
        <StyledUtilsDiv>
                <EditButton _id={_id} ind={ind} editing={editing} setEdit={setEditing} />
        </StyledUtilsDiv>
    </StyledSubDiv>
)



const StyledSub = ({ sub, _id, ind, remove, tick, edit, editBodySub }) => {
    const [editing, setEditing] = useState(false)
    const [newBody, setNewBody] = useState('')

    const setNewBodyF = (event) => {
        setNewBody(event.target.value)
    }

    
    return (
        <div>
            {!editing && <SubDone sub={sub} _id={_id} ind={ind} remove={remove} tick={tick} editing={editing} setEditing={setEditing} />}
            {editing && <SubEditing _id={_id} ind={ind} editing={editing} setEditing={setEditing} newBody={newBody} setNewBody={setNewBody} setNewBodyF={setNewBodyF} editBodySub={editBodySub} />}
        </div>
     )
}

export default StyledSub;
