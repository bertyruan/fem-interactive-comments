import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Data from './assets/data/data.json'; 
import { Attribution } from './components/attribution/attribution';
import { buildNewThread} from './components/helpers/helpers'
import { CommentThread} from './components/threads/threads'
import { CreateComment } from './components/comments/comments';


const CommentStates = {
    DEFAULT: 'default',
    EDIT: 'edit',
    REPLY: 'reply',
    CREATE: 'create'
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: Data.currentUser,
            comments: Data.comments
        }
        this.callbacks = {
            delete: this.deleteComment.bind(this),
            edit: this.editComment.bind(this),
            reply: this.replyComment.bind(this)
        }
    }
    
    deleteComment(id) {
        this.setState(prevState => ({
            comments: buildNewThread([...prevState.comments], id, 'delete')
        }));
    }

    editComment(id, content) {
        this.setState(prevState => ({
            comments: buildNewThread([...prevState.comments], id, 'edit', content)
        }));        
    }

    replyComment(id, content, user) {
        this.setState(prevState => ({
            comments: buildNewThread([...prevState.comments], id, 'reply', content, user)
        }));
    }

    render() {
        return (
            <React.StrictMode>
                <main className="container">
                    <CommentThread 
                        currentUser={this.state.currentUser} 
                        comments={this.state.comments}
                        callbacks={this.callbacks} />
                    <CreateComment type={CreateComment.type.CREATE} currentUser={this.state.currentUser} />
                </main>
                <footer>
                    <Attribution />
                    <button onClick={() => {this.editComment()}}></button>
                </footer>
                {/* <CreateComment type={CreateComment.type.REPLY} currentUser={this.data.comments[0].user}></CreateComment> */}
            </React.StrictMode>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

//componentDidMount() {}
//componentWillUnmount() {}
