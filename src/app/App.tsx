import todoLogo from '../assets/todo.svg'
import Todos from '../features/todos/Todos'

function App() {
  return (
    <>
      <div className='flex'>
        <h1 className='text-3xl'>
          <img className='inline size-12' src={todoLogo} alt='TODO logo' /> TODO
        </h1>
      </div>
      <Todos />
    </>
  )
}

export default App
