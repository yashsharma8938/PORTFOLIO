import { motion } from 'framer-motion'

const links = {
  sections: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
  social: [
    { label: 'GitHub', href: '#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg> },
    { label: 'LinkedIn', href: '#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.5 18V10h-2v8h2zM7.5 8.8a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM18 18v-4.4c0-2.1-1.1-3.1-2.6-3.1-1.2 0-1.7.7-2 1.1V10h-2v8h2v-4.5c0-.2 0-.4.1-.6.2-.4.6-.9 1.3-.9 1 0 1.3.7 1.3 1.7V18h2z"/></svg> },
    { label: 'Twitter', href: '#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { label: 'Dribbble', href: '#', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.6 5.5c1.07 1.3 1.74 2.94 1.8 4.73-1.62-.33-3.58-.5-5.1-.4.1-.27.2-.53.28-.8l.1-.27c1.16-.43 2.22-1.12 2.92-3.26zm-1.2-1.2c-.6 1.8-1.5 2.4-2.5 2.76-.7-1.27-1.5-2.44-2.38-3.48A8.04 8.04 0 0117.4 6.3zM10.5 4.2c.9 1 1.7 2.15 2.42 3.42-2.1.56-4.6.83-7.28.83A8.07 8.07 0 0110.5 4.2zM4 12c0-.13 0-.26.01-.39 3.2.04 5.97-.3 8.33-.94.13.25.25.49.36.74l-.2.06c-2.7.87-4.79 3-5.73 5.68A7.96 7.96 0 014 12zm4.37 6.49c.78-2.4 2.62-4.3 5-5.1-.63 1.7-1.1 3.5-1.37 5.4a7.93 7.93 0 01-3.63-.3zm5.53.71c.25-1.76.68-3.42 1.24-4.98 1.36-.07 3.1.07 4.5.36a8.03 8.03 0 01-5.74 4.62z"/></svg> },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(79,142,247,0.05) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-black gradient-text mb-4">&lt;Portfolio /&gt;</div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Building premium digital experiences at the intersection of design, engineering, and AI.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {links.social.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-base hover:bg-white/10 transition-colors"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {links.sections.map((l) => (
                <li key={l.href}>
                  <a href={l.href}
                    className="text-sm text-white/40 hover:text-white transition-colors font-medium"
                    onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }) }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-4">Status</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-white/50">Available for hire</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-blue" />
                <span className="text-sm text-white/50">Open to remote</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-purple" />
                <span className="text-sm text-white/50">Est. response: 24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-white/25 text-xs flex items-center gap-1">
            © 2025 Portfolio. Crafted with React, Three.js &
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" className="inline-block"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Use'].map(label => (
              <a key={label} href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
