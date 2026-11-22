import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Dhanshiri Garden ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5] p-6 text-center font-sans">
          <div className="max-w-md p-8 bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200 shadow-xl">
            <h2 className="text-xl font-bold text-[#1b4332] mb-3">ধানসিঁড়ি গার্ডেন | Dhanshiri Garden</h2>
            <p className="text-sm text-stone-600 mb-6">
              পৃষ্ঠাটি লোড হতে কিছুটা বিঘ্ন ঘটেছে। দয়া করে পুনরায় রিলোড করুন।
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full bg-[#1b4332] text-white text-sm font-bold shadow-md hover:bg-[#2d6a4f] transition"
            >
              রিলোড করুন (Reload Page)
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
