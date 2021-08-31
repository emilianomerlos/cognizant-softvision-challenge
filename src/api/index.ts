import {Candidate, steps} from "../types/candidate";

import jsonCandidates from "./candidates.json";

export default {
  candidates: {
    list: (): Promise<Candidate[]> => {
      let candidatesStorage: string | null = localStorage.getItem("CognizantCandidates");
      let candidates: Candidate[] = [];

      if (candidatesStorage) {
        candidates = JSON.parse(candidatesStorage);
      } else {
        candidates = jsonCandidates.map((c) => {
          const formatedCandidate: Candidate = {
            name: c.name,
            id: c.id,
            comments: c.comments,
            step: c.step as steps,
          };

          return formatedCandidate;
        });
      }

      return Promise.resolve(candidates);
    },
    save: (candidates: Candidate[]): void => {
      localStorage.setItem("CognizantCandidates", JSON.stringify(candidates));
      Promise.resolve();
    },
  },
};
