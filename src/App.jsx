import { useEffect, useState } from "react";

// styles
import "./App.css";

// components
import Start from "./components/Start/Start";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";

// data
import { wordsList } from "./data/words";

const stageArr = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const attemptStart = 3;

function App() {
  const [gameStage, setGameStage] = useState(stageArr[0].name);
  const [wordArr] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letterArr, setLetterArr] = useState([]);
  const [score, setScore] = useState(0);
  const [attempt, setAttempt] = useState(attemptStart);
  const [wrongLetterArr, setWrongLetterArr] = useState([]);
  const [guessedLetterArr, setGuessedLetterArr] = useState([]);

  const pickedWordAndCategory = () => {
    // picked a random category
    const categoryArr = Object.keys(wordArr);
    const category =
      categoryArr[Math.floor(Math.random() * Object.keys(categoryArr).length)];

    // picked a random word
    const word =
      wordArr[category][Math.floor(Math.random() * wordArr[category].length)];

    return { category, word };
  };

  const startGame = () => {
    const { category, word } = pickedWordAndCategory();

    console.log(category, word);

    let wordLetter = word.split("");
    wordLetter = wordLetter.map((letter) => letter.toLowerCase());

    setPickedCategory(category);
    setPickedWord(word);
    setLetterArr(wordLetter);
    setGuessedLetterArr([]);
    setWrongLetterArr([]);

    setGameStage(stageArr[1].name);
  };

  const verifyLetter = (letter) => {
    if (guessedLetterArr.includes(letter) || wrongLetterArr.includes(letter)) {
      return;
    }

    if (letterArr.includes(letter)) {
      setGuessedLetterArr((actualGuessedLetter) => [
        ...actualGuessedLetter,
        letter,
      ]);
    } else {
      setWrongLetterArr((actualWrongLetter) => [...actualWrongLetter, letter]);
      setAttempt((actualAttempt) => actualAttempt - 1);
    }
  };

  // restart the game
  const retry = () => {
    setGameStage(stageArr[0].name);
  };

  useEffect(() => {
    if (attempt == 0) {
      setGameStage(stageArr[2].name);
    }
  }, [attempt]);

  useEffect(() => {
    const uniqueLetterArr = [...new Set(letterArr)];

    console.log(guessedLetterArr);
    console.log(uniqueLetterArr);

    // win condition
    if (
      guessedLetterArr.length === uniqueLetterArr.length &&
      uniqueLetterArr.length != 0
    ) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      // restart game with new word
      startGame();
    }
  }, [guessedLetterArr]);

  return (
    <div className="container d-flex flex-column text-center my-5">
      <h1 className="title">Secret Word</h1>
      {gameStage === "start" && <Start startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letterArr={letterArr}
          score={score}
          attempt={attempt}
          wrongLetterArr={wrongLetterArr}
          guessedLetterArr={guessedLetterArr}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
