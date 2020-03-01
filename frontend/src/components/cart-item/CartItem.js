import React from 'react'

export default ({item, onDelete}) => {
  return (
    <div>
      {item.name} /
      {item.quantity} /
      {item.currency} /
      {item.price} /
      <button onClick={onDelete}>Удалить</button>
    </div>
  )
}