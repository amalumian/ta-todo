import Form from '../features/form/Form'
import TodosList from '../features/todos/TodosList'

import todoLogo from '../assets/todo.svg'

function App() {
  return (
    <>
      <div className='flex'>
        <h1 className='text-3xl'>
          <img className='inline size-12' src={todoLogo} alt='TODO logo' /> TODO
        </h1>
      </div>
      <Form />
      <TodosList />
    </>
  )
}

export default App
