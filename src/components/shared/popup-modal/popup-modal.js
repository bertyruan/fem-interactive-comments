import './popup-modal.css';

function PopupModal(props) {
    return (

        <div className="l-popup">
            <div className="overlay">
                {props.children}
            </div>    
        </div>
  
    );
}


export { PopupModal }