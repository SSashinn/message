import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AddFriend from './components/AddFriend';
import Error from './pages/Error';
import All from './components/All';
import Online from './components/Online';
import Pending from './components/Pending';
import Blocked from './components/Blocked';

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