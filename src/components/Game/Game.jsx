import { useState, useRef } from "react";
import styles from "./Game.module.css";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letterArr,
  score,
  attempt,
  wrongLetterArr,
  guessedLetterArr,
}) => {
  console.log(pickedWord);
  console.log(pickedCategory);
  console.log(letterArr);

  const [letter, setLetter] = useState("");

  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let l = letter;
    l = l.toLowerCase();
    verifyLetter(l);

    setLetter("");
    letterInputRef.current.focus();
  };

  return (
    <section className={`${styles.game} container`}>
      <h1 className="title">Secret Word</h1>
      <p className={styles.score}>
        Pontuação: <span>{score}</span>
      </p>

      <h3 className={styles.tip}>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>

      <p>Você ainda tem {attempt} tentativa(s).</p>

      <div className={styles.word_container}>
        {letterArr.map((letter, i) =>
          guessedLetterArr.includes(letter) ? (
            <span key={i} className={styles.letter}>
              {letter}
            </span>
          ) : (
            <span key={i} className={styles.blank}></span>
          )
        )}
      </div>

      <div className={styles.letter_container}>
        <p>Tente adivnhar uma letra da palavra</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            required
            value={letter}
            ref={letterInputRef}
            autoComplete="off"
          />
          <button className="btn btn-primary">Jogar!</button>
        </form>
      </div>
      <div className={styles.wrong_letter_container}>
        {wrongLetterArr.length > 0 && <p>Letras já utilizadas:</p>}
        {wrongLetterArr.map((wrongLetter, i) => (
          <span key={i}>{wrongLetter}</span>
        ))}
      </div>
    </section>
  );
};

export default Game;
