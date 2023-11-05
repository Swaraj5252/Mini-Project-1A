import {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "./index.css"
import { useThemeContext } from './Context/themeContext';
import {useLoginContext} from "./Context/loginContext"
// importing all components and pages here
import Loading from './Components/Loading';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Account from './Pages/Account';
import ErrorFile from './Pages/ErrorFile';
import Write from './Pages/Write';
import Blogs from './Pages/Blogs';
import SinglePost from './Pages/SinglePost';
import SingleAuthor from './Pages/SingleAuthor';


function App() {
  const {darkMode} = useThemeContext()
  const {user} = useLoginContext()
  const [spinner, setSpinner] = useState(true)
  useEffect(() => {
      setTimeout(() => setSpinner(false), 400)
    }, [])
  if (spinner) {
      return <Loading/>
    }
  return (
    !spinner &&
    <>
    {/* <h1 className="text-3xl text-gray-800"> Swaraj Gadre here <br/> Hello Everyone how are you </h1> */}
    <Navbar/>
    <div className='top-16 relative' >
    <Router>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/login" element={user ? <ErrorFile/> : <Login/>} />
      <Route path="/register" element={user ? <ErrorFile/> : <Register/>} />
      <Route path="/account" element={user ? <Account user={user} /> : <ErrorFile/> } />
      <Route path='/write' element={user ? <Write/> : <ErrorFile/> }/>
      <Route path='/blogs' element={<Blogs/>} />
      <Route path='/singlePost/:id' element={<SinglePost />} />
      <Route path='/author/:id' element={<SingleAuthor/>}/>
      </Routes>
    </Router>
    </div>
    </>
  );
}

export default App;
