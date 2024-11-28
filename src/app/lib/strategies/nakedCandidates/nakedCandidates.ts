import { EnhancedBoard, Houses } from "../../types"
import { checkCombinedCandidates } from "./checkCombinedCandidates"
import { getUnusedValues } from "../../utils/getUnusedValues"

interface Props {
  numOfCandidates: number
  houses: Houses
  board: EnhancedBoard
}

// numOfCandidates is 2 for doubles 3 for triples
// TODO: returns pattern or false.  Why would we want to do this?
export const nakedCandidates = ({ numOfCandidates, houses, board }: Props) => {
  //for each type of house..(hor row / vert row / box)
  // const hlength = houses.length
  const { width } = board

  const houseTuple = Object.values(houses)
  const hlength = houseTuple.length

  for (let i = 0; i < hlength; i++) {
    //for each such house
    for (let j = 0; j < width; j++) {
      const indices = houseTuple[i][j]
      if (indices === undefined) {
        console.log("indices undefined", i, j, houseTuple[i])
      }
      if (getUnusedValues({ indices, board }).length <= numOfCandidates) {
        //can't eliminate any candidates
        continue
      }

      // TODO: maybe need this here, but moved to checkCombinedCandidates.ts
      //   const combineInfo = [] //{cell: x, candidates: []}, {} ..
      //   const minIndexes = [-1]

      //checks every combo of n candidates in house, returns pattern, or false
      const result = checkCombinedCandidates({ board, indices, startIndex: 0, numOfCandidates })
      if (result !== false) return result
    }
  }
  return false //pattern not found
}
