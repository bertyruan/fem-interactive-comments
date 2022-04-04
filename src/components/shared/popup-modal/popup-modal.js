import './popup-modal.css';

function PopupModal(props) {
    return (
        <section className="l-popup">
            {props.children}
        </section>
    );
}


export { PopupModal }