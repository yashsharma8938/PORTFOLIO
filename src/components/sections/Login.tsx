import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'

type AuthData = { email: string; password: string; name?: string }

export function Login() {
  const [tab, setTab] = useState<'in' | 'up'>('in')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthData>()
  const [success, setSuccess] = useState(false)

  const onSubmit = async () => {
    await new Promise(r => setTimeout(r, 1000))
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
    reset()
  }

  return (
    <section id="login" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.07) 0%, transparent 65%)' }} />

      <div className="max-w-md mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black mb-2">
              <span className="text-white">Welcome </span>
              <span className="gradient-text">Back</span>
            </h2>
            <p className="text-white/30 text-sm">Sign in to access your portfolio dashboard</p>
          </div>

          <div className="glass-strong rounded-3xl p-8" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Tabs */}
            <div className="flex rounded-xl glass p-1 mb-8">
              {(['in', 'up'] as const).map((t) => (
                <button key={t} onClick={() => { setTab(t); reset() }}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                  style={{
                    background: tab === t ? 'linear-gradient(135deg, #4F8EF7, #8B5CF6)' : 'transparent',
                    color: tab === t ? '#fff' : 'rgba(255,255,255,0.4)',
                  }}>
                  {t === 'in' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} className="text-center py-8">
                  <div className="mb-4 flex justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-accent-blue">
                      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
                      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-lg mb-1">{tab === 'in' ? 'Signed in!' : 'Account created!'}</p>
                  <p className="text-white/40 text-sm">Redirecting to dashboard...</p>
                </motion.div>
              ) : (
                <motion.form key={tab} initial={{ opacity: 0, x: tab === 'in' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {tab === 'up' && (
                    <div>
                      <label className="text-xs text-white/40 font-medium mb-1.5 block">Full Name</label>
                      <input {...register('name', { required: 'Name is required' })}
                        className="w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                        style={{ borderColor: errors.name ? '#ef4444' : 'rgba(255,255,255,0.08)' }}
                        placeholder="Alex Johnson" />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                  )}
                  <div>
                    <label className="text-xs text-white/40 font-medium mb-1.5 block">Email</label>
                    <input {...register('email', {
                      required: 'Email required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                    })}
                      className="w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                      style={{ borderColor: errors.email ? '#ef4444' : 'rgba(255,255,255,0.08)' }}
                      placeholder="you@example.com" type="email" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="text-xs text-white/40 font-medium">Password</label>
                      {tab === 'in' && <button type="button" className="text-xs text-accent-blue hover:text-white transition-colors">Forgot?</button>}
                    </div>
                    <input {...register('password', {
                      required: 'Password required',
                      minLength: { value: 6, message: 'Min 6 characters' },
                    })}
                      className="w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                      style={{ borderColor: errors.password ? '#ef4444' : 'rgba(255,255,255,0.08)' }}
                      placeholder="••••••••" type="password" />
                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                  </div>

                  <button type="submit"
                    className="w-full py-3 rounded-xl font-bold text-sm mt-2 transition-all hover:scale-[1.02] hover:shadow-2xl"
                    style={{ background: 'linear-gradient(135deg, #4F8EF7, #8B5CF6)', boxShadow: '0 0 20px rgba(79,142,247,0.4)' }}>
                    {tab === 'in' ? 'Sign In →' : 'Create Account →'}
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-white/[0.06]" />
                    <span className="text-xs text-white/25">or continue with</span>
                    <div className="flex-1 h-px bg-white/[0.06]" />
                  </div>

                  {/* OAuth buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    {['Google', 'GitHub'].map((provider) => (
                      <button key={provider} type="button"
                        className="py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white glass hover:bg-white/[0.08] transition-all">
                        <span className="inline-flex items-center gap-1.5">
                          {provider === 'Google' ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white/60"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white/60"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
                          )}
                          {provider}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
