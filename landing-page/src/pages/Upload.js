import React, { useState } from 'react'
import NavbarMenu from '../components/menu/navbarMenu'
import UploadComponent from '../components/upload/upload'
import MarkdownComponent from '../components/upload/markdown'
import '../styles/pages/Upload.css'

function Upload() {
  const [formData, setFormData] = useState(null);

  const handleDataSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div>
      <NavbarMenu />
      {!formData && <UploadComponent onSubmit={handleDataSubmit} />}
      {formData && <MarkdownComponent data={formData} />}
    </div>
  )
}

export default Upload