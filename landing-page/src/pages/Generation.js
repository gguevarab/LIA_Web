import React, { useState } from 'react'
import NavbarMenu from '../components/menu/navbarMenu'
import BookComponent from '../components/book/book'
import MarkdownComponent from '../components/upload/markdown'
import '../styles/pages/Book.css'

function Book() {
    return (
        <div>
            <NavbarMenu />
            <div className="main-content-book">
                <MarkdownComponent />
            </div>
        </div>
    )
}

export default Book