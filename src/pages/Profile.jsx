import { useState } from 'react'
import { Edit2, Save, Mail, Phone, MapPin, Building, Star, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import PageContainer from '@/components/layouts/PageContainer'
import Card, { CardTitle, CardDescription } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import ProgressRing from '@/components/ui/ProgressRing'
import { leaderboard, badges, challenges } from '@/data/gamificationData'

const user = leaderboard[0]
const userBadges = badges.slice(0, 5)
const activeChallenges = challenges.filter(c => c.status === 'Active').slice(0, 3)

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: 'Sarah Chen',
    title: 'ESG Manager',
    department: 'Operations',
    email: 'sarah.chen@ecosphere.com',
    phone: '+1 (555) 012-3456',
    location: 'San Francisco, CA',
    bio: 'Passionate ESG professional with 8+ years of experience driving sustainability initiatives across global operations. Certified in GRI Standards and ISO 14001.',
  })

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <PageContainer
      title="My Profile"
      description="Personal information and ESG performance"
      breadcrumbs={[{ label: 'Profile' }]}
      actions={
        editing
          ? <Button variant="primary" size="sm" onClick={() => setEditing(false)}><Save size={13} /> Save Changes</Button>
          : <Button variant="secondary" size="sm" onClick={() => setEditing(true)}><Edit2 size={13} /> Edit Profile</Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile Card */}
        <div className="space-y-4">
          <Card>
            <div className="flex flex-col items-center text-center">
              <Avatar initials="SC" size="xl" className="mb-3" />
              {editing ? (
                <input value={form.name} onChange={e => handleChange('name', e.target.value)}
                  className="input text-center font-bold text-base mb-1" />
              ) : (
                <h2 className="text-base font-bold text-slate-900">{form.name}</h2>
              )}
              <p className="text-sm text-slate-500">{form.title}</p>
              <Badge variant="green" className="mt-2">Level {user.level} · {user.xp.toLocaleString()} XP</Badge>
              <div className="w-full mt-4 space-y-2">
                {[
                  [Mail, 'email'],
                  [Phone, 'phone'],
                  [MapPin, 'location'],
                  [Building, 'department'],
                ].map(([Icon, key]) => (
                  <div key={key} className="flex items-center gap-2.5">
                    <Icon size={13} className="text-slate-500 flex-shrink-0" />
                    {editing ? (
                      <input value={form[key]} onChange={e => handleChange(key, e.target.value)}
                        className="input text-xs py-1" />
                    ) : (
                      <span className="text-xs text-slate-500 truncate">{form[key]}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* XP Progress */}
          <Card>
            <CardTitle className="mb-3">XP Progress</CardTitle>
            <div className="flex items-center gap-4">
              <ProgressRing value={Math.round((user.xp % 500) / 5)} size={72} strokeWidth={6} label="to next" />
              <div>
                <p className="text-lg font-bold text-slate-900">{user.xp.toLocaleString()} XP</p>
                <p className="text-xs text-slate-500">Level {user.level}</p>
                <p className="text-xs text-slate-500 mt-1">Next level: {(Math.ceil(user.xp / 500) * 500).toLocaleString()} XP</p>
              </div>
            </div>
          </Card>

          {/* Badges */}
          <Card>
            <CardTitle className="mb-3">Earned Badges</CardTitle>
            <div className="grid grid-cols-3 gap-2">
              {userBadges.map(b => (
                <div key={b.id} className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-lg">
                  <span className="text-2xl">{b.icon}</span>
                  <span className="text-[9px] text-slate-500 text-center leading-tight">{b.name}</span>
                </div>
              ))}
              <div className="flex flex-col items-center justify-center gap-1 p-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                <Award size={18} className="text-slate-400" />
                <span className="text-[9px] text-slate-500">+{badges.length - 5} more</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Bio */}
          <Card>
            <CardTitle className="mb-3">About Me</CardTitle>
            {editing ? (
              <textarea
                value={form.bio}
                onChange={e => handleChange('bio', e.target.value)}
                rows={4}
                className="input resize-none"
              />
            ) : (
              <p className="text-sm text-slate-500 leading-relaxed">{form.bio}</p>
            )}
          </Card>

          {/* ESG Stats */}
          <Card>
            <CardTitle className="mb-4">My ESG Performance</CardTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Rank', value: `#${user.rank}`, sub: 'Organization' },
                { label: 'Challenges', value: user.badges + 3, sub: 'Completed' },
                { label: 'Badges', value: user.badges, sub: 'Earned' },
                { label: 'XP Total', value: user.xp.toLocaleString(), sub: 'Points' },
              ].map(({ label, value, sub }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-slate-900">{value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  <p className="text-[10px] text-slate-400">{sub}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Challenges */}
          <Card>
            <CardTitle className="mb-3">Active Challenges</CardTitle>
            <div className="space-y-3">
              {activeChallenges.map(c => (
                <div key={c.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-slate-900 truncate">{c.title}</p>
                      <span className="text-xs font-bold text-amber-600 ml-2">+{c.xp} XP</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-1.5">
                      <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${c.progress}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">{c.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardTitle className="mb-3">Recent Achievements</CardTitle>
            <div className="space-y-2">
              {[
                { text: 'Completed "Diversity Ally Training" challenge', time: '2 hours ago', xp: 350 },
                { text: 'Acknowledged Data Privacy Policy v4.0', time: '1 day ago', xp: 50 },
                { text: 'Submitted August carbon transactions', time: '2 days ago', xp: 100 },
                { text: 'Earned "Policy Master" badge', time: '4 days ago', xp: 200 },
              ].map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <Star size={12} className="text-amber-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-900">{a.text}</p>
                      <p className="text-[10px] text-slate-500">{a.time}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green-600 flex-shrink-0">+{a.xp} XP</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
