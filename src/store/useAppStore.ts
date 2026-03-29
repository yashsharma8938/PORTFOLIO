import { create } from 'zustand'

// Apply saved theme on module load (before React renders)
const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
if (savedTheme === 'light') {
  document.documentElement.classList.add('light')
} else {
  document.documentElement.classList.remove('light')
}

interface AppState {
  // Theme
  theme: 'dark' | 'light'
  toggleTheme: () => void

  // Audio
  audioEnabled: boolean
  toggleAudio: () => void

  // Loading
  isLoading: boolean
  loadingProgress: number
  setLoadingProgress: (progress: number) => void
  setLoading: (loading: boolean) => void

  // Navigation
  activeSection: string
  setActiveSection: (section: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: savedTheme,
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark'
    if (newTheme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
    localStorage.setItem('theme', newTheme)
    return { theme: newTheme }
  }),

  audioEnabled: false,
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),

  isLoading: true,
  loadingProgress: 0,
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
  setLoading: (loading) => set({ isLoading: loading }),

  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
}))
