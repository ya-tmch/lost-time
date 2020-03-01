import React, {useState} from 'react'
import {CURRENCIES, CURRENCY_RUB} from '../../constants'

export default ({onAddItem}) => {

  const [form, setForm] = useState({
    name: '',
    quantity: 1,
    currency: CURRENCY_RUB,
    price: 1,
  })

  console.log(form)

  const onSubmit = (e) => {
    e.preventDefault()
    onAddItem({...form})
  }

  const changeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          <div>Название</div>
          <input type="text" name="name" value={form.name} onChange={changeForm}/>
        </label>
      </div>
      <br/>
      <div>
        <label>
          <div>Количество</div>
          <input type="number" name="quantity" value={form.quantity} onChange={changeForm}/>
        </label>
      </div>
      <br/>
      <div>
        <label>
          <div>Валюта</div>
          <select name="currency" value={form.currency} onChange={changeForm}>
            {CURRENCIES.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <br/>
      <div>
        <label>
          <div>Цена</div>
          <input type="text" name="price" value={form.price} onChange={changeForm}/>
        </label>
      </div>
      <br/>
      <div>
        <button type="submit">Добавить</button>
      </div>
    </form>
  )
}