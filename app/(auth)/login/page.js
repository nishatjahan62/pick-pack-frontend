'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiBriefcase, FiUser } from 'react-icons/fi'
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
  // User Demo Login Function
  const loginAsUser = () => {
    setValue('email', 'user@gmail.com')
    setValue('password', 'user01')
    toast('Logging in as User...', { icon: '👤' })
    setTimeout(() => handleSubmit(onSubmit)(), 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-700 px-4 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 transition-colors">

        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            <span className="text-green-600 dark:text-green-400">pick</span>
            <span className="text-yellow-400">&</span>
            <span className="text-green-600 dark:text-green-400">pack</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back!</p>
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
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
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
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center font-medium uppercase tracking-wider">Try Demo Login</p>
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="secondary" 
                  onClick={loginAsAdmin} 
                  type="button"
                  className="bg-blue-50 dark:bg-blue-950/60 border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 py-2 text-xs flex items-center justify-center transition-colors"
                >
                  <FiShield className="mr-1" /> Admin
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={loginAsManager} 
                  type="button"
                  className="bg-purple-50 dark:bg-purple-950/60 border-purple-100 dark:border-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 py-2 text-xs flex items-center justify-center transition-colors"
                >
                  <FiBriefcase className="mr-1" /> Manager
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={loginAsUser} 
                  type="button"
                  className="bg-emerald-50 dark:bg-emerald-950/60 border-emerald-100 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 py-2 text-xs flex items-center justify-center transition-colors"
                >
                  <FiUser className="mr-1" /> User
                </Button>
              </div>
            </div>
          </div>

        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-green-600 dark:text-green-400 font-medium hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  )
}