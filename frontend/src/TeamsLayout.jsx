import React from "react"
import { Outlet } from "react-router-dom"
import TeamNavbar from "./components/TeamNavbar"

export default function TeamsLayout() {
    return (
        <>
            <TeamNavbar/>
            <Outlet />
        </>
    )
}