import React, {useState} from 'react';
import "./style/forca.scss"

const Forca = () => {

  const words2 = [{tip: "É uma fruta", value: "Abacaxi"}, {tip: "É um Automóvel", value: "Corolla"}, {tip: "Comdo da casa", value: "Cozinha"}]

  const [stateCurrentWords] = useState(words2[Math.floor(Math.random() * 5)])
  const [stateSequence, setStateSequence] = useState([])
  const [stateError, setStateError] = useState(0)
  const [countLettersCorrects, setCountLettersCorrects ] = useState(0)

  const Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  const splitWordsAndList = (words) => words.value.split("")

  const setSequence = (ev, letter) => {
    let newState = [...stateSequence]
    newState.push(letter.toLowerCase())
    ev.target.closest("li").classList.add(!itsWrong(letter.toLowerCase()) ? "active" : "error")
    checkError(itsWrong(letter.toLowerCase()))
    setStateSequence(newState)
  }

  const checkError = (bool) => {
    if (bool) { setStateError(stateError + 1) } else { setCountLettersCorrects(countLettersCorrects + 1)}
  }

  const setClassCharacter = () => {
    let _class = {
      1: "show-head",
      2: "show-body show-head arm",
      3: "show-body show-head arm legs",
      4: "show-body show-head arm legs dead"
    }

    return _class[stateError] || ""
  }

  const Gibbet = () => {
    return (
        <div className="gibbet">
          <div className="containerGibbet">
            <div className="gallows"/>
            <div className="topGallows"/>
            <div className={`${setClassCharacter()} character`}>
              <div className="dead" />
              <div className="head"/>
              <div className="body">
                <div className="legs"/>
              </div>
            </div>

          </div>

          <div className="wordGibbet">
            <ul>
              {stateError < 4 ? splitWordsAndList(stateCurrentWords).map((letter, index) => {
                return (
                    <li key={index}>
                      <span className={stateSequence.includes(letter.toLowerCase()) ? "active" : ""}>{letter}</span>
                    </li>
                )
              }) : (
                  <li> Palavra correta: { stateCurrentWords }</li>
              )}
            </ul>

            {countLettersCorrects === stateCurrentWords.length - 1 &&
            <div>Parabéns você ganhou</div>
            }
          </div>

        </div>
    )
  }

  const itsWrong = (letter) => !stateCurrentWords.includes(letter.toLowerCase())

  return (
      <div id="gallows" className="container">

        <div className="letters">
          <ul>
            {Alphabet.map((letter, i) => {
              return (
                  <li onClick={(ev) => setSequence(ev, letter)} key={i}>{letter}</li>
              )
            })}
          </ul>

          <h1 className="tip">{stateCurrentWords.tip}</h1>

        </div>

        <Gibbet />

      </div>
  );
};

export default Forca;