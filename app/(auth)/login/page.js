'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiBriefcase } from 'react-icons/fi'
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

  // Admin Demo Login Function
  const loginAsAdmin = () => {
    setValue('email', 'admin@gmail.com')
    setValue('password', 'admin01')
    toast('Logging in as Admin...', { icon: '🛡️' })
    // Auto-submit after values are set
    setTimeout(() => handleSubmit(onSubmit)(), 500)
  }

  // Manager Demo Login Function
  const loginAsManager = () => {
    setValue('email', 'manager@gmail.com')
    setValue('password', 'manager01')
    toast('Logging in as Manager...', { icon: '💼' })
    // Auto-submit after values are set
    setTimeout(() => handleSubmit(onSubmit)(), 500)
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

          <div className="space-y-4 pt-2">
            {/* Main Login Button */}
            <Button type="submit" loading={loading} fullWidth>
              Login
            </Button>

            {/* Demo Button Group */}
            <div className="flex flex-col gap-3">
              <p className="text-xs text-gray-400 text-center font-medium uppercase tracking-wider">Try Demo Login</p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="secondary" 
                  onClick={loginAsAdmin} 
                  type="button"
                  className="bg-blue-50 border-blue-100 text-blue-700 hover:bg-blue-100 py-2 text-xs flex items-center justify-center"
                >
                  <FiShield className="mr-1" /> Admin
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={loginAsManager} 
                  type="button"
                  className="bg-purple-50 border-purple-100 text-purple-700 hover:bg-purple-100 py-2 text-xs flex items-center justify-center"
                >
                  <FiBriefcase className="mr-1" /> Manager
                </Button>
              </div>
            </div>
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