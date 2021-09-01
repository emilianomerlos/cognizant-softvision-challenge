import React, {useContext, useState} from "react";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";

import {CandidatesContext} from "../../Contexts/candidates";
import {Candidate} from "../../types/candidate";
import DeleteModule from "../Modules/DeleteModule";
import EditModule from "../Modules/EditModule";

import styles from "./Candidate.module.scss";

type CandidateProps = {
  candidate: Candidate;
};

const CandidateCard = ({candidate}: CandidateProps) => {
  const {move} = useContext(CandidatesContext);

  const [showDelete, setShowDelete] = useState<Boolean>(false);
  const [showEdit, setShowEdit] = useState<Boolean>(false);

  const toogleDelete = (): void => {
    setShowDelete(!showDelete);
  };

  const toogleEdit = (): void => {
    setShowEdit(!showEdit);
  };

  return (
    <article className={styles.candidate}>
      {showDelete ? <DeleteModule candidate={candidate} toogleDelete={toogleDelete} /> : null}
      {showEdit ? <EditModule candidate={candidate} toogleEdit={toogleEdit} /> : null}
      <header className={styles.candidateHeader}>
        <h2 className={styles.candidateName}>{candidate.name}</h2>
        <section className={styles.candidateButtons}>
          <button className={styles.candidateButton} onClick={() => move(candidate.id, "backward")}>
            {"<"}
          </button>
          <button className={styles.candidateButton} onClick={() => move(candidate.id, "foward")}>
            {">"}
          </button>
        </section>
      </header>
      <p className={candidate.comments ? styles.candidateComment : styles.candidateNoComment}>
        {candidate.comments || "Sin comentario"}
      </p>
      <section className={styles.candidateOptions}>
        <button className={styles.candidateEdit} onClick={toogleEdit}>
          <AiOutlineEdit />
          Editar
        </button>
        <button className={styles.candidateDelete} onClick={toogleDelete}>
          <AiOutlineDelete />
          Borrar
        </button>
      </section>
    </article>
  );
};

export default CandidateCard;
