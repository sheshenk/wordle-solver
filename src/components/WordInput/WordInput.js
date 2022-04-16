import React from "react";
import Cell from "../Cell/Cell";

class WordInput extends React.Component {
    
    render() {
        const cells = [0, 1, 2, 3, 4].map((col) =>
            <Cell letter = {this.props.letters[col]} bool = {this.props.bools[col]} onClick={() => this.props.cellClick(this.props.row, col)}/>
        )
        return (
            <div style={{display: 'flex'}}>
                {cells}
            </div>
        )
    }
}

export default WordInput;