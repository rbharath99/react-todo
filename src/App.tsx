import { useDispatch } from 'react-redux'
import './App.css'
import Done from './components/Done'
import InProgress from './components/InProgress'
import Open from './components/Open'
import { useEffect } from 'react'
import { getTodos } from './feature/TodoSlice'
import { AppDispatch } from '../app/Store'


function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])
  return (
    <>
      <div className='todo-board'>
        <Open />
        <InProgress />
        <Done />
      </div>
    </>
  )
}

export default App
