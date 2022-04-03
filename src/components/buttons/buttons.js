import './buttons.css';
import {Icons} from '../../static-images';
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

class Button extends React.Component {
    render() {
        return (
            <button 
                disabled={this.props.disabled} 
                onClick={() => this.props.onClick()}
                className={this.props.className}>
                    {this.props.children}
            </button>
        );
    }
}

//send, update, reply
function PostButton(props) {
    return (
        <Button 
            disabled={props.disabled} 
            onClick={props.onClick} 
            className="button__post">
                {props.type}
        </Button>
    );
}

function ActionableButton(props) {
    const icon = Icons[props.type];
    const deleteCSS = props.type === ButtonActionableType.DELETE ? 'button__actionable--delete' : undefined;
    return (
        <Button 
            disabled={props.disabled} 
            onClick={props.onClick} 
            className={`button__actionable ${deleteCSS}`}>
                <span className='button__actionable--icon'>{icon}</span>
                <span>{props.type}</span>
        </Button>
    );
}

export { ButtonPostType, ButtonActionableType, PostButton, ActionableButton};
