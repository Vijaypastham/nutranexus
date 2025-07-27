import { redirect } from 'next/navigation'

export default function OrderPage() {
  // Redirect to products page since OrderForm requires a product prop
  redirect('/products')
}
