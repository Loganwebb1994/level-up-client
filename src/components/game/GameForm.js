import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = () => {
  const history = useHistory()
  const { createGame, getGameTypes, gameTypes, getGameById, updateGame } = useContext(GameContext)
  const {gameId} = useParams()
  const [currentGame, setCurrentGame] = useState({
      name: "",
      game_type_id: 0
  })
  useEffect(() => {
      getGameTypes().then(()=>{
          if(gameId){
              getGameById(gameId).then(setCurrentGame)
          }
      })
  }, [])

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
              <label htmlFor="name">Name: </label>
              <input type="text" name="name" required autoFocus className="form-control"
                  value={currentGame.name}
                  onChange={handleInputChange}
              />
          </div>
      </fieldset>
      <fieldset>
          <div className="form-group">
              <label htmlFor="game_type_id">GameType: </label>
              <select name="game_type_id" className="form-control"
                  value={currentGame.game_type_id}
                  onChange={handleInputChange}>
                  <option value="0">Select a Game Type</option>
                  {gameTypes.map(gameType => (
                      <option key={gameType.id} value={gameType.id}>
                          {gameType.name}
                      </option>
                  ))}
              </select>
          </div>
      </fieldset>



      {/* You create the rest of the input fields for each game property */}

      <button type="submit"
          onClick={evt => {
              // Prevent form from being submitted
              evt.preventDefault()

              const game = {
                  name: currentGame.name,
                  gameTypeId: parseInt(currentGame.game_type_id)
              }
              // Send POST request to your API
              if(gameId){
                  const game = {
                      id: currentGame.id,
                      gameTypeId: parseInt(currentGame.game_type_id),
                      name: currentGame.name
                  }
                  updateGame(game).then(() => history.push("/"))
              }else{
                  const game = {
                      name: currentGame.name,
                      gameTypeId: parseInt(currentGame.game_type_id)
                  }
                  createGame(game).then(() => history.push("/"))
              }
          }}
          className="btn btn-primary">{gameId?"Edit":"Create"}</button>
  </form>
    )
}