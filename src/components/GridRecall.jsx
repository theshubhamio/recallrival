import { useReducer, useState, useEffect } from "react";


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
        playedDots: [],
        correctDots: []
    })

    // Player 2
    const [player2, setPlayer2] = useState({
        mode: 0,
        haveLost: false,
        turn: true,
        playedDots: [],
        correctDots: []
    })

    function onDotClick(index) {

        const p1 = {...player1};
        const p2 = {...player2};

        if(player1.turn && !player2.turn){

            p1.playedDots.push(index);
            console.log("p1 played")

            if(p1.playedDots.length>p1.correctDots.length){
                //tranfter the turn

                p1.turn =false;
                p2.turn = true;

                p1.correctDots = p1.playedDots;
                p2.correctDots = p1.playedDots;

                p1.playedDots = [];
                p2.playedDots = [];

                setPlayer1(p1);
                setPlayer2(p2)

                //reset grid
                const resetGrid = Array(25).fill(
                    { isSelected: false, isCorrect: true }
                )
                setGriddots(resetGrid);
                console.log("p1 transfeted");

            }else{

                //cleck of the selected dot is correct
                if(p1.playedDots[p1.playedDots.length-1]===p1.correctDots[p1.playedDots.length-1]){

                    let newgriddots = [...griddots];
                    newgriddots[index] = {isSelected :true, isCorrect:true};

                    setGriddots(newgriddots);
                    
                    console.log("p1 clicked the correct dot")

                }else{
                    //p1 lost
                    console.log("p1 lost")
                }
            }

        }

        if(player2.turn && !player1.turn){

            p2.playedDots.push(index);
            console.log("p2 played")


            if(p2.playedDots.length>p2.correctDots.length){
                //tranfter the turn
                p2.turn =false;
                p2.correctDots = p2.playedDots;
                setPlayer2(p2);
                p1.turn = true;
                p1.correctDots = p2.playedDots;
                setPlayer1(p1)

                //reset grid
                const resetGrid = Array(25).fill(
                    { isSelected: false, isCorrect: true }
                )
                setGriddots(resetGrid);
                console.log("p2 trnsfeted")
            }else{


                //cleck of the selected dot is correct
                if(p2.playedDots[p2.playedDots.length-1]===p2.correctDots[p2.playedDots.length-1]){

                    let newgriddots = [...griddots];
                    newgriddots[index] = {isSelected :true, isCorrect:true};

                    setGriddots(newgriddots);
                    console.log("p2 clicked the correct dot")


                }else{
                    //p2 lost
                    console.log("p2 lost")
                }
            }

        }


        
       

    }

    useEffect(() => {
        // code to run after rendering
        if (player2.mode !== 0) {
            if (player2.turn) {

            }
        }
    }, [player2]);


    return (
        <div style={{ ...styles.container, background: "black" }}>
            <p style={{ background: "white" }}>{`${player1.turn}`}</p>

            <div style={{
                ...styles.grid,
                gridTemplateColumns: `repeat(5, 1fr)`,
                gridTemplateRows: `repeat(5, 1fr)`,
                background: `yellow`
            }}>

                {griddots.map((dot, index) => (
                    <div
                        key={index}
                        onClick={() => onDotClick(index)}
                        style={{
                            ...styles.dot,
                            backgroundColor: dot.isSelected ? 'black' : 'blue',
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