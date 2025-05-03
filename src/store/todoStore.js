// store/todoStore.js
import { create } from "zustand";

export const useTodoStore = create((set) => ({
  items: [],
  input: '',
  addItem: () => set((state) => {
    if (!state.input.trim()) return;
    const newItem = {
      id: state.items.length + 1,
      name: state.input,
      isCompleted: false
    };
    return {
      items: [...state.items, newItem],
      input: ""
    };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  toggleItem: (id) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    )
  })),
  setInput: (value) => set({ input: value }),
  handleEditItem:(id,newName)=>set((state)=>({items:state.items.map((i)=>i.id===id?{...i,name:newName}:i)}))
}));
