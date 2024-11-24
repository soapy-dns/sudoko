export const getBoxIndex = (x: number, y: number, boxWidth: number): number => {
  const boxIndex = Math.floor(y / boxWidth) * boxWidth + Math.floor(x / boxWidth)
  return boxIndex
}
