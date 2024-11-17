import { create } from 'zustand'

export type ExerciseSet = {
  _id: string
  name: string
  exercises: string[]
}

type ExerciseSetBodyRequest = {
  name?: string
  exercises: string[]
}
type ExerciseSets = {
  exercisesets: ExerciseSet[];
  createExerciseSet: (newExerciseSet: string, selectedExercisesIds: string[]) => Promise<void>;
  fetchExerciseSet: () => Promise<void>;
  deleteExerciseSet: (id: string) => Promise<void>;
  deleteMultipleExerciseSet: (ids: string[]) => Promise<void>;
  updateExerciseSet: (id: string, body: ExerciseSetBodyRequest) =>  Promise<void>;
}

export const useExerciseSet = create<ExerciseSets>()((set) => ({
  exercisesets: [],
  createExerciseSet: async (newExerciseSet: string, selectedExercisesIds: string[]) => {
    const res = await fetch("/api/exerciseset", {
      method:"POST",
      headers:{
        "Content-type":"application/json",
      },
      body: JSON.stringify({name: newExerciseSet, exercises:selectedExercisesIds})
    });
    const data = await res.json();
    set((state) => ({ exercisesets: [...state.exercisesets, data.data]}));
  },
  fetchExerciseSet: async () => {
    const res = await fetch("/api/exerciseset", {
      method: "GET"
    })
    const data = await res.json();
    set({exercisesets: data.data})
  },
  deleteExerciseSet: async (id: string) => {
    try {
      const res = await fetch(`/api/exerciseset/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Erro ao deletar: ${res.statusText}`);
      }

      // Atualiza o estado removendo o exercício deletado
      set((state) => ({
        exercisesets: state.exercisesets.filter((exerciseset) => exerciseset._id !== id),
      }));
    } catch (error) {
      console.error("Erro ao deletar o exercício:", error);
    }
  },
  deleteMultipleExerciseSet: async (ids: string[]) => {
    try {
      const res = await fetch(`/api/exerciseset/multiple`, {
        method: "DELETE",
        headers:{
          "Content-type":"application/json",
        },
        body: JSON.stringify({ids: ids})
      });

      if (!res.ok) {
        throw new Error(`Erro ao deletar: ${res.statusText}`);
      }

      // Atualiza o estado removendo o exercício deletado
      set((state) => ({
        exercisesets: state.exercisesets.filter((exercise) => !ids.includes(exercise._id)),
      }));
    } catch (error) {
      console.error("Erro ao deletar o exercício:", error);
    }
  },
  updateExerciseSet: async (id: string, body: ExerciseSetBodyRequest) => {
    try {
      // Fazendo a requisição PUT para o backend
      const res = await fetch(`api/exerciseset/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (!res.ok) {
        throw new Error(`Erro ao atualizar: ${res.statusText}`);
      }
  
      // Atualiza o estado do zustand substituindo o exercício atualizado na lista
      set((state) => ({
        exercisesets: state.exercisesets.map((exerciseSet) =>
          exerciseSet._id === id
            ? { ...exerciseSet, ...body } // Atualiza o exercício correspondente
            : exerciseSet // Deixa os outros exercícios inalterados
        ),
      }));
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }
}))
