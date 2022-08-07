import { Minus, Plus, Trash } from 'phosphor-react'
import { Actions, ButtonCart, ItemCard } from './styles'
import { Product } from '../../../@types/product'
import { useCartContext } from '../../../context/Cart'
import { priceFormat } from '../../../util/priceFormat'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface ItemProps {
  product: Product
}
export function Item({ product }: ItemProps) {
  const { addProduct, removeProduct } = useCartContext()
  const [count, setCount] = useState(product.amount)
  const price = product.amount * product.price

  const handleIncrementProduct = (id: string) => {
    const amount = product.amount + 1
    setCount(amount)
    addProduct(id, amount)
  }

  const handleDecrementProduct = (id: string) => {
    if (product.amount <= 1 && count <= 1) return
    const amount = product.amount - 1
    setCount(amount)
    addProduct(id, amount)
  }

  const handleRemoveProduct = (id: string) => {
    const res = removeProduct(id)
    toast[res.type](res.msg, { position: 'top-right' })
  }

  return (
    <ItemCard>
      <img src={product.imageURL} alt="" />
      <div className="containerActions">
        <p>{product.name}</p>
        <Actions>
          <div>
            <button onClick={() => handleDecrementProduct(product.id)}>
              <Minus size={14} weight="bold" />
            </button>
            <span>{count}</span>
            <button onClick={() => handleIncrementProduct(product.id)}>
              <Plus size={14} weight="bold" />
            </button>
          </div>
          <ButtonCart onClick={() => handleRemoveProduct(product.id)}>
            <Trash size={16} />
            <span>REMOVER</span>
          </ButtonCart>
        </Actions>
      </div>
      <p className="total">{priceFormat(price)}</p>
    </ItemCard>
  )
}