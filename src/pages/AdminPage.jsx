import { useState } from 'react'
import {
  FileSpreadsheet,
  Search,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Users,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Container } from '../components/ui/Section'
import { useAuth } from '../lib/AuthContext'
import { useLocale } from '../lib/locale'
import { useRouter } from '../lib/router'

export default function AdminPage() {
  const { lang } = useLocale()
  const isBn = lang === 'bn'
  const { user } = useAuth()
  const { navigate } = useRouter()

  const [usersList, setUsersList] = useState(() => {
    try {
      const rawUsers = localStorage.getItem('dg_users_database')
      return rawUsers ? JSON.parse(rawUsers) : []
    } catch {
      return []
    }
  })
  const [ordersList, setOrdersList] = useState(() => {
    try {
      const rawOrders = localStorage.getItem('dg_orders_database')
      return rawOrders ? JSON.parse(rawOrders) : []
    } catch {
      return []
    }
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('orders') // 'orders' | 'users'

  // Load registered users and orders from localStorage
  const loadData = () => {
    try {
      const rawUsers = localStorage.getItem('dg_users_database')
      setUsersList(rawUsers ? JSON.parse(rawUsers) : [])

      const rawOrders = localStorage.getItem('dg_orders_database')
      setOrdersList(rawOrders ? JSON.parse(rawOrders) : [])
    } catch {}
  }

  // Export Orders as CSV
  const exportOrdersCSV = () => {
    if (ordersList.length === 0) {
      alert('No orders to export.')
      return
    }
    const headers = ['Order ID', 'Date', 'Customer Name', 'Customer Contact', 'Items Summary', 'Total (BDT)', 'Status']
    const rows = ordersList.map((ord) => [
      ord.orderId,
      new Date(ord.createdAt).toLocaleString(),
      `"${ord.customer?.name || 'N/A'}"`,
      `"${ord.customer?.phone || ord.customer?.email || 'WhatsApp'}"`,
      `"${ord.items?.map((it) => `${it.name?.bn || it.name?.en} (${it.selectedSize?.label || it.selectedSize?.name || ''}) x${it.quantity}`).join('; ')}"`,
      ord.subtotal,
      ord.status || 'Dispatched',
    ])

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `dhanshiri_orders_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Export Users as CSV
  const exportUsersCSV = () => {
    if (usersList.length === 0) {
      alert('No users registered yet.')
      return
    }
    const headers = ['ID', 'Name', 'Email', 'Registered At', 'Last Active', 'Login Count', 'Browser/Agent']
    const rows = usersList.map((u) => [
      u.id,
      `"${u.name}"`,
      `"${u.email}"`,
      new Date(u.registeredAt || u.signedInAt || Date.now()).toLocaleString(),
      new Date(u.lastActive || Date.now()).toLocaleString(),
      u.loginCount || 1,
      `"${(u.userAgent || '').replace(/"/g, '""')}"`,
    ])

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `dhanshiri_google_users_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Clear demo data
  const handleClearData = () => {
    if (confirm('Are you sure you want to clear test order and customer logs?')) {
      localStorage.removeItem('dg_orders_database')
      localStorage.removeItem('dg_users_database')
      loadData()
    }
  }

  const filteredOrders = ordersList.filter((o) => {
    const q = searchTerm.toLowerCase()
    return (
      o.orderId.toLowerCase().includes(q) ||
      (o.customer?.name || '').toLowerCase().includes(q) ||
      (o.customer?.phone || '').toLowerCase().includes(q)
    )
  })

  const filteredUsers = usersList.filter((u) => {
    const q = searchTerm.toLowerCase()
    return (
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <Container>
          {/* Top Bar & Breadcrumb */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-forest/70 hover:text-emerald transition mb-2"
              >
                <ArrowLeft className="size-3.5" />
                <span>{isBn ? 'ওয়েবসাইটে ফিরে যান' : 'Back to Website'}</span>
              </button>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-forest flex items-center gap-2.5">
                <ShieldCheck className="size-7 text-emerald" />
                <span>{isBn ? 'ধানসিঁড়ি অ্যাডমিন কাস্টমার ও অর্ডার ট্র্যাকার' : 'Customer & Order Tracking Console'}</span>
              </h1>
              <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                {isBn
                  ? 'গুগল দিয়ে লগইন করা গ্রাহক তথ্য এবং সমস্ত প্ল্যান্ট অর্ডারের পূর্ণাঙ্গ রিয়েলটাইম মনিটরিং ও এক্সপোর্ট পোর্টাল।'
                  : 'Real-time dashboard tracking verified Google users and itemized WhatsApp plant order requests.'}
              </p>
            </div>

            {/* Quick Export Actions */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={activeTab === 'orders' ? exportOrdersCSV : exportUsersCSV}
                className="inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald transition"
              >
                <FileSpreadsheet className="size-4" />
                <span>{isBn ? 'CSV এক্সপোর্ট করুন' : 'Export CSV'}</span>
              </button>
              <button
                type="button"
                onClick={handleClearData}
                title="Clear Test Logs"
                className="rounded-xl border border-rose-300 p-2.5 text-rose-600 hover:bg-rose-50 transition"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>

          {/* Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="rounded-2xl glass-panel p-4 border border-white/80">
              <span className="text-xs font-bold text-charcoal/70 uppercase tracking-wider block">
                {isBn ? 'মোট নিবন্ধিত গ্রাহক' : 'Total Google Users'}
              </span>
              <span className="font-mono text-2xl font-extrabold text-forest mt-1 block">
                {usersList.length}
              </span>
            </div>
            <div className="rounded-2xl glass-panel p-4 border border-white/80">
              <span className="text-xs font-bold text-charcoal/70 uppercase tracking-wider block">
                {isBn ? 'মোট প্ল্যান্ট অর্ডার' : 'Total Plant Orders'}
              </span>
              <span className="font-mono text-2xl font-extrabold text-emerald mt-1 block">
                {ordersList.length}
              </span>
            </div>
            <div className="rounded-2xl glass-panel p-4 border border-white/80">
              <span className="text-xs font-bold text-charcoal/70 uppercase tracking-wider block">
                {isBn ? 'অর্ডার ভলিউম (BDT)' : 'Order Value (BDT)'}
              </span>
              <span className="font-mono text-2xl font-extrabold text-forest mt-1 block">
                ৳{ordersList.reduce((acc, o) => acc + (o.subtotal || 0), 0).toLocaleString('en-US')}
              </span>
            </div>
            <div className="rounded-2xl glass-panel p-4 border border-white/80">
              <span className="text-xs font-bold text-charcoal/70 uppercase tracking-wider block">
                {isBn ? 'সক্রিয় অ্যাডমিন সেশন' : 'Current Admin'}
              </span>
              <span className="text-xs font-bold text-forest truncate mt-1.5 block">
                {user ? user.name : 'Owner Console'}
              </span>
            </div>
          </div>

          {/* Tab Selector & Search bar */}
          <div className="rounded-2xl glass-panel p-4 border border-white/80 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'orders' ? 'bg-forest text-white shadow-xs' : 'bg-forest/5 text-forest hover:bg-forest/10'
                }`}
              >
                <ShoppingBag className="size-4" />
                <span>{isBn ? 'গাছ ক্রয়ের অর্ডারসমূহ' : 'Plant Orders'} ({ordersList.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('users')}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'users' ? 'bg-forest text-white shadow-xs' : 'bg-forest/5 text-forest hover:bg-forest/10'
                }`}
              >
                <Users className="size-4" />
                <span>{isBn ? 'গুগল ইউজার ডেটা' : 'Google Users'} ({usersList.length})</span>
              </button>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 size-4 text-forest/40" />
              <input
                type="text"
                placeholder={isBn ? 'আইডি, নাম বা মোবাইল দিয়ে খুঁজুন...' : 'Search by ID, name or email...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-forest/15 bg-white/90 pl-9 pr-3 py-1.5 text-xs text-forest focus:outline-emerald"
              />
            </div>
          </div>

          {/* Table 1: Orders View */}
          {activeTab === 'orders' && (
            <div className="rounded-3xl glass-panel overflow-hidden border border-white/80 shadow-lift">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-forest/5 text-forest font-bold uppercase tracking-wider text-[0.68rem] border-b border-forest/10">
                    <tr>
                      <th className="py-3 px-4">রেফারেন্স / সময়</th>
                      <th className="py-3 px-4">গ্রাহকের নাম ও যোগাযোগ</th>
                      <th className="py-3 px-4">অর্ডারের আইটেম ও সাইজ</th>
                      <th className="py-3 px-4 text-right">মূল্য (BDT)</th>
                      <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-forest/10 text-charcoal/85">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-12 text-center text-charcoal/60">
                          {isBn ? 'কোনো অর্ডার রেকর্ড পাওয়া যায়নি।' : 'No orders recorded yet. Place a test order from the Store.'}
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.orderId} className="hover:bg-forest/5 transition">
                          <td className="py-3.5 px-4 font-mono">
                            <span className="font-bold text-forest">#{ord.orderId}</span>
                            <span className="block text-[0.65rem] text-charcoal/60 mt-0.5">
                              {new Date(ord.createdAt).toLocaleDateString()} {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-forest">{ord.customer?.name || 'Guest Customer'}</div>
                            <div className="text-[0.68rem] text-charcoal/60">{ord.customer?.phone || ord.customer?.email || 'Via WhatsApp Direct'}</div>
                          </td>
                          <td className="py-3.5 px-4 max-w-sm">
                            <div className="space-y-1">
                              {ord.items?.map((it, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 text-[0.72rem]">
                                  <span className="size-1.5 rounded-full bg-emerald" />
                                  <span className="font-semibold">{it.name?.bn || it.name?.en}</span>
                                  <span className="rounded bg-forest/5 px-1.5 py-0.2 text-[0.65rem] text-forest/75 font-mono">
                                    {it.selectedSize?.label || it.selectedSize?.name}
                                  </span>
                                  <span className="text-charcoal/60">x{it.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-forest text-sm">
                            ৳{ord.subtotal?.toLocaleString('en-US')}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald/15 px-2.5 py-0.5 text-[0.68rem] font-bold text-emerald">
                              <CheckCircle className="size-3" />
                              <span>{ord.status || 'Dispatched'}</span>
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Table 2: Google Users View */}
          {activeTab === 'users' && (
            <div className="rounded-3xl glass-panel overflow-hidden border border-white/80 shadow-lift">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-forest/5 text-forest font-bold uppercase tracking-wider text-[0.68rem] border-b border-forest/10">
                    <tr>
                      <th className="py-3 px-4">গ্রাহক প্রোফাইল</th>
                      <th className="py-3 px-4">ইমেইল ঠিকানা</th>
                      <th className="py-3 px-4">প্রথম রেজিস্ট্রেশন</th>
                      <th className="py-3 px-4">সর্বশেষ সক্রিয়</th>
                      <th className="py-3 px-4 text-center">লগইন কাউন্ট</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-forest/10 text-charcoal/85">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-12 text-center text-charcoal/60">
                          {isBn ? 'কোনো গুগল ইউজার রেকর্ড পাওয়া যায়নি।' : 'No users registered yet. Sign in with Google to test.'}
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u.id || u.email} className="hover:bg-forest/5 transition">
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <img
                              src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                              alt={u.name}
                              className="size-8 rounded-full object-cover border border-emerald"
                            />
                            <div>
                              <div className="font-bold text-forest">{u.name}</div>
                              <span className="text-[0.65rem] text-charcoal/50 font-mono">ID: {u.id}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-charcoal/80">{u.email}</td>
                          <td className="py-3.5 px-4 text-charcoal/70">
                            {u.registeredAt || u.signedInAt
                              ? new Date(u.registeredAt || u.signedInAt).toLocaleDateString()
                              : 'Registered'}
                          </td>
                          <td className="py-3.5 px-4 text-charcoal/70">
                            {u.lastActive
                              ? `${new Date(u.lastActive).toLocaleDateString()} ${new Date(u.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                              : 'Recently active'}
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono font-bold text-forest">
                            {u.loginCount || 1}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  )
}
