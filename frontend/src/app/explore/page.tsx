import Chatbot from '@/components/ChatbotSmall'
import CompanyInput from '@/components/CompanyInput'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='items-center justify-center'>
    <Navbar />
      <CompanyInput />
      <Chatbot />
    </div>
  )
}

export default page
