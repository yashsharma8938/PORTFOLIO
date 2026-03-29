import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

const SvgIcon = ({ d, viewBox = '0 0 24 24' }: { d: string; viewBox?: string }) => (
  <svg width="18" height="18" viewBox={viewBox} fill="currentColor" className="text-accent-blue">
    <path d={d} />
  </svg>
)

const contactInfo = [
  { icon: <SvgIcon d="M2 4a2 2 0 012-2h16a2 2 0 012 2v1.5l-10 6.5L2 5.5V4zm0 3.5V20a2 2 0 002 2h16a2 2 0 002-2V7.5l-10 6.5L2 7.5z" />, label: 'Email', value: 'yashsharma.kah@gmail.com', href: 'mailto:yashsharma.kah@gmail.com' },
  { icon: <SvgIcon d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />, label: 'Location', value: 'India', href: '#' },
  { icon: <SvgIcon d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-7 4a4 4 0 00-4 4v.5h2V11a2 2 0 114 0v1h-1.5v2H17v-2h-1V11a4 4 0 00-4-4zM8 14v4h2v-4H8zm3 0v4h2v-4h-2zm3 0v4h2v-4h-2z" />, label: 'LinkedIn', value: 'linkedin.com/in/your-profile', href: 'https://linkedin.com/in/your-profile' },
  { icon: <SvgIcon d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />, label: 'GitHub', value: 'github.com/your-username', href: 'https://github.com/your-username' },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(79,142,247,0.08) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-4">
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #4F8EF7, transparent)' }} />
          <span className="text-xs tracking-[0.3em] uppercase text-accent-blue font-semibold">Let's Talk</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-4">
          <span className="text-white">Get In </span>
          <span className="gradient-text">Touch</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-white/40 mb-16 max-w-md">
          Have a project in mind or just want to chat? I'm always open to discussing new opportunities.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 glass rounded-xl p-4 group hover:bg-white/[0.07] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)' }}>
                  {info.icon}
                </div>
                <div>
                  <p className="text-white/30 text-xs font-medium mb-0.5">{info.label}</p>
                  <p className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">{info.value}</p>
                </div>
                <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            ))}

            {/* Availability badge */}
            <div className="glass rounded-xl p-4 mt-4" style={{ border: '1px solid rgba(16,185,129,0.2)' }}>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <p className="text-emerald-400 text-sm font-semibold">Currently Available</p>
                  <p className="text-white/30 text-xs mt-0.5">Response time: within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass-strong rounded-2xl p-8" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="mb-4 flex justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/40 text-sm">I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name + Email row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-white/40 font-medium mb-1.5 block">Name</label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent-blue/50 transition-colors"
                        style={{ borderColor: errors.name ? '#ef4444' : 'rgba(255,255,255,0.08)' }}
                        placeholder="Alex Johnson"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-white/40 font-medium mb-1.5 block">Email</label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                        })}
                        className="w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent-blue/50 transition-colors"
                        style={{ borderColor: errors.email ? '#ef4444' : 'rgba(255,255,255,0.08)' }}
                        placeholder="alex@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="text-xs text-white/40 font-medium mb-1.5 block">Subject</label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent-blue/50 transition-colors"
                      style={{ borderColor: errors.subject ? '#ef4444' : 'rgba(255,255,255,0.08)' }}
                      placeholder="Project collaboration"
                    />
                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs text-white/40 font-medium mb-1.5 block">Message</label>
                    <textarea
                      {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Min 20 characters' } })}
                      rows={4}
                      className="w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent-blue/50 transition-colors resize-none"
                      style={{ borderColor: errors.message ? '#ef4444' : 'rgba(255,255,255,0.08)' }}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #4F8EF7, #8B5CF6)', boxShadow: '0 0 20px rgba(79,142,247,0.4)' }}
                  >
                    {loading ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                        Sending...
                      </>
                    ) : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
