import { useState } from 'react'
import { Plus, Download, Users, Heart, BookOpen, TrendingUp } from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import PageContainer from '@/components/layouts/PageContainer'
import Card, { CardTitle, CardDescription } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/ui/DataTable'
import SearchBar from '@/components/ui/SearchBar'
import FilterBar from '@/components/ui/FilterBar'
import Modal from '@/components/ui/Modal'
import { csrActivities, diversityMetrics, trainingData, engagementData } from '@/data/socialData'
import { getStatusColor, formatCurrency, formatDate } from '@/utils/formatters'

const tabs = ['Overview', 'CSR Activities', 'Diversity', 'Training', 'Engagement']

export default function Social() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCSR, setSelectedCSR] = useState(null)

  return (
    <PageContainer
      title="Social"
      description="CSR activities, diversity metrics, training and employee engagement"
      breadcrumbs={[{ label: 'Social' }]}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" size="sm"><Download size={13} /> Export</Button>
          <Button variant="primary" size="sm"><Plus size={13} /> Add Activity</Button>
        </div>
      }
    >
      {/* Tabs */}
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

      {/* OVERVIEW */}
      {activeTab === 'Overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Employees', value: '1,482', icon: Users, color: 'bg-blue-50 text-blue-600' },
              { label: 'Active CSR Programs', value: '34', icon: Heart, color: 'bg-green-50 text-green-600' },
              { label: 'Training Completion', value: '89%', icon: BookOpen, color: 'bg-purple-50 text-purple-600' },
              { label: 'Engagement Score', value: '82/100', icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label}>
                <div className={`inline-flex w-8 h-8 rounded-lg items-center justify-center mb-3 ${color}`}>
                  <Icon size={15} />
                </div>
                <p className="text-xl font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Gender Diversity Pie */}
            <Card padding={false}>
              <div className="px-5 pt-5 pb-3 border-b border-slate-200">
                <CardTitle>Gender Diversity</CardTitle>
                <CardDescription>Workforce gender distribution</CardDescription>
              </div>
              <div className="p-5 flex gap-6 items-center" style={{ height: 220 }}>
                <ResponsiveContainer width="60%" height="100%">
                  <PieChart>
                    <Pie data={diversityMetrics.gender} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                      {diversityMetrics.gender.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2.5">
                  {diversityMetrics.gender.map(g => (
                    <div key={g.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} />
                        <span className="text-xs text-slate-500">{g.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{g.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Engagement Trend */}
            <Card padding={false}>
              <div className="px-5 pt-5 pb-3 border-b border-slate-200">
                <CardTitle>Employee Engagement</CardTitle>
                <CardDescription>Monthly engagement score trend</CardDescription>
              </div>
              <div className="p-5" style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[65, 90]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                    <Line type="monotone" dataKey="score" name="Score" stroke="#16A34A" strokeWidth={2.5} dot={{ r: 3, fill: '#16A34A' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Training Completion Chart */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3 border-b border-slate-200">
              <CardTitle>Training Completion by Department</CardTitle>
              <CardDescription>Completed, in-progress and not started (%)</CardDescription>
            </div>
            <div className="p-5" style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trainingData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="completed" name="Completed %" stackId="a" fill="#16A34A" maxBarSize={36} />
                  <Bar dataKey="inProgress" name="In Progress %" stackId="a" fill="#F59E0B" maxBarSize={36} />
                  <Bar dataKey="notStarted" name="Not Started %" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* CSR ACTIVITIES TAB */}
      {activeTab === 'CSR Activities' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchBar value={search} onChange={setSearch} placeholder="Search CSR activities..." />
            <FilterBar
              activeFilter={statusFilter}
              onChange={setStatusFilter}
              filters={[
                { value: 'all', label: 'All' },
                { value: 'Active', label: 'Active' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Upcoming', label: 'Upcoming' },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {csrActivities
              .filter(a =>
                (statusFilter === 'all' || a.status === statusFilter) &&
                a.title.toLowerCase().includes(search.toLowerCase())
              )
              .map(activity => (
                <Card key={activity.id} hover onClick={() => setSelectedCSR(activity)}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                      <Badge variant={getStatusColor(activity.status)} dot className="mt-1">{activity.status}</Badge>
                    </div>
                    <Badge variant="blue">{activity.category}</Badge>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Impact</span>
                      <span className="font-medium text-slate-900">{activity.impact}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Participants</span>
                      <span className="font-medium text-slate-900">{activity.participants}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Budget</span>
                      <span className="font-medium text-slate-900">{formatCurrency(activity.budget)}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                        <span>Budget Used</span>
                        <span>{Math.round((activity.spent / activity.budget) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div
                          className="bg-primary-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${Math.round((activity.spent / activity.budget) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 pt-1">Lead: <span className="font-medium">{activity.lead}</span></p>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* DIVERSITY TAB */}
      {activeTab === 'Diversity' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Total Employees', value: diversityMetrics.summary.totalEmployees.toLocaleString() },
              { label: 'Women in Leadership', value: `${diversityMetrics.summary.womenInLeadership}%` },
              { label: 'Pay Equity Gap', value: `${diversityMetrics.summary.avgPayEquityGap}%` },
              { label: 'Disability Inclusion', value: `${diversityMetrics.summary.disabilityInclusion}%` },
              { label: 'Veterans Hired', value: diversityMetrics.summary.veteransHired },
            ].map(({ label, value }) => (
              <Card key={label}>
                <p className="text-xl font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card padding={false}>
              <div className="px-5 pt-5 pb-3 border-b border-slate-200">
                <CardTitle>Leadership Gender Distribution</CardTitle>
                <CardDescription>Male vs female by leadership level</CardDescription>
              </div>
              <div className="p-5" style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={diversityMetrics.leadershipGender} layout="vertical" margin={{ top: 0, right: 8, left: 60, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="level" type="category" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} width={72} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="male" name="Male %" fill="#3B82F6" radius={[0, 3, 3, 0]} maxBarSize={14} />
                    <Bar dataKey="female" name="Female %" fill="#EC4899" radius={[0, 3, 3, 0]} maxBarSize={14} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card padding={false}>
              <div className="px-5 pt-5 pb-3 border-b border-slate-200">
                <CardTitle>Ethnicity Distribution</CardTitle>
                <CardDescription>Workforce ethnic breakdown</CardDescription>
              </div>
              <div className="p-5">
                <div className="space-y-3 mt-2">
                  {diversityMetrics.ethnicity.map((e, i) => {
                    const colors = ['#16A34A', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444']
                    return (
                      <div key={e.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">{e.name}</span>
                          <span className="font-semibold text-slate-900">{e.value}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${e.value}%`, background: colors[i % colors.length] }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TRAINING TAB */}
      {activeTab === 'Training' && (
        <DataTable
          columns={[
            { key: 'department', label: 'Department', sortable: true },
            { key: 'total', label: 'Employees', sortable: true },
            { key: 'completed', label: 'Completed %', sortable: true, render: v => (
              <div className="flex items-center gap-2">
                <div className="w-20 bg-slate-100 rounded-full h-1.5 flex-shrink-0">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${v}%` }} />
                </div>
                <span className="text-xs font-medium">{v}%</span>
              </div>
            )},
            { key: 'inProgress', label: 'In Progress %', render: v => <span className="text-xs text-amber-600 font-medium">{v}%</span> },
            { key: 'notStarted', label: 'Not Started %', render: v => <span className="text-xs text-red-500 font-medium">{v}%</span> },
          ]}
          data={trainingData}
        />
      )}

      {/* ENGAGEMENT TAB */}
      {activeTab === 'Engagement' && (
        <div className="space-y-4">
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3 border-b border-slate-200">
              <CardTitle>Employee Engagement Score Over Time</CardTitle>
              <CardDescription>Monthly scores and survey participation</CardDescription>
            </div>
            <div className="p-5" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} domain={[60, 90]} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar yAxisId="left" dataKey="score" name="Engagement Score" fill="#16A34A" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  <Line yAxisId="right" type="monotone" dataKey="surveys" name="Survey Responses" stroke="#3B82F6" strokeWidth={2} dot={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* CSR Detail Modal */}
      <Modal open={!!selectedCSR} onClose={() => setSelectedCSR(null)} title="CSR Activity Details" size="md">
        {selectedCSR && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={getStatusColor(selectedCSR.status)} dot>{selectedCSR.status}</Badge>
              <Badge variant="blue">{selectedCSR.category}</Badge>
            </div>
            {[
              ['Title', selectedCSR.title],
              ['Lead', selectedCSR.lead],
              ['Participants', selectedCSR.participants],
              ['Impact', selectedCSR.impact],
              ['Budget', formatCurrency(selectedCSR.budget)],
              ['Spent', formatCurrency(selectedCSR.spent)],
              ['Start Date', formatDate(selectedCSR.startDate)],
              ['End Date', formatDate(selectedCSR.endDate)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm border-b border-slate-200 pb-2">
                <span className="text-slate-500">{k}</span>
                <span className="font-medium text-slate-900">{v}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </PageContainer>
  )
}
