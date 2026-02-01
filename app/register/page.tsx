"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        alert('کاربر ثبت شد!')
        router.push('/dashboard') // ریدایرکت مستقیم
      } else {
        alert('خطا در ثبت کاربر')
      }
    } catch {
      alert('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  const updateForm = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value })
  }

  return (
    <div className="mx-auto p-4 max-w-md">
      <h1 className="mb-4 font-bold text-xl">ثبت کاربر جدید</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="نام (اختیاری)"
          value={form.name}
          onChange={updateForm('name')}
          className="p-2 border rounded w-full"
        />
        <input
          type="email"
          placeholder="ایمیل"
          value={form.email}
          onChange={updateForm('email')}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={form.password}
          onChange={updateForm('password')}
          className="p-2 border rounded w-full"
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-500 disabled:opacity-50 p-2 rounded w-full text-white"
        >
          {loading ? 'در حال ثبت...' : 'ثبت'}
        </button>
      </form>
    </div>
  )
}