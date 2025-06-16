import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  firstName: string
  updateFirstName: (newFirstName: string) => void
  profileImage: string
  updateProfileImage: (newProfileImage: string) => void
}

export const useInfoStore = create<User>()(persist((set, get) => ({
  firstName: '',
  updateFirstName: (newFirstName: string) => {
    const firstNameState = get().firstName
    
    set({ firstName: newFirstName + firstNameState })
  },
  profileImage: '',
  updateProfileImage: (newProfileImage: string) => {
    const profileImageState = get().profileImage

    set({ profileImage: newProfileImage + profileImageState })
  },
  storage: createJSONStorage(() => sessionStorage)
})))