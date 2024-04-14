import { useState } from 'react'
import './App.css'
import Header from './Components/Common/Header/Header'
import Main, { IProduct } from './Components/Common/Main/Main'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataContext } from './Components/Context/DataContext'
import Footer from './Components/Common/Footer/Footer'
import ScrollUp from './Components/UI/ScrollUp/ScrollUp'

function App() {
  const [data, setData] = useState<IProduct[]>([])



  return (
    <>

      <Router>
        <DataContext.Provider value={{ data, setData }}>
          <Header />
          <Main />
          <Footer />
        </DataContext.Provider>
      </Router>
      <ScrollUp />

    </>
  )
}

export default App
