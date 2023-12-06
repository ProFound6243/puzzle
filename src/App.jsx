import { useEffect, useState } from "react"

function App() {

	const generateBoard = () => {
		const numbers = Array.from({ length: 15 }, (_, index) => index + 1 )
		numbers.push(null)
		return numbers.sort( () => Math.random() - 0.5 )
	}

	const [board, setBoard] = useState(generateBoard())
	const [win, setWin] = useState(false)


	const getNeightborItems = (index) => {
		const row = Math.floor( index / 4 )
		const col = index % 4
		const neightborItemList = []

		if ( row > 0 ) { neightborItemList.push( index - 4 ) }
		if ( row < 3 ) { neightborItemList.push( index + 4 ) } 
		if ( col > 0 ) { neightborItemList.push( index -1 ) } 
		if ( col < 3 ) { neightborItemList.push( index + 1 ) }

		return neightborItemList
	}

	const handleItemClick = (index) => {
		const emptyIndex = board.indexOf(null)
		const neightborItems = getNeightborItems(emptyIndex)

		if ( neightborItems.includes(index) ) {
			const newBoard = [...board]
			const indexValue = newBoard[index]
			newBoard[emptyIndex] = indexValue
			newBoard[index] = null
			setBoard(newBoard)
		}
		
	}

	const isSolved = () => {

		for (let i = 0; i < board.length - 1; i++) {

			if (board[i] !== i + 1) {

				return false

			}

		}

		return true

	}

	useEffect(() => {
		if (isSolved()) {
			setWin(true)
		}
	}, [board])

	return (
		<>

			<section className="relative min-w-screen min-h-screen grid place-content-center select-none">

				<div className="relative w-auto h-auto p-4 grid grid-cols-4 gap-4 bg-red-100 rounded-md">
				
					{board.map((item, index) => (

						<button key={index}
							onClick={() => handleItemClick(index)}
							className={`relative w-16 h-16 grid place-content-center bg-indigo-500 rounded-md font-bold text-2xl text-white hover:cursor-pointer ${item === null ? "opacity-0" : ""} disabled`}>

							{item}
						</button>
						

					))}

					{win ? (
						<div className="absolute w-full h-full flex flex-col justify-center gap-8 p-8 before:absolute before:w-full before:h-full before:bg-black before:opacity-90 before:top-0 before:left-0 before:rounded-md">
							<p className="relative text-stone-100 text-center">{`Yangi o'yin boshlashni xohlasizmi?`}</p>
							<button onClick={() => {setBoard(generateBoard()); setWin(false)}} className="relative bg-indigo-500 p-2 rounded-md text-white">Yes</button>
						</div>
					) : ("")}

				</div>

				<button onClick={() => setWin(true)} className="relative px-8 py-2 bg-indigo-500 rounded-md mt-8 text-white">New Game</button>
			</section>
		
		</>
	)}

export default App
