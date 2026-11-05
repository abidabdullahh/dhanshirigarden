import { createContext, useContext, useEffect, useState } from 'react'
import { generateOrderPdf } from './pdfInvoice'
import { site } from '../data/site'

const CartContext = createContext(null)

const CART_STORAGE_KEY = 'dg_cart_items'
const ORDERS_STORAGE_KEY = 'dg_orders_database'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const addToCart = (plant, sizeObj, quantity = 1) => {
    const cartItemId = `${plant.id}__${sizeObj.id}`
    setItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId)
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          cartItemId,
          plantId: plant.id,
          name: plant.name,
          scientificName: plant.scientificName,
          selectedSize: sizeObj,
          price: sizeObj.price,
          quantity,
          photo: plant.photo,
        },
      ]
    })
    setIsCartOpen(true)
  }

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    )
  }

  const removeFromCart = (cartItemId) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId))
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Log order in local database so business owner can track customer orders
  const recordOrder = (orderData) => {
    try {
      const raw = localStorage.getItem(ORDERS_STORAGE_KEY)
      const list = raw ? JSON.parse(raw) : []
      list.unshift(orderData)
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(list))
    } catch (e) {
      console.error('Failed to log order:', e)
    }
  }

  // Format order for WhatsApp dispatch
  const checkoutViaWhatsApp = (customer = {}) => {
    if (items.length === 0) return

    const orderId = 'DG' + Math.floor(100000 + Math.random() * 900000)
    const dateStr = new Date().toLocaleString('en-GB')

    let msg = `🌿 *নতুন প্ল্যান্ট অর্ডার — ধানসিঁড়ি গার্ডেন*\n`
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`
    msg += `📋 *অর্ডার রেফারেন্স:* #${orderId}\n`
    msg += `📅 *তারিখ:* ${dateStr}\n`
    if (customer.name) msg += `👤 *গ্রাহকের নাম:* ${customer.name}\n`
    if (customer.phone) msg += `📞 *মোবাইল:* ${customer.phone}\n`
    if (customer.address) msg += `📍 *ডেলিভারি ঠিকানা:* ${customer.address}\n`
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`
    msg += `🌱 *গাছ ও সাইজের তালিকা:*\n\n`

    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name.bn}* (${item.name.en})\n`
      msg += `   • সাইজ: ${item.selectedSize?.label || item.selectedSize?.name || 'Standard'}\n`
      msg += `   • পরিমাণ: ${item.quantity} টি | দর: ৳${item.price} | মোট: ৳${item.price * item.quantity}\n\n`
    })

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`
    msg += `💰 *সর্বমোট প্রদেয় মূল্য:* ৳${subtotal.toLocaleString('en-US')}\n`
    msg += `🚛 *ডেলিভারি এরিয়া:* ঢাকা ও দেশজুড়ে হোম ডেলিভারি\n\n`
    msg += `অনুগ্রহ করে অর্ডারটি নিশ্চিত করুন ও ডেলিভারি সময় জানিয়ে দিন। ধন্যবাদ!`

    // Log the order to persistent store
    const orderRecord = {
      orderId,
      customer: customer.name ? customer : { name: 'Customer via WhatsApp' },
      items,
      subtotal,
      createdAt: new Date().toISOString(),
      status: 'WhatsApp Dispatched',
    }
    recordOrder(orderRecord)

    const whatsappPhone = site.whatsapp || '8801739203981'
    const targetUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(msg)}`
    window.open(targetUrl, '_blank')
  }

  // Generate & Download PDF Quotation
  const downloadPdfOrder = (customer = {}) => {
    if (items.length === 0) return
    const orderId = 'DG' + Math.floor(100000 + Math.random() * 900000)
    generateOrderPdf({
      orderId,
      items,
      subtotal,
      customer,
    })
  }

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        checkoutViaWhatsApp,
        downloadPdfOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
