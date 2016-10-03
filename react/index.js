import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css'

class App extends Component {
    render(){
        return (
            <div>
                <h2>HiHI</h2>
                <h3 className={styles.red}>Red</h3>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));