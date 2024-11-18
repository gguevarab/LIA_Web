import React from 'react'
import NavbarMenu from '../components/menu/navbarMenu'
import MaterialGrid from '../components/menu/materialGrid'
import '../styles/pages/Menu.css'

function Menu() {
  return (
    <div className="menu-container">
        <NavbarMenu />
        <MaterialGrid />
    </div>
  )
}

export default Menu