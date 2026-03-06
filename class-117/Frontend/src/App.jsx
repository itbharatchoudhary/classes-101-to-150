import { RouterProvider } from 'react-router'
import { router } from './routes/App.routes'
import './Features/Shared/styles/Global.scss'
import { AuthProvider } from './Features/Auth/Context/Auth.context'

const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App
