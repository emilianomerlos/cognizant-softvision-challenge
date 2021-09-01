import React, {ReactNode, useState} from "react";

import {Candidate} from "../types/candidate";
import api from "../api";

type ProviderProps = {
  children: ReactNode;
};

const notContextValue: any = {
  candidates: [],
  setCandidates: () => {},
}; // Lo que va devolver el context si lo llamamos desde un lugar sin acceso (sin provider);

export const CandidatesContext = React.createContext(notContextValue);

const CandidatesProvider = ({children}: ProviderProps) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const edit = (exId: string, candidatoEdited: Candidate): void => {
    let newCandidates = candidates.map((c: Candidate): Candidate => {
      return c.id === exId ? candidatoEdited : c;
    });

    setCandidates(newCandidates);
    api.candidates.save(newCandidates);
  };

  const add = (id: string, name: string, comment: string): void => {
    let newCandidates = [
      ...candidates,
      {
        name: name.toLowerCase().trim(),
        comments: comment.trim(),
        step: "Entrevista inicial" as const,
        id: id.trim(),
      },
    ];

    setCandidates(newCandidates);
    api.candidates.save(newCandidates);
  };

  const deleteCandidate = (id: string): void => {
    const newCandidates = candidates.filter((c: Candidate) => c.id !== id);

    setCandidates(newCandidates);
    api.candidates.save(newCandidates);
  };

  const move = (id: string, direction: "foward" | "backward"): void => {
    const nextStep = {
      "Entrevista inicial": "Entrevista técnica" as const,
      "Entrevista técnica": "Oferta" as const,
      Oferta: "Asignación" as const,
      Asignación: "Rechazo" as const,
      Rechazo: "Rechazo" as const,
    };

    const prevStep = {
      "Entrevista inicial": "Entrevista inicial" as const,
      "Entrevista técnica": "Entrevista inicial" as const,
      Oferta: "Entrevista técnica" as const,
      Asignación: "Oferta" as const,
      Rechazo: "Asignación" as const,
    };

    let newCandidates = candidates.map((candidate: Candidate) => {
      if (candidate.id === id) {
        if (direction === "foward") {
          candidate.step = nextStep[candidate.step];
        } else {
          candidate.step = prevStep[candidate.step];
        }
      }

      return candidate;
    });

    setCandidates(newCandidates);
    api.candidates.save(newCandidates);
  };

  return (
    <CandidatesContext.Provider
      value={{candidates, setCandidates, move, add, edit, deleteCandidate}}
    >
      {children}
    </CandidatesContext.Provider>
  );
};

export default CandidatesProvider;
