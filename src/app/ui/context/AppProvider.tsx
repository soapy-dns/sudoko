import React, { ReactNode, useState, createContext } from "react"

interface Props {
  showCandidates: boolean
  toggleCandidatesView: () => void
}

export const AppContext = createContext<Props>({ showCandidates: false, toggleCandidatesView: () => {} })

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [showCandidates, setShowCandidates] = useState<boolean>(false)

  const toggleCandidatesView = () => {
    setShowCandidates(!showCandidates)
  }

  return <AppContext.Provider value={{ toggleCandidatesView, showCandidates }}>{children}</AppContext.Provider>
}
