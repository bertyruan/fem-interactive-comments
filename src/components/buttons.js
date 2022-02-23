import './buttons.css';

const ButtonPostType = {
    SEND: 'send',
    UPDATE: 'update',
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
    return (
        <Button>
            <img src={props.button.icon}></img>
            <span>{props.button.type}</span>
        </Button>
    );
}

export { ButtonPostType, PostButton, ActionableButton};
