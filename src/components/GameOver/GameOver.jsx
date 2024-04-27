import styles from "./GameOver.module.css";

const GameOver = ({ retry, score }) => {
  return (
    <section className={`${styles.game_over} container`}>
      <h1>Fim de jogo!</h1>
      <h3>
        A sua pontuação foi: <span>{score}</span>!
      </h3>
      <button className="btn btn-primary" type="button" onClick={retry}>
        Tentar de novo
      </button>
    </section>
  );
};

export default GameOver;
