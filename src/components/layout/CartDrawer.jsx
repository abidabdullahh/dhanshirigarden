import { useState } from 'react'
import {
  FileText,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from 'lucide-react'
import { useCart } from '../../lib/CartContext'
import { useAuth } from '../../lib/AuthContext'
import { useLocale } from '../../lib/locale'

export default function CartDrawer() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const { user } = useAuth()
  const {
    items,
    totalItems,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkoutViaWhatsApp,
    downloadPdfOrder,
  } = useCart()

  const [customerName, setCustomerName] = useState(user?.name || '')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')

  if (!isCartOpen) return null

  const handleCheckout = () => {
    checkoutViaWhatsApp({
      name: customerName || user?.name || '',
      phone: customerPhone || '',
      address: customerAddress || '',
      email: user?.email || '',
    })
  }

  const handleDownloadPdf = () => {
    downloadPdfOrder({
      name: customerName || user?.name || 'Customer',
      phone: customerPhone || '',
      address: customerAddress || '',
      email: user?.email || '',
    })
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-forest/10">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-forest/10 bg-cream/70">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-xl bg-emerald/15 text-emerald flex items-center justify-center">
                <ShoppingBag className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-forest">
                  {isBn ? 'আপনার প্ল্যান্ট ব্যাগ' : 'Your Plant Cart'}
                </h3>
                <span className="text-xs text-charcoal/70">
                  {totalItems} {isBn ? 'টি গাছ নির্বাচিত' : 'items selected'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[0.7rem] text-forest/60 hover:text-alert font-medium transition px-2 py-1"
                >
                  {isBn ? 'খালি করুন' : 'Clear'}
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="size-8 rounded-full hover:bg-forest/10 flex items-center justify-center text-forest transition"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-forest/10">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="size-16 rounded-full bg-forest/5 flex items-center justify-center text-forest/40 mb-3">
                  <ShoppingBag className="size-8" />
                </div>
                <p className="font-display text-base font-bold text-forest">
                  {isBn ? 'আপনার প্ল্যান্ট ব্যাগ খালি' : 'Your plant bag is empty'}
                </p>
                <p className="text-xs text-charcoal/70 max-w-xs mt-1">
                  {isBn
                    ? 'স্টোরে গিয়ে দেশি ফলদ, ইনডোর বা সুগন্ধি ফুল নির্বাচন করে ব্যাগে যুক্ত করুন।'
                    : 'Explore our curated horticulture store to add acclimatized plants.'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 rounded-xl bg-forest px-5 py-2.5 text-xs font-bold text-white transition hover:bg-emerald"
                >
                  {isBn ? 'গাছের তালিকা দেখুন' : 'Browse Plants'}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.cartItemId} className="py-4 first:pt-0 last:pb-0 flex gap-3.5">
                  <img
                    src={item.photo}
                    alt={item.name[lang] || item.name.en}
                    className="size-18 rounded-xl object-cover border border-forest/10 shrink-0 bg-cream"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-bold text-forest truncate">
                      {item.name[lang] || item.name.en}
                    </h4>
                    <span className="inline-block mt-0.5 rounded-md bg-forest/5 px-2 py-0.5 text-[0.7rem] font-semibold text-emerald">
                      {item.selectedSize?.label || item.selectedSize?.name}
                    </span>
                    <div className="mt-2 flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 border border-forest/15 rounded-lg p-0.5 bg-cream/50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="size-6 rounded flex items-center justify-center hover:bg-forest/10 text-forest transition"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="font-mono text-xs font-bold px-1 text-forest">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="size-6 rounded flex items-center justify-center hover:bg-forest/10 text-forest transition"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-xs font-bold text-forest">
                          ৳{(item.price * item.quantity).toLocaleString('en-US')}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="block text-[0.68rem] text-rose-600 hover:underline mt-0.5 ml-auto"
                        >
                          {isBn ? 'মুছুন' : 'Remove'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-forest/10 bg-cream/40 space-y-4">
              {/* Optional Quick Customer Info */}
              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  placeholder={isBn ? 'আপনার নাম (Customer Name)' : 'Your Name'}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs text-forest focus:outline-emerald"
                />
                <input
                  type="text"
                  placeholder={isBn ? 'মোবাইল নম্বর (Phone)' : 'Mobile Phone'}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs text-forest focus:outline-emerald"
                />
                <input
                  type="text"
                  placeholder={isBn ? 'ডেলিভারির ঠিকানা (যেমন: গুলশান ২, ঢাকা)' : 'Delivery Address (e.g. Gulshan 2, Dhaka)'}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs text-forest focus:outline-emerald"
                />
              </div>

              {/* Subtotal Calculation */}
              <div className="flex items-center justify-between pt-2 border-t border-forest/10">
                <span className="text-xs font-semibold text-charcoal/80">
                  {isBn ? 'গাছের সর্বমোট মূল্য:' : 'Subtotal:'}
                </span>
                <span className="font-mono text-lg font-extrabold text-forest">
                  ৳{subtotal.toLocaleString('en-US')}
                </span>
              </div>

              {/* Action Buttons: WhatsApp Order + PDF Download */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-forest/20 bg-white py-3 px-3 text-xs font-bold text-forest hover:bg-forest/5 transition shadow-sm"
                >
                  <FileText className="size-4 text-emerald" />
                  <span>{isBn ? 'PDF তালিকা' : 'Download PDF'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-3 px-3 text-xs font-bold text-white hover:bg-[#20ba59] transition shadow-md"
                >
                  <MessageCircle className="size-4" />
                  <span>{isBn ? 'হোয়াটসঅ্যাপ অর্ডার' : 'Order WhatsApp'}</span>
                </button>
              </div>

              <p className="text-[0.68rem] text-center text-charcoal/60">
                {isBn
                  ? '✓ হোয়াটসঅ্যাপে অর্ডার পাঠালে আমাদের এক্সপার্ট টিম দ্রুত কনফার্ম করবে।'
                  : '✓ Direct WhatsApp dispatch ensures swift personal fulfillment.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
