import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  firstName: string
  updateFirstName: (newFirstName: string) => void
  userDescription: string
  updateUserDescription: (newUserDescription: string) => void
  profileImage: string
  updateProfileImage: (newProfileImage: string) => void
  tabs: []
  updateTabsArray: (newTabsArray: []) => void
}

export const useInfoStore = create<User>()(persist((set, get) => ({
  firstName: '',
  updateFirstName: (newFirstName: string) => {
    const firstNameState = get().firstName
    
    set({ firstName: newFirstName + firstNameState })
  },
  userDescription: '',
  updateUserDescription: (newUserDescription: string) => {
    set({ userDescription: newUserDescription})
  },
  profileImage: '',
  updateProfileImage: (newProfileImage: string) => {
    const profileImageState = get().profileImage

    set({ profileImage: newProfileImage + profileImageState })
  },
  tabs: [],
  updateTabs: (newTabsArray: []) => {
    /*const tabsState = get().tabs*/

    set({ tabs: newTabsArray})
  },
  storage: createJSONStorage(() => sessionStorage)
})))