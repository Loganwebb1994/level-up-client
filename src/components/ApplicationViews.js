import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import {GameForm} from "./game/GameForm"
import { GameProvider } from "./game/GameProvider.js"
import {EventProvider} from "./game/EventProvider.js"
import {EventList} from "./game/EventList.js"
import { EventForm } from "./game/EventForm.js"
import {ProfileProvider} from "./auth/ProfileProvider"
import {ProfileList} from "./auth/ProfileList"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <Route exact path="/">
                    <GameList />
                </Route>
                <Route exact path="/games/new">
                    <GameForm />
                </Route>
                <Route exact path="/games/:gameId(\d+)/edit">
                        <GameForm />
                </Route>
            </GameProvider>
            <EventProvider>
                <GameProvider>
                    <Route exact path="/events">
                        <EventList />
                    </Route>
                    <Route exact path="/events/new">
                        <EventForm/>
                    </Route>
                </GameProvider>
            </EventProvider>
            <ProfileProvider>
                <Route exact path="/profile">
                    <ProfileList />
                </Route>
            </ProfileProvider>
        </main>
    </>
}