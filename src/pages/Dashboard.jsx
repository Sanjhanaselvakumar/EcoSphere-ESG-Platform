import { useState } from 'react'
import {
  TrendingUp, Leaf, Users, Shield, Wind, AlertTriangle,
  Heart, Zap, MoreHorizontal, ArrowUpRight
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'
import PageContainer from '@/components/layouts/PageContainer'
import Card, { CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import ProgressRing from '@/components/ui/ProgressRing'
import Button from '@/components/ui/Button'
import { kpiCards } from '@/data/kpiData'
import { esgTrendData, carbonTrendData, departmentEmissionsData, esgScoreBreakdown, complianceData } from '@/data/chartData'
import { recentActivities } from '@/data/activityData'
import { departmentRankings } from '@/data/gamificationData'
import { getStatusColor } from '@/utils/formatters'

const iconMap = { TrendingUp, Leaf, Users, Shield, Wind, AlertTriangle, Heart, Zap }

const typeColors = {
  environmental: 'green', governance: 'purple', gamification: 'yellow', social: 'blue'
}

const CHART_COLORS = ['#16A34A', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#14B8A6', '#F97316']

export default function Dashboard() {
  const [activityFilter, setActivityFilter] = useState('all')

  const filtered = activityFilter === 'all'
    ? recentActivities
    : recentActivities.filter(a => a.type === activityFilter)

  return (
    <PageContainer
      title="ESG Dashboard"
      description="Organizational sustainability performance overview"
      breadcrumbs={[{ label: 'Dashboard' }]}
      actions={
        <div className="flex items-center gap-2">
          <select className="input h-8 text-xs w-36">
            <option>Q3 2024</option>
            <option>Q2 2024</option>
            <option>FY 2023</option>
          </select>
          <Button variant="primary" size="sm">
            <ArrowUpRight size={13} /> Export
          </Button>
        </div>
      }
    >
      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((card, i) => {
          const Icon = iconMap[card.icon]
          return (
            <StatCard
              key={card.id}
              title={card.title}
              value={card.value}
              unit={card.unit}
              change={card.change}
              changeType={card.changeType}
              description={card.description}
              color={card.color}
              icon={Icon}
              index={i}
            />
          )
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* ESG Score Trend */}
        <Card className="lg:col-span-2" padding={false}>
          <div className="px-5 pt-5 pb-3 border-b border-slate-200">
            <CardTitle>ESG Score Trend</CardTitle>
            <CardDescription>Environmental, Social & Governance scores over time</CardDescription>
          </div>
          <div className="p-5" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={esgTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  {[['env', '#16A34A'], ['soc', '#3B82F6'], ['gov', '#8B5CF6']].map(([id, color]) => (
                    <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.12} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[55, 95]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="environmental" name="Environmental" stroke="#16A34A" strokeWidth={2} fill="url(#env)" dot={false} />
                <Area type="monotone" dataKey="social" name="Social" stroke="#3B82F6" strokeWidth={2} fill="url(#soc)" dot={false} />
                <Area type="monotone" dataKey="governance" name="Governance" stroke="#8B5CF6" strokeWidth={2} fill="url(#gov)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* ESG Breakdown Pie */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3 border-b border-slate-200">
            <CardTitle>ESG Score Breakdown</CardTitle>
            <CardDescription>Current quarter performance</CardDescription>
          </div>
          <div className="p-5 flex flex-col items-center">
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={esgScoreBreakdown} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value">
                    {esgScoreBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2 mt-1">
              {esgScoreBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-xs text-textSecondary">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-textPrimary">{item.value}/100</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Carbon Emissions Bar */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3 border-b border-slate-200">
            <CardTitle>Carbon Emissions by Scope</CardTitle>
            <CardDescription>Monthly tCO₂e breakdown — Scope 1, 2 & 3</CardDescription>
          </div>
          <div className="p-5" style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={carbonTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="scope1" name="Scope 1" fill="#16A34A" radius={[3, 3, 0, 0]} maxBarSize={24} />
                <Bar dataKey="scope2" name="Scope 2" fill="#86EFAC" radius={[3, 3, 0, 0]} maxBarSize={24} />
                <Bar dataKey="scope3" name="Scope 3" fill="#BBF7D0" radius={[3, 3, 0, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Dept Emissions */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3 border-b border-slate-200">
            <CardTitle>Department Emissions vs Target</CardTitle>
            <CardDescription>Actual vs reduction target by department</CardDescription>
          </div>
          <div className="p-5" style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentEmissionsData} layout="vertical" margin={{ top: 0, right: 8, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="department" type="category" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} width={60} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="emissions" name="Actual" fill="#16A34A" radius={[0, 3, 3, 0]} maxBarSize={12} />
                <Bar dataKey="target" name="Target" fill="#E2E8F0" radius={[0, 3, 3, 0]} maxBarSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <Card className="lg:col-span-2" padding={false}>
          <div className="px-5 pt-5 pb-3 border-b border-slate-200 flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across the platform</CardDescription>
            </div>
            <div className="flex gap-1">
              {['all', 'environmental', 'governance', 'social', 'gamification'].map(f => (
                <button key={f} onClick={() => setActivityFilter(f)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-medium capitalize transition-all ${
                    activityFilter === f ? 'bg-primary-600 text-white' : 'bg-slate-100 text-textSecondary hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-border">
            {filtered.slice(0, 6).map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors"
              >
                <Avatar initials={a.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-textPrimary">
                    <span className="font-medium">{a.user}</span>
                    <span className="text-textSecondary"> {a.action} </span>
                    <span className="font-medium">{a.target}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{a.time}</p>
                </div>
                <Badge variant={typeColors[a.type] || 'gray'}>{a.type}</Badge>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Department Ranking */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3 border-b border-slate-200">
            <CardTitle>Department Rankings</CardTitle>
            <CardDescription>ESG performance by department</CardDescription>
          </div>
          <div className="divide-y divide-border">
            {departmentRankings.map((dept, i) => (
              <div key={dept.department} className="px-5 py-3 flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i === 0 ? 'bg-amber-100 text-amber-700' :
                  i === 1 ? 'bg-slate-200 text-slate-600' :
                  i === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {dept.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-textPrimary truncate">{dept.department}</span>
                    <span className="text-xs font-bold text-textPrimary">{dept.score}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className="bg-primary-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${dept.score}%` }}
                    />
                  </div>
                </div>
                <span className={`text-[10px] font-medium flex-shrink-0 ${
                  dept.change > 0 ? 'text-green-600' : dept.change < 0 ? 'text-red-500' : 'text-slate-400'
                }`}>
                  {dept.change > 0 ? `+${dept.change}` : dept.change}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  )
}
