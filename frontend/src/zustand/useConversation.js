import { create } from "zustand"

const useConversation = create((set)=>({
    selectedConversation:null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages:[],
    setMessages: (messages) => set({messages})
})) //it's just like usestate

export default useConversation;