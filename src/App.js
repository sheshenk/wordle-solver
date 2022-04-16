import React from "react";
import WordInput from "./components/WordInput/WordInput";
import allWords from "./utils/data/allWords";
import shortlistWords from "./utils/data/shortlistWords";

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      entries: [0, 1, 2, 3, 4, 5].map((x) => Array(5).fill('')),
      bools: [0, 1, 2, 3, 4, 5].map((x) => Array(5).fill(0))
    }
  }

  getNextEmptyRow = () => {
    for (let i = 0; i < this.state.bools.length; i++) {
      if (this.state.bools[i].includes(0)) return i
    }
    return -1
  }

  handleWordClick = (word) => {
    
    const ents = this.state.entries
    const bols = this.state.bools
    const row = this.getNextEmptyRow()
    if (row === -1) return
    for (let i = 0; i < ents[row].length; i++) {
      ents[row][i] = word.charAt(i)
      bols[row][i] = 0
    }
    this.setState({entries: this.state.entries, bools: bols})
  }
  
  getBoolFunctions = () => {
    const ents = this.state.entries
    const bols = this.state.bools
    const boolFunctions = []
    for (var i = 0; i < ents.length; i++) {
      const temp = []
      for (var j = 0; j < ents[0].length; j++) {
        const func = this.translateBoolCode(bols[i][j], ents[i][j], j)
        if (func == null) {
          return boolFunctions
        }
        temp.push(func)
      }
      boolFunctions.push(...temp)
    }
    return boolFunctions
  }
  
  translateBoolCode = (code, letter, j) => {
    switch (code) {
      case 1:
      return (word) => word.charAt(j) === letter
      case 2:
      return (word) => word.includes(letter) & word.charAt(j) !== letter
      case 3:
      return (word) => word.split(letter).length > 2 ? word.charAt(j) !== letter : !word.includes(letter)
      default:
      return null
    }
  }
  
  getEmptyRowCol = () => {
    const ents = this.state.entries
    for (var i = 0; i < ents.length; i++) {
      for (var j = 0; j < ents[0].length; j++) {
        if (ents[i][j] === '') return [i, j]
      }
    }
    return [5, 5]
  }
  
  handleCellClick = (row, col) => {
    if (this.state.entries[row][col] === '') return
    const bols = this.state.bools
    bols[row][col]++
    if (bols[row][col] === 4) bols[row][col] = 0
    this.setState({entries: this.state.entries, bools: bols})
  }
  
  handleKeyUp = (event) => {
    const key = event.key.toLowerCase();
    const isLetter = (key >= "a" && key <= "z");
    const ents = this.state.entries
    const bols = this.state.bools
    if (isLetter & key.length === 1) {
      const rowCol = this.getEmptyRowCol()
      ents[rowCol[0]][rowCol[1]] = key
    } else if (key === 'backspace') {
      const rowCol = this.getEmptyRowCol()
      rowCol[1]--
      if (rowCol[1] === -1) {
        rowCol[0]--
        rowCol[1] = 4
      }
      ents[rowCol[0]][rowCol[1]] = ''
      bols[rowCol[0]][rowCol[1]] = 0
    }
    this.setState({entries: ents, bools: bols})
  }
  
  getWordList = () => {
    const threshold = 10
    var aw = [...allWords]
    var sw = [...shortlistWords]
    this.getBoolFunctions().forEach(func => {
      aw = aw.filter(func)
      sw = sw.filter(func)
    })
    if (sw.length < threshold) {
      return sw
    } else {
      return aw
    }
    
  }
  
  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp)
  }
  
  render() {
    const rows = [0, 1, 2, 3, 4, 5].map((i) => 
    <WordInput row = {i} letters = {this.state.entries[i]} bools = {this.state.bools[i]} cellClick = {this.handleCellClick}/>
    )
    const wordList = this.getWordList().slice(0, 10).map(x => 
      <p style={{fontSize: 28, color: '#34495e', fontFamily: 'sans-serif', cursor: 'pointer'}} onClick={() => this.handleWordClick(x)}>{x}</p>
    )
    return (
      <div style={{display: 'flex'}}>
      <div style={{
        display: 'flex',
        height: '100vh',
        width: '50vw',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <div>{rows}</div>
      </div>
      <div style={{
        display: 'flex',
        height: '100vh',
        width: '50vw',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dfe6e9'
      }}>
      <div>
        {wordList}
      </div>
      
      </div>
      </div>
      
      )
    }
    
    
  }
  
  export default App;
  