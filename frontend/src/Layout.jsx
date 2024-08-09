import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./components/NavBar"
import Footer from "./components/Footer"

export default function Layout() {
    return (
        <>
            <Navbar/>
            <Outlet />
            <Footer/>
        </>
    )
}