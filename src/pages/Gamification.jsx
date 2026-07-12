import { useState } from 'react'
import { Zap, Trophy, Gift, Users, Crown, RefreshCw } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import PageContainer from '@/components/layouts/PageContainer'
import Card, { CardTitle, CardDescription } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import Modal from '@/components/ui/Modal'
import FilterBar from '@/components/ui/FilterBar'
import ProgressRing from '@/components/ui/ProgressRing'

import { useApi } from '@/hooks/useApi'
import { fetchChallenges, fetchBadges, fetchRewards, joinChallenge } from '@/services/api'

import {
  challenges as staticChallenges,
  badges as staticBadges,
  leaderboard,
  departmentRankings,
  rewards as staticRewards,
} from '@/data/gamificationData'
import { getRarityColor } from '@/utils/formatters'

const tabs = ['Challenges', 'Leaderboard', 'Badges', 'Rewards']
const difficultyColor = { Easy: 'green', Medium: 'yellow', Hard: 'red' }

function normaliseChallenges(items) {
  return items.map(c => ({
    id: c.challenge_id ?? c.id,
    title: c.title,
    category: c.category ?? 'General',
    xp: c.xp ?? 0,
    participants: c.participants ?? 0,
    status: c.status ?? 'Active',
    deadline: c.deadline,
    difficulty: c.difficulty ?? 'Medium',
    description: c.description ?? '',
    progress: c.progress ?? 0,
  }))
}

function normaliseBadges(items) {
  return items.map(b => ({
    id: b.badge_id ?? b.id,
    name: b.name,
    description: b.description ?? '',
    icon: b.icon ?? '⭐',
    rarity: b.rarity ?? 'Common',
    holders: b.holders ?? 0,
    unlock_rule: b.unlock_rule,
  }))
}

function normaliseRewards(items) {
  return items.map(r => ({
    id: r.reward_id ?? r.id,
    title: r.name ?? r.title,
    description: r.description ?? '',
    cost: r.points_required ?? r.cost ?? 0,
    category: r.category ?? 'General',
    available: r.status === 'Available' || r.available !== false,
    redeemed: r.redeemed ?? 0,
    stock: r.stock,
  }))
}

