import { useState } from 'react'
import './App.css'
import Header from './Components/Common/Header/Header'
import Main, { IProduct } from './Components/Common/Main/Main'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataContext } from './Components/Context/DataContext'



function App() {
  const [data, setData] = useState<IProduct[]>([])

  console.log(data)

  return (
    <>

      <Router>
        <DataContext.Provider value={{ data, setData }}>

        <Header />
        <Main />
        </DataContext.Provider>
      </Router>


    </>
  )
}

export default App
