'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', data)
      login(res.data.data.token, res.data.data.user)
      toast.success(`Welcome back, ${res.data.data.user.name}!`)
      router.push('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = () => {
    setValue('email', 'demo@pickpack.com')
    setValue('password', 'demo1234')
    toast('Demo credentials filled!', { icon: '👤' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-green-600">pick</span>
            <span className="text-yellow-400">&</span>
            <span className="text-green-600">pack</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <Input
            label="Email"
            icon={FiMail}
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email', { required: 'Email is required' })}
          />

          {/* Password with show/hide */}
          <div className="relative">
            <Input
              label="Password"
              icon={FiLock}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', { required: 'Password is required' })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <Button type="submit" loading={loading} fullWidth>
              Login
            </Button>
            <Button variant="secondary" fullWidth onClick={fillDemo} type="button">
              Demo Login
            </Button>
          </div>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-green-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  )
}