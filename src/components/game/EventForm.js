import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory, useParams } from 'react-router-dom'
import { GameContext } from "./GameProvider.js"

export const EventForm = () => {
    const history = useHistory()

    const {createEvent} = useContext(EventContext)

    const {getGames, games} = useContext(GameContext)

    const {eventId} = useParams()

    const [currentEvent, setCurrentEvent] = useState({})

    useEffect(() => {
      getGames()
      }, [])
    

    const changeEventState = (e) => {
        const tempEvent = {...currentEvent}
        tempEvent[e.target.name] = e.target.value
        setCurrentEvent(tempEvent)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input name="description" type="text" onChange={ changeEventState } value={currentEvent.description}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={ changeEventState }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={ changeEventState }
                    />
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    const event = {...currentEvent}
                    event.gameId = parseInt(event.gameId)

                    createEvent(event).then(res => history.push('/events'))


                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}