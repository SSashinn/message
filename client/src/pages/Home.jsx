import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Outlet} from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
