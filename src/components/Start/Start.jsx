import styles from "./Start.module.css";

const Start = ({ startGame }) => {
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={startGame}>
        Iniciar jogo
      </button>
    </div>
  );
};

export default Start;
