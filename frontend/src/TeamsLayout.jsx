import React from "react"
import { Outlet } from "react-router-dom"
import TeamNavbar from "./components/TeamNavbar"
import Footer from "./components/Footer"

export default function TeamsLayout() {
    return (
        <>
            <TeamNavbar/>
            <Outlet />
            <Footer/>
        </>
    )
}