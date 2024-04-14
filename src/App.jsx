import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Search from './Search'
import Results from './Results'
import { NextUIProvider } from '@nextui-org/system';
import Vision from './Vision'
// import './App.css'

function App() {

  return (
    <>
      <NextUIProvider>
        <Search/>
        <Vision/>
      </NextUIProvider>
     
    </>
  )
}

export default App
