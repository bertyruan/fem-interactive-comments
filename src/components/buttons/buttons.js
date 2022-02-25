import './buttons.css';
import {Icons} from '../../static-images';

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

function Button(props) {
    return (
        <button className={props.className}>{props.children}</button>
    );
}

//send, update, reply
function PostButton(props) {
    return (
        <Button className="button__post">
            {props.type}
        </Button>
    );
}

function ActionableButton(props) {
    const icon = Icons[props.type];
    const deleteCSS = props.type === ButtonActionableType.DELETE ? 'button__actionable--delete' : undefined;
    return (
        <Button className={`button__actionable ${deleteCSS}`}>
            <span className='button__actionable--icon'>{icon}</span>
            <span>{props.type}</span>
        </Button>
    );
}

export { ButtonPostType, ButtonActionableType, PostButton, ActionableButton};
