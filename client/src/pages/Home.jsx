import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Home() {
  const {currentUser} = useSelector(state => state.user) // state.User is the name of userSlice
  return currentUser ? (
    <div className="home-container">
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  ) : <Navigate to={'/signin'}/>
}
