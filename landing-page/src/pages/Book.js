import React, { useState } from 'react'
import NavbarMenu from '../components/menu/navbarMenu'
import BookComponent from '../components/book/book'
import '../styles/pages/Book.css'

function Book() {
    return (
        <div>
            <NavbarMenu />
            <div className="main-content-book">
                <BookComponent />
            </div>
        </div>
    )
}

export default Book