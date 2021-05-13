import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    
    const { createGame, getGameTypes, gameTypes, getGameById, updateGame } = useContext(GameContext)
    
    const {gameId} = useParams()
    
    const [currentGame, setCurrentGame] = useState({
        title: "",
        game_type_id: 0
    })

const handleSaveGame = () =>{
    if (gameId) {
        updateGame({
            id: gameId,
            skillLevel: parseInt(currentGame.skillLevel),
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            title: currentGame.title,
            maker: currentGame.maker,
            gameTypeId: parseInt(currentGame.gameTypeId)
        })
        .then(() => history.push("/"))
    } else {
        createGame({
            skillLevel: parseInt(currentGame.skillLevel),
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            title: currentGame.title,
            maker: currentGame.maker,
            gameTypeId: parseInt(currentGame.gameTypeId)
        })
        .then(() => history.push("/"))
    }
}

    useEffect(() => {
        getGameTypes()
    }, [])

    useEffect(() => {
        if (gameId) {
            getGameById(gameId)
                .then(game => {
                    setCurrentGame({
                        skillLevel: game.skill_level,
                        numberOfPlayers: game.number_of_players,
                        title: game.title,
                        maker: game.maker,
                        gameTypeId: game.game_type.id
                    })
                })
        }
    }, [gameId])


    const handleInputChange = (e) => {
        const tempGame = {...currentGame}
        tempGame[e.target.name] = e.target.value
        setCurrentGame(tempGame)
    }

        return (
        <form className="gameForm">
        <h2 className="gameForm__title">Register New Game</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" required autoFocus className="form-control"
                    value={currentGame.title}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="maker">Maker: </label>
                <input type="text" name="maker" required autoFocus className="form-control"
                    value={currentGame.maker}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="numberOfPlayers">Number Of Players: </label>
                <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                    value={currentGame.numberOfPlayers}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="skillLevel">Skill Level: </label>
                <input type="text" name="skillLevel" required autoFocus className="form-control"
                    value={currentGame.skillLevel}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="gameType">GameType: </label>
                <select name="gameType" className="form-control" value={currentGame.gameTypeId}onChange={handleInputChange}>
                    <option value="0">Select a Game Type</option>
                    {gameTypes.map(gameType => (
                        <option key={gameType.id} value={gameType.id}>
                            {gameType.label}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>




        {/* You create the rest of the input fields for each game property */}

        <button type="submit"
            onClick={evt => {
                evt.preventDefault()
                handleSaveGame()

                // Send POST request to your API
                }
            }
            className="btn btn-primary">{gameId?"Edit":"Create"}</button>
    </form>
        )
    }