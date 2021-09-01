import React, {useContext, useEffect, useRef, useState} from "react";
import {IoCloseSharp} from "react-icons/io5";
import {AiOutlineSave} from "react-icons/ai";

import {CandidatesContext} from "../../Contexts/candidates";
import {Candidate} from "../../types/candidate";

import styles from "./Module.module.scss";

type EditModuleProps = {
  toogleEdit: () => void;
  candidate: Candidate;
};

const EditModule = ({toogleEdit, candidate}: EditModuleProps) => {
  const {edit} = useContext(CandidatesContext);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>(candidate.name);
  const [id, setId] = useState<string>(candidate.id);
  const [comment, setComment] = useState<string>(candidate.comments);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const editarCandidato = (): void => {
    if (name.trim() === "") {
      setError("Debe ingresar un nombre");
    } else if (id.trim() === "") {
      setError("Debe ingresar un ID");
    } else {
      const newCandidate: Candidate = {
        id: id,
        name: name,
        comments: comment,
        step: candidate.step,
      };

      edit(candidate.id, newCandidate);
      toogleEdit();
    }
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
    setError("");
  };

  const changeId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setId(e.target.value.replace(/\s/g, ""));
    setError("");
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupBody}>
        <header className={styles.popupHeader}>
          <h1>Editar candidato</h1>
          <button onClick={toogleEdit}>
            <IoCloseSharp />
          </button>
        </header>
        <section className={styles.popUpCuerpo}>
          <label className={styles.popUpLabel} htmlFor="name">
            Nombre:
          </label>
          <input
            ref={nameInputRef}
            className={styles.popUpInput}
            id="name"
            placeholder="Ingrese un nombre"
            type="text"
            value={name}
            onChange={(e) => changeName(e)}
          />
          <label className={styles.popUpLabel} htmlFor="id">
            Id:
          </label>
          <input
            className={styles.popUpInput}
            id="id"
            placeholder="id"
            type="text"
            value={id}
            onChange={changeId}
          />
          <label className={styles.popUpLabel} htmlFor="comment">
            Comentario:
          </label>
          <input
            className={styles.popUpInput}
            id="comment"
            placeholder="Comentario"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {error.trim() !== "" ? <p className={styles.popUpError}>{error}</p> : null}

          <button className={styles.popUpButton} onClick={editarCandidato}>
            <AiOutlineSave />
            Guardar
          </button>
        </section>
      </div>
    </div>
  );
};

export default EditModule;
