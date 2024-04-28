import styles from "./Start.module.css";

const Start = ({ startGame }) => {
  return (
    <section className={`${styles.start_game} container`}>
      <h1 className="brand">
        Secret <span>W</span>ord
      </h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button type="button" className="btn btn-primary" onClick={startGame}>
        Iniciar jogo
      </button>
    </section>
  );
};

export default Start;
