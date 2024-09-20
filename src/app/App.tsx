import TodosList from '../features/todos/TodosList'

import Lists from '../features/lists/Lists'

function App() {
  return (
    <>
      <header className='mb-4 text-center'>
        <h1 className='text-3xl'>TODO</h1>
      </header>
      <main className='flex flex-grow'>
        <aside className='flex flex-col min-w-48 rounded-l-xl bg-orange-200 p-4'>
          <Lists />
        </aside>
        <section className='flex-grow rounded-r-xl bg-orange-100 p-4'>
          <TodosList />
        </section>
      </main>
      <footer className='mt-4 text-center'>
        <a
          className='underline hover:to-gray-100'
          href='https://github.com/amalumian/ta-todo'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub
        </a>
      </footer>
    </>
  )
}

export default App
