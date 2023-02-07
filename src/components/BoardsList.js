import Board from "./Board";

const BoardsList = ({boards}) => {
    return(
        <section>
            <h2> BOARDS </h2>
            <ol>
            {boards.map((board)=>{
                return( 
                    <li key={board.id}>
                        <Board 
                            id={board.id}
                            title={board.title}
                            owner={board.owner}
                            status={board.status}
                            cards={board.cards}
                            selected={board.selected}
                        />
                    </li>)
            })}
            </ol>
        </section>
    );
};

export default BoardsList;