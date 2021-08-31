import React, {useContext, useEffect, useRef} from "react";

import {CandidatesContext} from "../../Contexts/candidates";
import {Candidate} from "../../types/candidate";

import styles from "./Module.module.scss";

type DeleteModuleProps = {
  toogleDelete: () => void;
  candidate: Candidate;
};

const DeleteModule = ({toogleDelete, candidate}: DeleteModuleProps) => {
  const {deleteCandidate} = useContext(CandidatesContext);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (deleteButtonRef.current) {
      deleteButtonRef.current.focus();
    }
  }, []);

  const borrarCandidato = (): void => {
    deleteCandidate(candidate.id);
    toogleDelete();
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupBody}>
        <header className={styles.popupHeader}>
          <h1>Borrar candidato</h1>
          <button onClick={toogleDelete}>X</button>
        </header>
        <section className={styles.popUpCuerpo}>
          <p className={styles.popUpP}>
            ¿Esta seguro que desea eliminar al candidato <b>{candidate.name}</b>?
          </p>
          <button ref={deleteButtonRef} className={styles.popUpButtonRed} onClick={borrarCandidato}>
            Eliminar
          </button>
        </section>
      </div>
    </div>
  );
};

export default DeleteModule;
