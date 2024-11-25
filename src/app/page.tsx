"use client"

import { Container } from "./components/button/container/Container"
import { Board } from "./components/Board"
import { SolveButtons } from "./components/SolveButtons"
import { BoardProvider } from "./ui/context/BoardProvider"

export default function Home() {
  //NOTE: if last cell of board is empty 'undefined' has to be used as value!
  // TODO: is there a better way than adding a custom attribute for css formatting

  return (
    <div className="h-screen">
      <Container>
        <div className="p-4">
          <BoardProvider>
            <Board />
            <SolveButtons />
          </BoardProvider>
        </div>
      </Container>
    </div>
  )
}
