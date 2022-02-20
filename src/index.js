import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



function Attribution(props) {
    return (
        <div class="attribution">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
            Coded by <a href="www.github.com/bertyruan">Berty Ruan</a>.
        </div>
    );
}

class InteractiveCommentsPage extends React.Component {
    render() {
        return <Attribution />;
    }
}


ReactDOM.render(
    <InteractiveCommentsPage />,
    document.getElementById('root')
);