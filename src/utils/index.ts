
export const checkIfDarkMode = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  }
}

export const toggleDark = (isDark: boolean): void => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  // Whenever the user explicitly chooses light mode
  localStorage.theme = isDark ? 'dark' : 'light'
}


