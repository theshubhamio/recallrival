import { useReducer, useState, useEffect } from "react";


function GridRecall() {

    // Initial grid setup: 5x5 grid (25 elements)
    const [griddots, setGriddots] = useState(Array(25).fill(
        { isSelected: false, isCorrect: true, rank: 0 }
    ));

    // Player 1
    const [player1, setPlayer1] = useState({
        mode: 0,
        haveLost: false,
        turn: false,
        playedDots: [],
        correctDots: []
    })

    // Player 2
    const [player2, setPlayer2] = useState({
        mode: 1,
        haveLost: false,
        turn: true,
        playedDots: [],
        correctDots: []
    })

    function onDotClick(index) {

        if (griddots[index].isSelected) return; // Prevent selecting already clicked dots



        const p1 = { ...player1 };
        const p2 = { ...player2 };




        if (player1.turn && !player2.turn) {



            p1.playedDots.push(index);
            console.log("p1 played")

            if (p1.playedDots.length > p1.correctDots.length) {
                //tranfter the turn



                let newgriddots = [...griddots];
                newgriddots[index] = { isSelected: true, isCorrect: true,rank: p1.playedDots.length };

                setGriddots(newgriddots);

                //reset grid
                setTimeout(() => {
                    const resetGrid = Array(25).fill(
                        { isSelected: false, isCorrect: true, rank:0 }
                    )
                    setGriddots(resetGrid);
                    console.log("p1 transfeted");
                    p1.turn = false;
                    p2.turn = true;

                    p1.correctDots = p1.playedDots;
                    p2.correctDots = p1.playedDots;

                    p1.playedDots = [];
                    p2.playedDots = [];

                    setPlayer1(p1);
                    setPlayer2(p2);
                }, 800); // 500ms delay


            } else {

                //cleck of the selected dot is correct
                if (p1.playedDots[p1.playedDots.length - 1] === p1.correctDots[p1.playedDots.length - 1]) {

                    let newgriddots = [...griddots];
                    newgriddots[index] = { isSelected: true, isCorrect: true, rank:p1.playedDots.length };

                    setGriddots(newgriddots);

                    console.log(p1)


                } else {
                    //p1 lost
                    console.log("p1 lost")
                    let newgriddots = [...griddots];
                    newgriddots[index] = { isSelected: true, isCorrect: false,ranl:p1.playedDots.length };

                    setGriddots(newgriddots);
                    setPlayer1({ ...{ player1 }, haveLost: true });

                }
            }

        }

        if (player2.turn && !player1.turn) {

            p2.playedDots.push(index);
            console.log("p2 played")
            console.log(p2);



            if (p2.playedDots.length > p2.correctDots.length) {


                let newgriddots = [...griddots];
                newgriddots[index] = { isSelected: true, isCorrect: true, rank:p2.playedDots.length };

                setGriddots(newgriddots);


                //reset grid
                setTimeout(() => {
                    const resetGrid = Array(25).fill(
                        { isSelected: false, isCorrect: true, rank:0 }
                    )
                    setGriddots(resetGrid);

                    //tranfter the turn
                    p2.turn = false;
                    p1.turn = true;

                    p2.correctDots = p2.playedDots;
                    p1.correctDots = p2.playedDots;

                    p1.playedDots = [];
                    p2.playedDots = [];

                    setPlayer1(p1);
                    setPlayer2(p2);
                }, 800); // 500ms delay
            } else {


                //cleck of the selected dot is correct
                if (p2.playedDots[p2.playedDots.length - 1] === p2.correctDots[p2.playedDots.length - 1]) {



                    //trigger a change for useeffect
                    //reset grid
                    setTimeout(() => {
                        let newgriddots = [...griddots];
                        newgriddots[index] = { isSelected: true, isCorrect: true, rank:p2.playedDots.length };

                        setGriddots(newgriddots);
                        console.log("p2 clicked the correct dot")
                        console.log(p2)

                    }, 800); // 500ms delay




                } else {
                    //p2 lost
                    console.log("p2 lost")
                    let newgriddots = [...griddots];
                    newgriddots[index] = { isSelected: true, isCorrect: false, rank : p2.playedDots.length };

                    setGriddots(newgriddots);
                    setPlayer1({ ...{ player1 }, haveLost: true });
                }
            }

        }

    }

    // Handle Player 2's turn
    useEffect(() => {

        console.log("useEffect Clicked")

        if (player2.turn && player2.mode == 1) {
            console.log(player2)


            if (player2.playedDots.length >= player2.correctDots.length) {

                const timeout = setTimeout(() => {
                    const arr = [];
                    for (let i = 0; i < 25; i++) {
                        arr.push(i);
                    }
                    const remainingDots = arr.filter((dot) => !player2.correctDots.includes(dot));
                    console.log(remainingDots);
                    const randomIndex = remainingDots[Math.floor(Math.random() * remainingDots.length)];
                    onDotClick(randomIndex);
                }, 800); // 1-second delay for Player 2's move
                console.log("random 2 p2")
                return () => clearTimeout(timeout); // Cleanup timeout


            } else {
                console.log(player2.correctDots[player2.playedDots.length] + "uuuuu")

                onDotClick(player2.correctDots[player2.playedDots.length])
                console.log(player2)
                console.log("else")

            }

        }
    }, [griddots]);

    function resetGame() {

        setPlayer2({
            mode: 1,
            haveLost: false,
            turn: true,
            playedDots: [],
            correctDots: []
        })

        setPlayer1({
            mode: 0,
            haveLost: false,
            turn: false,
            playedDots: [],
            correctDots: []
        })

        setGriddots(Array(25).fill(
            { isSelected: false, isCorrect: true, rank:0 }
        ))

    }


    return (
        <div style={{ ...styles.container, background: "black" }}>

            <div style={styles.turnIndicator}>
                <div
                    style={{
                        ...styles.turnIndicatorBox,
                        border: player1.turn ? (player1.haveLost ? "4px  solid red" : "4px  solid white") : "0px  solid white"
                    }}
                >
                    You
                </div>
                <div
                    style={{
                        ...styles.turnIndicatorBox,
                        border: player2.turn ? "4px  solid white" : "0px  solid white"

                    }}
                >

                    Recall Rival
                </div>

            </div>


            <div style={{
                ...styles.grid,
                gridTemplateColumns: `repeat(5, 1fr)`,
                gridTemplateRows: `repeat(5, 1fr)`

            }}>


                {griddots.map((dot, index) => (

                    <div
                        key={index}
                        onClick={() => onDotClick(index)}
                        style={{
                            ...styles.dot,
                            backgroundColor: dot.isSelected ? (dot.isCorrect ? '#32CD32' : '#DC143C') : '#F0F0F0',
                            alignContent: "center",
                            fontSize: "28px",
                            color:"white",
                            fontStyle: "bold"
                            

                        }}

                        
                    >
                        {dot.isSelected?(dot.rank):""}

                    </div>
                ))}


            </div>

            <div style={{ color: "white", padding: "40px" }}><p>Take turns selecting dots on the grid and repeat the full sequence before choosing your dot. A wrong move or repeating a dot ends your turn. Keep the sequence going to win!</p>

            </div>


            {player1.haveLost && (
                <div style={styles.gameOverOverlay} onClick={resetGame}>
                    <h2>🔴 Game Over 🔴</h2>
                    <p>Tap to restart</p>
                </div>)}
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
    },
    turnIndicatorBox: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

        padding: "10px",
        fontSize: "30px",
        height: "15vh",
        maxHeight: "400px",
        color: "white",
        borderRadius: "20px",
        margin: "5px",

    },
    turnIndicator: {
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
        margin: "10px",

        width: "90vw",
        height: "15vh",
        maxWidth: "500px",
        padding: "20px"

    },
    gameOverOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        zIndex: 10,
        borderRadius: "5px",
    },

};

export default GridRecall;