import './App.css'
import Done from './components/Done'
import InProgress from './components/InProgress'
import Open from './components/open'

function App() {
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
