import './buttons.css';
import {Icons} from '../shared/static-images';
import React from 'react';

const ButtonPostType = {
    SEND: 'send',
    UPDATE: 'update',
    REPLY: 'reply'
}

const ButtonActionableType = {
    DELETE: 'delete',
    EDIT: 'edit',
    REPLY: 'reply'
}

//send, update, reply
function PostButton(props) {
    return (
        <button 
            disabled={props.disabled} 
            onClick={props.onClick} 
            className="button__post">
                {props.type}
        </button>
    );
}

function ActionableButton(props) {
    const icon = Icons[props.type];
    const deleteCSS = props.type === ButtonActionableType.DELETE ? 'button__actionable--delete' : undefined;
    return (
        <button 
            disabled={props.disabled} 
            onClick={props.onClick} 
            className={`button__actionable ${deleteCSS}`}>
                <span className='button__actionable--icon'>{icon}</span>
                <span>{props.type}</span>
        </button>
    );
}

export { ButtonPostType, ButtonActionableType, PostButton, ActionableButton};
