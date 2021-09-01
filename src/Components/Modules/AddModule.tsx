import React, {useContext, useEffect, useRef, useState} from "react";
import {IoCloseSharp} from "react-icons/io5";
import {AiOutlineUserAdd} from "react-icons/ai";

import {CandidatesContext} from "../../Contexts/candidates";
import {Candidate} from "../../types/candidate";

import styles from "./Module.module.scss";

type AddModuleProps = {
  toogleAdd: () => void;
};

const AddModule = ({toogleAdd}: AddModuleProps) => {
  const {add, candidates} = useContext(CandidatesContext);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const agregarCandidato = (): void => {
    if (name.trim() === "") {
      setError("Debe ingresar un nombre");
    } else if (id.trim() === "") {
      setError("Debe ingresar un ID");
    } else {
      const existID: boolean = candidates.some((c: Candidate) => c.id === id.trim());

      if (existID) {
        setError("Ya existe un candidato con esa ID");
      } else {
        add(id, name, comment);
        toogleAdd();
      }
    }
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
    let id = e.target.value.toLowerCase().replace(/\s/g, "");

    setId(id.trim());
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
          <h1>Nuevo candidato</h1>
          <button onClick={toogleAdd}>
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

          <button className={styles.popUpButton} onClick={agregarCandidato}>
            <AiOutlineUserAdd />
            Agregar
          </button>
        </section>
      </div>
    </div>
  );
};

export default AddModule;
