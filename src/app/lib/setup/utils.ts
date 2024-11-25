export const getNullCandidates = (boardWidth: number): null[] => {
  const candidateList = []
  for (let i = 0; i < boardWidth; i++) {
    candidateList.push(null)
  }

  return candidateList
}

export const getAllCandidates = (boardWidth: number): number[] => {
  const candidateList = []
  for (let i = 0; i < boardWidth; i++) {
    candidateList.push(i + 1)
  }

  return candidateList
}
