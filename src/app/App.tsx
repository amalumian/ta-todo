import Lists from '../features/lists/Lists'
import TodosList from '../features/todos/TodosList'

function App() {
  return (
    <>
      <header className='mb-4 text-center'>
        <h1 className='text-3xl'>TODO</h1>
      </header>

      <main className='flex flex-grow max-sm:flex-col'>
        <aside className='flex min-w-48 flex-col rounded-l-xl bg-orange-200 p-4 max-sm:rounded-t-xl max-sm:rounded-bl-none'>
          <Lists />
        </aside>

        <section className='flex-grow rounded-r-xl bg-orange-100 p-4 max-sm:rounded-b-xl max-sm:rounded-tr-none'>
          <TodosList />
        </section>
      </main>

      <footer className='mt-4 text-center'>
        <a
          className='text-orange-500 hover:text-orange-950'
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
