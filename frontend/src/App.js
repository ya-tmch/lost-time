import React, {useState} from 'react'
import CartItem from './components/cart-item'
import CartNewItemForm from './components/cart-new-item-form'
import CartCheckout from './components/cart-checkout'

function App() {
  const [items, setItems] = useState([])

  const addItem = (item) => {
    setItems([...items, item])
  }

  const deleteItem = (deleteItem) => {
    setItems(items.filter(item => item !== deleteItem))
  }

  return (
    <div style={{padding: '20px'}}>
      <header>Корзина</header>

      <CartNewItemForm onAddItem={addItem}/>
      <br/>

      {items.map((item, key) => (
        <CartItem
          key={key}
          item={item}
          onDelete={e => deleteItem(item)}
        />
      ))}
      <br/>

      {items.length && (
        <CartCheckout items={items}/>
      )}
    </div>
  )
}

export default App
