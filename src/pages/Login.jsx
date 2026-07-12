import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Globe2, Eye, EyeOff, ArrowRight, Leaf, Shield, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  { icon: Leaf,       title: 'Environmental Tracking',  desc: 'Monitor Scope 1, 2 & 3 emissions in real time' },
  { icon: Shield,     title: 'Governance & Compliance', desc: 'Manage policies, audits and compliance issues' },
  { icon: BarChart3,  title: 'ESG Reporting',           desc: 'Generate GRI, SASB and TCFD-aligned reports' },
]

export default function Login() {
  const [email, setEmail] = useState('sarah.chen@ecosphere.com')
  const [password, setPassword] = useState('password123')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 900)
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden lg:flex flex-col w-[480px] bg-white border-r border-slate-200 p-10 justify-between flex-shrink-0"
      >
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
              <Globe2 size={18} className="text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900">EcoSphere</span>
              <p className="text-xs text-slate-500">ESG Management Platform</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Manage your ESG journey with confidence
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-10">
            A comprehensive platform for tracking environmental impact, social initiatives, and governance compliance — all in one place.
          </p>

          <div className="space-y-5">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={16} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center gap-4">
            {[
              { value: '78.4', label: 'ESG Score' },
              { value: '1,482', label: 'Employees' },
              { value: '−8.3%', label: 'Emissions YoY' },
            ].map(({ value, label }) => (
              <div key={label} className="flex-1 text-center">
                <p className="text-lg font-bold text-primary-600">{value}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right panel — Login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center">
              <Globe2 size={16} className="text-white" />
            </div>
            <span className="text-base font-bold text-slate-900">EcoSphere</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
          <p className="text-sm text-slate-500 mb-7">Sign in to your ESG dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-900 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-900">Password</label>
                <button type="button" className="text-xs text-primary-600 hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="input pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded accent-primary-600" defaultChecked />
              <label htmlFor="remember" className="text-xs text-slate-500">Remember me for 30 days</label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-2.5 rounded-lg"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign in <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-500 text-center mb-1 font-medium">Demo credentials</p>
            <p className="text-xs text-slate-500 text-center">sarah.chen@ecosphere.com / password123</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
