import React from "react";

class Cell extends React.Component {

    render() {
        const colors = ['#ffffff', '#2ecc71', '#e67e22', '#34495e']
        const bgColor = colors[this.props.bool]
        return (
            <div style={{
                backgroundColor: bgColor,
                color: bgColor === '#ffffff' ? '#000000' : '#ffffff',
                padding: '4px', 
                border: bgColor === '#ffffff' ? `1px solid #bdc3c7` : `1px solid ${bgColor}`,
                borderRadius: 12,
                width: '50px', 
                height: '50px', 
                textAlign: 'center', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'sans-serif',
                fontSize: 25,
                margin: 4,
                userSelect: 'none', WebkitUserSelect: "none", cursor: 'pointer'
                }} onClick = {this.props.onClick}>
                {this.props.letter.toUpperCase()}
            </div>
        )
    }
}

export default Cell;