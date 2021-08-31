import React, {useEffect, useContext, useState} from "react";

import {CandidatesContext} from "../Contexts/candidates";
import Column from "../Components/Column/Column";
import AddModule from "../Components/Modules/AddModule";
import api from "../api";
import {Candidate} from "../types/candidate";

import styles from "./App.module.scss";

function App() {
  const {candidates, setCandidates} = useContext(CandidatesContext);

  const [showAdd, setShowAdd] = useState<Boolean>(false);

  const toogleAdd = () => {
    setShowAdd(!showAdd);
  };

  useEffect(() => {
    api.candidates.list().then((candidatitos) => {
      setCandidates(candidatitos);
    });
  }, []);

  const etapas: string[] = [
    "Entrevista inicial",
    "Entrevista técnica",
    "Oferta",
    "Asignación",
    "Rechazo",
  ];

  return (
    <main className={styles.main}>
      {showAdd ? <AddModule toogleAdd={toogleAdd} /> : null}
      {etapas.map((etapa, i) => {
        return (
          <Column
            key={i}
            candidates={candidates.filter(
              (c: Candidate) => c.step.toLowerCase() === etapa.toLowerCase(),
            )}
            title={etapa}
            toogleAdd={toogleAdd}
          />
        );
      })}
    </main>
  );
}

export default App;
