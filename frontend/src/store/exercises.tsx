import { create } from 'zustand'

export type Exercise = {
  _id: string
  name: string
  tags: string[]
}

type Exercises = {
  exercises: Exercise[];
  exerciseMapping:Record<string, string>;
  createExercises: (newExercise: string) => Promise<void>;
  fetchExercises: () => Promise<void>;
  deleteExercise: (id: string) => Promise<void>;
  deleteMultipleExercises: (ids: string[]) => Promise<void>;
}

// Função auxiliar para atualizar o mapeamento de exercícios
const updateExerciseMapping = (exercises: Exercise[]): Record<string, string> => {
  return exercises.reduce((map, exercise) => {
    map[exercise._id] = exercise.name;
    return map;
  }, {} as Record<string, string>);
};

export const useExercises = create<Exercises>()((set) => ({
  exercises: [],
  exerciseMapping: {},

  // Função para atualizar o estado com ambos exercises e exerciseMapping
  updateExercisesState: (updatedExercises: Exercise[]) => {
    set({
      exercises: updatedExercises,
      exerciseMapping: updateExerciseMapping(updatedExercises),
    });
  },

  createExercises: async (newExercise: string) => {
    const res = await fetch("/api/exercises", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: newExercise, tags: [] }),
    });
    const data = await res.json();

    // Atualiza tanto exercises quanto exerciseMapping
    set((state) => ({
      exercises: [...state.exercises, data.data],
      exerciseMapping: updateExerciseMapping([...state.exercises, data.data]),
    }));
  },

  fetchExercises: async () => {
    const res = await fetch("/api/exercises", {
      method: "GET",
    });
    const data = await res.json();

    // Atualiza tanto exercises quanto exerciseMapping
    set({
      exercises: data.data,
      exerciseMapping: updateExerciseMapping(data.data),
    });
  },

  deleteExercise: async (id: string) => {
    try {
      const res = await fetch(`/api/exercises/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Erro ao deletar: ${res.statusText}`);
      }

      // Atualiza tanto exercises quanto exerciseMapping
      set((state) => {
        const updatedExercises = state.exercises.filter((exercise) => exercise._id !== id);
        return {
          exercises: updatedExercises,
          exerciseMapping: updateExerciseMapping(updatedExercises),
        };
      });
    } catch (error) {
      console.error("Erro ao deletar o exercício:", error);
    }
  },

  deleteMultipleExercises: async (ids: string[]) => {
    try {
      const res = await fetch(`/api/exercises/multiple`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ids: ids }),
      });

      if (!res.ok) {
        throw new Error(`Erro ao deletar: ${res.statusText}`);
      }

      // Atualiza tanto exercises quanto exerciseMapping
      set((state) => {
        const updatedExercises = state.exercises.filter((exercise) => !ids.includes(exercise._id));
        return {
          exercises: updatedExercises,
          exerciseMapping: updateExerciseMapping(updatedExercises),
        };
      });
    } catch (error) {
      console.error("Erro ao deletar o exercício:", error);
    }
  },
}));