export default function Gamification() {
  const [activeTab, setActiveTab] = useState('Challenges')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [activeView, setActiveView] = useState('individual')
  const [joining, setJoining] = useState(false)

  const { data: rawChallenges, loading: loadingC, isLive: challengesLive, refetch: refetchC } = useApi(fetchChallenges, staticChallenges)
  const { data: rawBadges,     loading: loadingB, isLive: badgesLive,     refetch: refetchB } = useApi(fetchBadges,    staticBadges)
  const { data: rawRewards,    loading: loadingR, isLive: rewardsLive,    refetch: refetchR } = useApi(fetchRewards,   staticRewards)

  const challenges = challengesLive ? normaliseChallenges(rawChallenges) : rawChallenges
  const badges     = badgesLive     ? normaliseBadges(rawBadges)         : rawBadges
  const rewards    = rewardsLive    ? normaliseRewards(rawRewards)        : rawRewards

  const handleJoin = async (challenge) => {
    setJoining(true)
    try {
      await joinChallenge({ challenge: challenge.id, employee: 1, progress: 0, approval: 'Pending', xp_awarded: 0 })
      alert('Successfully joined challenge!')
    } catch {
      alert('Joined! (Demo mode)')
    } finally {
      setJoining(false)
      setSelectedChallenge(null)
    }
  }

  return (
    <PageContainer
      title="Gamification"
      description="Challenges, badges, XP and rewards to drive ESG engagement"
      breadcrumbs={[{ label: 'Gamification' }]}
    >
      <div className="flex gap-0 border-b border-slate-200 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CHALLENGES */}
      {activeTab === 'Challenges' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <FilterBar activeFilter={categoryFilter} onChange={setCategoryFilter} filters={[
              { value: 'all', label: 'All' },
              { value: 'Environmental', label: 'Environmental' },
              { value: 'Social', label: 'Social' },
              { value: 'Governance', label: 'Governance' },
            ]} />
            <Button size="sm" variant="ghost" onClick={refetchC}><RefreshCw size={13} /></Button>
          </div>
          {loadingC ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({length:6}).map((_,i) => <Card key={i} className="h-44 animate-pulse bg-slate-50" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {challenges.filter(c => categoryFilter === 'all' || c.category === categoryFilter).map((challenge, i) => (
                <motion.div key={challenge.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card hover onClick={() => setSelectedChallenge(challenge)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0 mr-2">
                        <p className="text-sm font-semibold text-slate-900">{challenge.title}</p>
                        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                          <Badge variant={challenge.category === 'Environmental' ? 'green' : challenge.category === 'Social' ? 'blue' : 'purple'}>{challenge.category}</Badge>
                          <Badge variant={difficultyColor[challenge.difficulty] ?? 'gray'}>{challenge.difficulty}</Badge>
                          <Badge variant={challenge.status === 'Active' ? 'green' : challenge.status === 'Completed' ? 'blue' : 'gray'} dot>{challenge.status}</Badge>
                        </div>
                      </div>
                      <div className="bg-amber-50 rounded-lg px-2.5 py-1.5 text-center flex-shrink-0">
                        <p className="text-sm font-bold text-amber-700">+{challenge.xp}</p>
                        <p className="text-[9px] text-amber-600 uppercase font-semibold">XP</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">{challenge.description}</p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 flex items-center gap-1"><Users size={11} /> {challenge.participants} participants</span>
                        {challenge.deadline && <span className="text-slate-500">Due: {new Date(challenge.deadline).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</span>}
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${challenge.progress ?? 0}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Progress</span>
                        <span className="font-medium text-slate-900">{challenge.progress ?? 0}%</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
          {challengesLive && <p className="text-xs text-green-600">● Live data from backend</p>}
        </div>
      )}

      {/* LEADERBOARD */}
      {activeTab === 'Leaderboard' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button variant={activeView === 'individual' ? 'primary' : 'secondary'} size="sm" onClick={() => setActiveView('individual')}><Users size={13} /> Individual</Button>
            <Button variant={activeView === 'department' ? 'primary' : 'secondary'} size="sm" onClick={() => setActiveView('department')}><Trophy size={13} /> Department</Button>
          </div>

          {activeView === 'individual' && (
            <Card padding={false}>
              <div className="px-5 pt-5 pb-3 border-b border-slate-200">
                <CardTitle>Individual Leaderboard</CardTitle>
                <CardDescription>Top ESG performers this quarter</CardDescription>
              </div>
              <div className="p-5">
                <div className="flex items-end justify-center gap-4 mb-8">
                  {[leaderboard[1], leaderboard[0], leaderboard[2]].map((p, i) => {
                    const heights = ['h-20','h-28','h-16']
                    const colors  = ['bg-slate-100','bg-amber-50','bg-orange-50']
                    return (
                      <div key={p.rank} className="flex flex-col items-center gap-2">
                        {p.rank === 1 && <Crown size={18} className="text-amber-500" />}
                        <Avatar initials={p.avatar} size="lg" />
                        <div className="text-center">
                          <p className="text-xs font-semibold text-slate-900">{p.name.split(' ')[0]}</p>
                          <p className="text-[10px] text-slate-500">{p.xp.toLocaleString()} XP</p>
                        </div>
                        <div className={`w-20 ${heights[i]} ${colors[i]} rounded-t-lg flex items-start justify-center pt-2`}>
                          <span className="text-lg font-black text-slate-900">#{p.rank}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="space-y-1">
                  {leaderboard.map((person, i) => (
                    <div key={person.rank} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i===0?'bg-amber-100 text-amber-700':i===1?'bg-slate-200 text-slate-600':i===2?'bg-orange-100 text-orange-700':'bg-slate-50 text-slate-500'}`}>{person.rank}</span>
                      <Avatar initials={person.avatar} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900">{person.name}</p>
                        <p className="text-[10px] text-slate-500">{person.department}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-primary-600">{person.xp.toLocaleString()}</p>
                        <p className="text-[10px] text-slate-500">Level {person.level}</p>
                      </div>
                      <span className={`text-xs font-medium flex-shrink-0 w-6 text-right ${person.change>0?'text-green-600':person.change<0?'text-red-500':'text-slate-400'}`}>
                        {person.change>0?`↑${person.change}`:person.change<0?`↓${Math.abs(person.change)}`:'—'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {activeView === 'department' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card padding={false}>
                <div className="px-5 pt-5 pb-3 border-b border-slate-200"><CardTitle>Department Rankings</CardTitle></div>
                <div className="p-5" style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentRankings} layout="vertical" margin={{ top: 0, right: 8, left: 60, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                      <XAxis type="number" domain={[0,100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis dataKey="department" type="category" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} width={72} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                      <Bar dataKey="score" name="ESG Score" fill="#16A34A" radius={[0,4,4,0]} maxBarSize={18} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <div className="space-y-2">
                {departmentRankings.map((d, i) => (
                  <Card key={d.department}>
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${i===0?'bg-amber-100 text-amber-700':i===1?'bg-slate-200 text-slate-600':i===2?'bg-orange-100 text-orange-700':'bg-slate-100 text-slate-500'}`}>#{d.rank}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-slate-900">{d.department}</span>
                          <span className="text-sm font-bold text-primary-600">{d.score}/100</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${d.score}%` }} />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* BADGES */}
      {activeTab === 'Badges' && (
        <div className="space-y-4">
          <div className="flex justify-end"><Button size="sm" variant="ghost" onClick={refetchB}><RefreshCw size={13} /></Button></div>
          {loadingB ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{Array.from({length:8}).map((_,i)=><Card key={i} className="h-36 animate-pulse bg-slate-50" />)}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {badges.map((badge, i) => (
                <motion.div key={badge.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}>
                  <Card hover className="text-center">
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">{badge.name}</p>
                    <p className="text-xs text-slate-500 mb-3">{badge.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant={getRarityColor(badge.rarity)}>{badge.rarity}</Badge>
                      <span className="text-xs text-slate-500">{badge.holders} holders</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
          {badgesLive && <p className="text-xs text-green-600">● Live data from backend</p>}
        </div>
      )}

      {/* REWARDS */}
      {activeTab === 'Rewards' && (
        <div className="space-y-4">
          <div className="flex justify-end"><Button size="sm" variant="ghost" onClick={refetchR}><RefreshCw size={13} /></Button></div>
          {loadingR ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({length:6}).map((_,i)=><Card key={i} className="h-40 animate-pulse bg-slate-50" />)}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward, i) => (
                <motion.div key={reward.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <Card className={!reward.available ? 'opacity-60' : ''}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0 mr-2">
                        <p className="text-sm font-semibold text-slate-900">{reward.title}</p>
                        <Badge variant="gray" className="mt-1">{reward.category}</Badge>
                      </div>
                      <div className="bg-amber-50 rounded-lg px-2.5 py-1.5 text-center flex-shrink-0">
                        <p className="text-sm font-bold text-amber-700">{reward.cost.toLocaleString()}</p>
                        <p className="text-[9px] text-amber-600 uppercase font-semibold">XP</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{reward.stock != null ? `${reward.stock} left` : `${reward.redeemed} redeemed`}</span>
                      <Button variant={reward.available ? 'primary' : 'secondary'} size="sm" disabled={!reward.available}>
                        {reward.available ? <><Gift size={12} /> Redeem</> : 'Unavailable'}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
          {rewardsLive && <p className="text-xs text-green-600">● Live data from backend</p>}
        </div>
      )}

      {/* Challenge Detail Modal */}
      <Modal open={!!selectedChallenge} onClose={() => setSelectedChallenge(null)} title="Challenge Details" size="md">
        {selectedChallenge && (
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant={selectedChallenge.category === 'Environmental' ? 'green' : selectedChallenge.category === 'Social' ? 'blue' : 'purple'}>{selectedChallenge.category}</Badge>
              <Badge variant={difficultyColor[selectedChallenge.difficulty] ?? 'gray'}>{selectedChallenge.difficulty}</Badge>
              <Badge variant="yellow">+{selectedChallenge.xp} XP</Badge>
            </div>
            <p className="text-sm text-slate-500">{selectedChallenge.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {[['Participants', selectedChallenge.participants], ['Status', selectedChallenge.status], ['Progress', `${selectedChallenge.progress ?? 0}%`], ['Deadline', selectedChallenge.deadline ? new Date(selectedChallenge.deadline).toLocaleDateString() : '—']].map(([k, v]) => (
                <div key={k} className="bg-slate-50 rounded-lg p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">{k}</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500">Progress</span>
                <span className="font-medium">{selectedChallenge.progress ?? 0}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${selectedChallenge.progress ?? 0}%` }} />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="primary" className="flex-1" disabled={joining} onClick={() => handleJoin(selectedChallenge)}>
                {joining ? 'Joining…' : 'Join Challenge'}
              </Button>
              <Button variant="secondary" onClick={() => setSelectedChallenge(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>
    </PageContainer>
  )
}
