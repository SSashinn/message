import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AddFriend from './components/AddFriend';
import Error from './pages/Error';

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

        }
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