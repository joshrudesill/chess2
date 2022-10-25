import BoardSquare from "./boardSquare"

const BoardSquares = ({ rowData, row }) => {
    const e = row % 2
    return (
        <div className='columns g-0 is-variable is-centered'>
            {
                rowData.map((rs, i) => (
                    <BoardSquare key={i} squareData={rs} color={i % 2 + e} />
                ))
            }
        </div>
    )
}

export default BoardSquares;