import Router from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="w-full h-full py-10">
      <Router />
      <ToastContainer />
    </div>
  )
}

export default App
