import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import style from './App.module.css';
import Protected from './components/Protected/Protected';
import Error from './pages/Error/Error';
import Login from './pages/Login/Login';
import { useSelector } from 'react-redux';
import Signup from './pages/Signup/Signup';
import Crypto from './pages/Crypto/Crypto';
import Blog from './pages/Blog/Blog';
import SubmitBLog from './pages/SubmitBlog/SubmitBLog';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import UpdateBlog from './pages/UpdateBlog/UpdateBlog';
import useAutoLogin from './hooks/useAutoLogin';
import Loader from './components/Loader/Loader';
import UserInfo from './pages/UserInfo/UserInfo';
import ChangePassword from './pages/ChangePassword/ChangePassword';

function App() {
  const isAuth = useSelector(state => state.user.auth);

  const loading = useAutoLogin();

  return(
    <div className={style.container}>
      <BrowserRouter>
      <div className={style.layout}>
        <Navbar/>
        {loading ?
          <Loader />
        :
        <Routes>
          <Route
            path='/'
            exact 
            element={<div className={style.main}><Home/></div>}
          />

          <Route
            path='crypto'
            exact
            element={<div className={style.main}><Crypto/></div>} 
          />

          <Route
            path='blogs'
            exact
            element={
              <Protected isAuth={isAuth}>
                <div className={style.main}><Blog /></div>
              </Protected>
            } 
          />

          <Route
            path='blog/:id'
            exact
            element={
              <Protected isAuth={isAuth}>
                <div className={style.main}><BlogDetails /></div>
              </Protected>
            } 
          />

          <Route
            path='blog-update/:id'
            exact
            element={
              <Protected isAuth={isAuth}>
                <div className={style.main}><UpdateBlog /></div>
              </Protected>
            } 
          />

          <Route
            path='create'
            exact
            element={
              <Protected isAuth={isAuth}>
                <div className={style.main}><SubmitBLog /></div>
              </Protected>
            }
          />

          <Route
            path='login'
            exact
            element={<div className={style.main}><Login/></div>} 
          />

          <Route
            path='signup'
            exact
            element={<div className={style.main}><Signup /></div>} 
          />

          <Route
            path='user-info'
            exact
            element={<Protected isAuth={isAuth}><div className={style.main}><UserInfo /></div></Protected>} 
          />

          <Route
            path='reset-password'
            exact
            element={<Protected isAuth={isAuth}><div className={style.main}><ChangePassword /></div></Protected>} 
          />

          <Route
            path='*'
            element={<Error errmessage="Error 404 - Page not found"/>}
          />
        </Routes>
        }
        <Footer/>
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App;