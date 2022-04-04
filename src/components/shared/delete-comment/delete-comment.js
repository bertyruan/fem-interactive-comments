import { PopupModal } from './../popup-modal/popup-modal';
import { Button } from '../../buttons/buttons';

function ConfirmDelete() {
    return (
        <div className="stack container-delete">
            <h2>Delete comment</h2>
            <p>Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
            <div>
                <Button>No Cancel</Button>
                <Button>Yes Delete</Button>
            </div>
        </div>
    );
}

function ConfirmDeletePopup() {
    return (
        <PopupModal>
            <ConfirmDelete></ConfirmDelete>
        </PopupModal>
    )
}


export { ConfirmDeletePopup }