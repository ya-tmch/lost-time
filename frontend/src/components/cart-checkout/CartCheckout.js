import React, {useState} from 'react'
import {checkout} from '../../api'

const initValue = {
  sums: null,
  errors: null
}

export default ({items}) => {
  const [state, setState] = useState(initValue)

  const onCheckout = async () => {
    setState(initValue) // TODO show progress

    try {
      setState({
        sums: await checkout(items), // TODO cancel prev
        errors: null
      })
    } catch (e) {
      setState({
        sums: null,
        errors: JSON.stringify(e) // TODO show error
      })
    }
  }

  return (
    <div>
      <button onClick={onCheckout}>Посчитать</button>

      {state.sums && Object.keys(state.sums).map(currency => (
        <div key={currency}>
          {currency} - {state.sums[currency]}
        </div>
      ))}

      {state.errors && (
        <div>{state.errors}</div>
      )}
    </div>
  )
}