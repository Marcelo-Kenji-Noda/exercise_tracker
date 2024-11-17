import { create } from 'zustand'

export type Daily = {
    _id?: string
    date: Date
    exercise: string
    reps: number[]
}
type DailyTyping = {
    daily: Daily[]
    createDailyExercise: (date:string, exerciseId: string) => Promise<void>
    createDailyFromExerciseSet: (date:string, exerciseSetId: string) => Promise<void>
    deleteDaily: (id:string) => Promise<void>
    fetchDailyByDate: (date: string) => Promise<void>
    addRepToDaily: (id: string, value: number) => Promise<void>
    updateDailyReps: (id: string, reps: number[]) => Promise<void>
}

export const useDaily = create<DailyTyping>()((set) => ({
    daily: [],
    fetchDailyByDate: async (date: string) => {
        const res = await fetch("/api/daily/bydate", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({date: date}),
        });
        const data = await res.json();
        set({
            daily: data.data
        })
    },
    createDailyExercise: async (date:string, exerciseId: string) => {
        try {
            const res = await fetch(`/api/daily`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({date: date, exercise: exerciseId})
            });
            if (!res.ok){
                throw new Error(`Erro ao adicionar valor: ${res.statusText}`);
            }

            const data = await res.json();

            set((state) => ({
                daily: [...state.daily, data.data]
            }))
        } catch (error) {
            console.error("Erro ao adicionar valor ao Daily:", error);
            throw error;
        }
    },
    createDailyFromExerciseSet: async (date: string, exerciseSetId: string) => {
        try {
            const res = await fetch(`/api/daily/fromexerciseset`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({date: date, exerciseset: exerciseSetId})
            });
            if (!res.ok){
                throw new Error(`Erro ao adicionar valor: ${res.statusText}`);
            }

            const data = await res.json()

            set((state) => ({
                daily: [...state.daily, ...data.data]
            }))
        } catch (error) {
            console.error("Erro ao adicionar valor ao Daily:", error);
            throw error;
        }
    },
    deleteDaily: async (id: string) => {
        try {
          const res = await fetch(`/api/daily/${id}`, {
            method: "DELETE",
          });
    
          if (!res.ok) {
            throw new Error(`Erro ao deletar: ${res.statusText}`);
          }
    
          // Atualiza tanto exercises quanto exerciseMapping
          set((state) => {
            const updatedDaily = state.daily.filter((val) => val._id !== id);
            return {
              daily: updatedDaily,
            };
          });
        } catch (error) {
          console.error("Erro ao deletar o exercício:", error);
        }
    },
    addRepToDaily: async (id: string, value: number) => {
        try {
            const res = await fetch(`/api/daily/addvaluetodaily/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ value: value }),
            });
    
            // Verifica se a resposta foi bem-sucedida
            if (!res.ok) {
                throw new Error(`Erro ao adicionar valor: ${res.statusText}`);
            }
    
            // Extrai os dados da resposta
            const data = await res.json();
    
            // Retorne os dados atualizados, se necessário
            return data;
        } catch (error) {
            console.error("Erro ao adicionar valor ao Daily:", error);
            throw error; // Lança o erro novamente, caso queira lidar com ele externamente
        }
    },
    updateDailyReps: async (id: string, reps: number[]) => {
        try {
            const res = await fetch(`/api/daily/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reps }),
            });
    
            // Verifica se a resposta foi bem-sucedida
            if (!res.ok) {
                throw new Error(`Erro ao adicionar valor: ${res.statusText}`);
            }
    
            // Extrai os dados da resposta
            const data = await res.json();

                // Atualiza o estado do zustand substituindo o exercício atualizado na lista
            set((state) => ({
                daily: state.daily.map((daily) =>
                    daily._id === id
                    ? { ...daily, reps: data.data.reps } // Atualiza o exercício correspondente
                    : daily // Deixa os outros exercícios inalterados
                ),
            }));
            // Retorne os dados atualizados, se necessário
            return data;
        } catch (error) {
            console.error("Erro ao adicionar valor ao Daily:", error);
            throw error; // Lança o erro novamente, caso queira lidar com ele externamente
        }
    }
}))