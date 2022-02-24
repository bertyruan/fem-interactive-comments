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
        <Button className="button--post">
            {props.type}
        </Button>
    );
}

function ActionableButton(props) {
    const icon = Icons[props.type];
    const deleteCSS = props.type === ButtonActionableType.DELETE && 'button--actionable-delete';
    return (
        <Button className='button--actionable'>
            <img src={icon} />
            <span className={deleteCSS}>{props.type}</span>
        </Button>
    );
}

export { ButtonPostType, ButtonActionableType, PostButton, ActionableButton};
