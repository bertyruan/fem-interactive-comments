import { PopupModal } from '../shared/popup-modal/popup-modal';
import { Button } from '../buttons/buttons';
import './delete-comment.css';

function ConfirmDelete(props) {
    return (
        <div className="stack m-delete">
            <h2 className="delete-title">Delete comment</h2>
            <p className="delete-desc">Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
            <div className="file delete-cta">
                <button onClick={props.cancel} className="button__post button-cancel">No Cancel</button>
                <button onClick={props.delete} className="button__post button-confirm">Yes Delete</button>
            </div>
        </div>
    );
}

function ConfirmDeletePopup(props) {
    if(props.show) {
        return (
            <PopupModal>
                <ConfirmDelete
                    delete={props.delete}
                    cancel={props.cancel}
                />
            </PopupModal>
        );
    }

    return null;
}


export { ConfirmDeletePopup }