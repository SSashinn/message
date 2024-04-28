import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AddFriend from './pages/AddFriend';
import Error from './pages/Error';
import All from './pages/All';
import Online from './pages/Online';
import Pending from './pages/Pending';
import Blocked from './pages/Blocked';
import Dm from './pages/Dm';

export default function Route() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          path: '/addfriend',
          element: <AddFriend />,

        },
        {
          path: '/all',
          element: <All/>,

        },
        {
          path: '/online',
          element: <Online />,

        },
        {
          path: '/pending',
          element: <Pending />,

        },
        {
          path: '/blocked',
          element: <Blocked />,

        },
        {
          path: '/message/:dmObjectID',
          element: <Dm />,

        },

      ]
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/signin',
      element: <SignIn />,
    }
  ]);

  return <RouterProvider router={router} />
}