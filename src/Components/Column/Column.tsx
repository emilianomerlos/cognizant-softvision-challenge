import React from "react";

import CandidateCard from "../Candidate/Candidate";
import {Candidate} from "../../types/candidate";

import styles from "./Column.module.scss";

type ColumnProps = {
  title: string;
  candidates: Candidate[];
  toogleAdd: () => void;
};

const Column = ({candidates, title, toogleAdd}: ColumnProps) => {
  return (
    <section className={styles.col}>
      <header className={styles.colHeader}>
        <h1 className={styles.colTitle}>{title}</h1>
      </header>
      {candidates.length <= 0 ? (
        <p className={styles.colEmpty}>No hay candidatos</p>
      ) : (
        candidates.map((c: Candidate) => <CandidateCard key={c.id} candidate={c} />)
      )}

      {title === "Entrevista inicial" ? (
        <button className={styles.colAdd} onClick={toogleAdd}>
          Agregar candidato
        </button>
      ) : null}
    </section>
  );
};

export default Column;
