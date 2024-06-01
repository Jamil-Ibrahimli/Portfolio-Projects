import { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Common/Header/Header'
import Main, { IProduct } from './Components/Common/Main/Main'
import { HashRouter as Router } from 'react-router-dom'
import { DataContext } from './Components/Context/DataContext'
import Footer from './Components/Common/Footer/Footer'
import ScrollUp from './Components/UI/ScrollUp/ScrollUp'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'

export interface Profile {

  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string


}

function App() {
  const [data, setData] = useState<IProduct[]>([])
  const [user, setUser] = useState<any>({})
  const storedProfile = localStorage.getItem('profile') || sessionStorage.getItem('profile');
  const dataProfile = storedProfile ? JSON.parse(storedProfile) : null;
  const [profile, setProfile] = useState<Profile | null>(dataProfile);
  const [loggedIn, setLoggedIn] = useState(false)
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => alert(`Login Failed:${error.error}`)

  })


  console.log('token',user.access_token)
  useEffect(() => {

    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {

          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {

          setProfile(res.data);
      

        })
        .catch((err) => console.log(err))

      
    }

  }, [user])



  const logOut = () => {
    googleLogout();
    setProfile(null)
    setLoggedIn(false)
    localStorage.removeItem('profile')
    localStorage.removeItem('checkbox')
  }

  return (
    <>

      <Router>
        <DataContext.Provider value={{ data, setData, profile, login,logOut,loggedIn,setLoggedIn }}>
          <Header picture={profile?.picture || ''} />
          <Main />
          <Footer userName={profile?.name || ''} userEmail={profile?.email || ''} login={login} />
        </DataContext.Provider>

      </Router>
      <ScrollUp />

    </>
  )
}

export default App
