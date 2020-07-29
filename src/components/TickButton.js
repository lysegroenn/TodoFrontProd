import React, { Component } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group'
import './css/App.css'

const StyledTickButton = styled.button`
    
    width: 6vh;
    height: 6vh;
    transition: opacity 300ms ease-in-out;
    border: 1px solid #FF65C2;
    border-radius: 5px;

    &:hover {
        border: 2px solid #FF65C2;
    }
	
	&:focus {
	outline: none;
	box-shadow: none;
	}

    & > svg {
        
    }
`


const TickButton = ({ _id, ind, ticked, onClick }) => (
    <Transition in={ticked} timeout={300}>
        {state => (
            <StyledTickButton className={`tick-button-${state}`} ticked={ticked} onClick={e => onClick(_id, ind)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
            </StyledTickButton>
        )}
    </Transition>
)

export default TickButton;
