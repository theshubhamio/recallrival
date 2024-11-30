import { useReducer, useState } from "react";


function GridRecall() {

    // Initial grid setup: 5x5 grid (25 elements)
    const [griddots, setGriddots] = useState(Array(25).fill(
        { isSelected: false, isCorrect: true }
    ));

    // Player 1
    const [player1, setPlayer1] = useState({
        mode: 0,
        haveLost: false,
        turn: false,
        playeddots: [],
        correctDots: []
    })

    // Player 2
    const [player2, setPlayer2] = useState({
        mode: 1,
        haveLost: false,
        tuen: true,
        playedDots: [],
        correctDots: []
    })





    function onDotClick(dot, index) {
        //game logic to update the states
        


    }


    return (
        <div style={{ ...styles.container, background: "black" }}>

            <div style={{
                ...styles.grid,
                gridTemplateColumns: `repeat(5, 1fr)`,
                gridTemplateRows: `repeat(5, 1fr)`,
                background: `yellow`
            }}>

                {griddots.map((dot,index) => (
                    <div
                        onClick={() => onDotClick(dot,index)}
                        style={{
                            ...styles.dot,
                            backgroundColor: dot.isSelected ? 'yellow' : 'blue',
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
    },
    grid: {
        display: "grid",
        aspectRatio: "1",
        width: "90vw",
        maxWidth: "500px",
        height: "90vw",
        maxHeight: "500px",
        gap: "10px",
        padding: "20px",
        borderRadius: "10%"
    },
    dot: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgray",
        aspectRatio: "1",
        cursor: 'pointer',
        borderRadius: "50%"
    }

};

export default GridRecall;