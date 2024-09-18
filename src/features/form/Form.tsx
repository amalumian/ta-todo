import { useState } from 'react'

const Form = () => {
  const [text, setText] = useState('')

  const handleChangeText = (event) => {
    setText(event.target.value)
  }

  const handleSubmitText = (event) => {
    event.preventDefault()
    setText('')
  }

  return (
    <form onSubmit={handleSubmitText}>
      <input value={text} onChange={handleChangeText} />
    </form>
  )
}

export default Form
