import React from 'react'

const GlobalLoading = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-green-600"></div>
    </div>
  )
}

export default GlobalLoading