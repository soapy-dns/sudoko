"use client"

import { Container } from "./components/button/container/Container"
import { initBoard } from "./lib/setup/initBoard"
import { Board } from "./components/Board"
import { SolveButtons } from "./components/SolveButtons"
import { generateHouses } from "./lib/setup/generateHouses"
import { eliminateCandidates } from "./lib/eliminateCandidates"
import { AppProvider } from "./ui/context/AppProvider"

export default function Home() {
  // prettier-ignore
  const board = [
			,5, , , ,2,3,8,
			, ,1, , , ,4, , ,5
			, ,2, , ,5, , , ,
			,5, ,7,8, , ,2,1,
			,4,6, ,2,3,7, ,5,8
			, ,9,8, , ,5,4, ,7
			, , , , ,6, , ,4,
			,1, , ,9, , , ,6,
			, ,7,3,4, , , ,9,undefined
		]

  const houses = generateHouses(9)
  const enhancedBoard = initBoard(board)
  eliminateCandidates({ board: enhancedBoard, houses })

  //NOTE: if last cell of board is empty 'undefined' has to be used as value!
  // TODO: is there a better way than adding a custom attribute for css formatting

  return (
    <div className="h-screen">
      <Container>
        <div className="p-4">
          <AppProvider>
            <Board board={enhancedBoard} />
            <SolveButtons />
          </AppProvider>
        </div>
      </Container>
    </div>
  )
}
