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
    const id = props.commentId;
    return (
        <button onClick={() => props.onClick(id)} className={props.className}>{props.children}</button>
    );
}

//send, update, reply
function PostButton(props) {
    return (
        <Button onClick={props.onClick} className="button__post">
            {props.type}
        </Button>
    );
}

function ActionableButton(props) {
    const icon = Icons[props.type];
    const id = props.comment.id;
    const deleteCSS = props.type === ButtonActionableType.DELETE ? 'button__actionable--delete' : undefined;
    return (
        <Button onClick={props.onClick} commentId={id} className={`button__actionable ${deleteCSS}`}>
            <span className='button__actionable--icon'>{icon}</span>
            <span>{props.type}</span>
        </Button>
    );
}

export { ButtonPostType, ButtonActionableType, PostButton, ActionableButton};
