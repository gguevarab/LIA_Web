import React from 'react'
import NavbarMenu from '../components/menu/navbarMenu'
import UploadComponent from '../components/upload/upload'
import '../styles/pages/Upload.css'

function Upload() {
  return (
    <div>
      <NavbarMenu />
      <UploadComponent />
    </div>
  )
}

export default Upload