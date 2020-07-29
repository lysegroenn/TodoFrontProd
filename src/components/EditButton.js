import React, { Component } from 'react';
import styled from 'styled-components';


const StyledEditButton = styled.button`
    
    width: 6vh;
    height: 6vh;
    border: 1px solid #C61DD5;
    border-radius: 5px;

    &:hover {
        border: 2px solid #C61DD5;
    }

    & > svg {
        fill: #CE3553;
    }
`


const EditButton = ({ _id, ind, editing, setEdit }) => (
    <StyledEditButton onClick={e => setEdit(!editing)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
    </StyledEditButton>
)

export default EditButton;
