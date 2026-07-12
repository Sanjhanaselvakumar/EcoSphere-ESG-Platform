import { useState } from 'react'
import { Plus, Download, Shield, CheckCircle, AlertTriangle, FileText } from 'lucide-react'
import {
  PieChart, Pie, Cell, BarChart, Bar,
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
import ProgressRing from '@/components/ui/ProgressRing'
import { policies, audits, complianceIssues } from '@/data/governanceData'
import { complianceData } from '@/data/chartData'
import { getStatusColor, getSeverityColor, formatDate } from '@/utils/formatters'

const tabs = ['Dashboard', 'Policies', 'Acknowledgements', 'Audits', 'Compliance Issues']

export default function Governance() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedPolicy, setSelectedPolicy] = useState(null)
  const [selectedIssue, setSelectedIssue] = useState(null)

  const openIssues = complianceIssues.filter(i => i.status === 'Open').length
  const resolvedIssues = complianceIssues.filter(i => i.status === 'Resolved').length

  return (
    <PageContainer
      title="Governance"
      description="Policies, acknowledgements, audits and compliance management"
      breadcrumbs={[{ label: 'Governance' }]}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" size="sm"><Download size={13} /> Export</Button>
          <Button variant="primary" size="sm"><Plus size={13} /> New Policy</Button>
        </div>
      }
    >
      {/* Tabs */}
      <div className="flex gap-0 border-b border-slate-200 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab ? 'border-primary-600 text-primary-600' : 'border-transparent text-textSecondary hover:text-textPrimary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* DASHBOARD */}
      {activeTab === 'Dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Policies', value: policies.filter(p => p.status === 'Active').length, icon: Shield, color: 'bg-green-50 text-green-600' },
              { label: 'Compliance Rate', value: '93%', icon: CheckCircle, color: 'bg-blue-50 text-blue-600' },
              { label: 'Open Issues', value: openIssues, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
              { label: 'Audits This Year', value: audits.length, icon: FileText, color: 'bg-purple-50 text-purple-600' },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label}>
                <div className={`inline-flex w-8 h-8 rounded-lg items-center justify-center mb-3 ${color}`}>
                  <Icon size={15} />
                </div>
                <p className="text-xl font-bold text-textPrimary">{value}</p>
                <p className="text-xs text-textSecondary mt-0.5">{label}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Compliance Pie */}
            <Card padding={false}>
              <div className="px-5 pt-5 pb-3 border-b border-slate-200">
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Overall compliance breakdown</CardDescription>
              </div>
              <div className="p-5 flex flex-col items-center">
                <div style={{ width: '100%', height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={complianceData} cx="50%" cy="50%" innerRadius={50} outerRadius={74} paddingAngle={3} dataKey="value">
                        {complianceData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full space-y-2">
                  {complianceData.map(item => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                        <span className="text-xs text-textSecondary">{item.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-textPrimary">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Policy Acknowledgement */}
            <Card className="lg:col-span-2" padding={false}>
              <div className="px-5 pt-5 pb-3 border-b border-slate-200">
                <CardTitle>Policy Acknowledgement Rates</CardTitle>
                <CardDescription>% of employees who acknowledged each policy</CardDescription>
              </div>
              <div className="p-5" style={{ height: 230 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={policies.slice(0, 5).map(p => ({
                      name: p.title.split(' ').slice(0, 3).join(' ') + '...',
                      rate: Math.round((p.acknowledgements / p.total) * 100),
                    }))}
                    margin={{ top: 4, right: 4, left: -20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} angle={-15} textAnchor="end" />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                    <Bar dataKey="rate" name="Acknowledgement %" fill="#16A34A" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Recent Audits */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3 border-b border-slate-200">
              <CardTitle>Recent Audits</CardTitle>
            </div>
            <div className="divide-y divide-border">
              {audits.slice(0, 4).map(audit => (
                <div key={audit.id} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-textPrimary truncate">{audit.title}</p>
                    <p className="text-xs text-textSecondary mt-0.5">{audit.auditor} · {formatDate(audit.date)}</p>
                  </div>
                  <Badge variant={audit.type === 'External' ? 'blue' : audit.type === 'Third-party' ? 'purple' : 'gray'}>{audit.type}</Badge>
                  <Badge variant={getStatusColor(audit.status)} dot>{audit.status}</Badge>
                  {audit.score != null && (
                    <span className={`text-sm font-bold ${audit.score >= 90 ? 'text-green-600' : audit.score >= 80 ? 'text-amber-600' : 'text-red-500'}`}>
                      {audit.score}/100
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* POLICIES TAB */}
      {activeTab === 'Policies' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchBar value={search} onChange={setSearch} placeholder="Search policies..." />
            <FilterBar
              activeFilter={filter}
              onChange={setFilter}
              filters={[
                { value: 'all', label: 'All' },
                { value: 'Active', label: 'Active' },
                { value: 'Under Review', label: 'Under Review' },
              ]}
            />
          </div>
          <DataTable
            columns={[
              { key: 'id', label: 'ID', width: 80 },
              { key: 'title', label: 'Policy Title', sortable: true },
              { key: 'category', label: 'Category' },
              { key: 'version', label: 'Version' },
              { key: 'status', label: 'Status', render: v => <Badge variant={getStatusColor(v)} dot>{v}</Badge> },
              { key: 'owner', label: 'Owner' },
              { key: 'nextReview', label: 'Next Review', render: v => formatDate(v) },
              { key: 'acknowledgements', label: 'Acknowledged', render: (v, r) => (
                <span className="text-xs font-medium">{v}/{r.total} ({Math.round((v/r.total)*100)}%)</span>
              )},
              { key: 'id', label: '', render: (_, row) => (
                <Button size="sm" variant="ghost" onClick={() => setSelectedPolicy(row)}>View</Button>
              )},
            ]}
            data={policies.filter(p =>
              (filter === 'all' || p.status === filter) &&
              p.title.toLowerCase().includes(search.toLowerCase())
            )}
          />
        </div>
      )}

      {/* ACKNOWLEDGEMENTS TAB */}
      {activeTab === 'Acknowledgements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {policies.map(policy => {
            const rate = Math.round((policy.acknowledgements / policy.total) * 100)
            return (
              <Card key={policy.id}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-sm font-semibold text-textPrimary">{policy.title}</p>
                    <p className="text-xs text-textSecondary mt-0.5">{policy.category}</p>
                  </div>
                  <ProgressRing value={rate} size={56} strokeWidth={5} color={rate >= 90 ? '#16A34A' : rate >= 75 ? '#F59E0B' : '#EF4444'} />
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${rate}%`, background: rate >= 90 ? '#16A34A' : '#F59E0B' }} />
                </div>
                <p className="text-xs text-textSecondary mt-1.5">{policy.acknowledgements} / {policy.total} employees</p>
              </Card>
            )
          })}
        </div>
      )}

      {/* AUDITS TAB */}
      {activeTab === 'Audits' && (
        <div className="space-y-4">
          <SearchBar value={search} onChange={setSearch} placeholder="Search audits..." />
          <DataTable
            columns={[
              { key: 'id', label: 'ID', width: 80 },
              { key: 'title', label: 'Audit Title', sortable: true },
              { key: 'type', label: 'Type', render: v => <Badge variant={v === 'External' ? 'blue' : v === 'Third-party' ? 'purple' : 'gray'}>{v}</Badge> },
              { key: 'scope', label: 'Scope' },
              { key: 'status', label: 'Status', render: v => <Badge variant={getStatusColor(v)} dot>{v}</Badge> },
              { key: 'date', label: 'Date', render: v => formatDate(v) },
              { key: 'auditor', label: 'Auditor' },
              { key: 'findings', label: 'Findings', render: v => <span className="text-xs font-medium">{v}</span> },
              { key: 'criticalFindings', label: 'Critical', render: v => <span className={`text-xs font-bold ${v > 0 ? 'text-red-600' : 'text-green-600'}`}>{v}</span> },
              { key: 'score', label: 'Score', sortable: true, render: v => v != null
                ? <span className={`font-bold text-sm ${v >= 90 ? 'text-green-600' : v >= 80 ? 'text-amber-600' : 'text-red-500'}`}>{v}/100</span>
                : <Badge variant="gray">Pending</Badge>
              },
            ]}
            data={audits.filter(a => a.title.toLowerCase().includes(search.toLowerCase()))}
          />
        </div>
      )}

      {/* COMPLIANCE ISSUES TAB */}
      {activeTab === 'Compliance Issues' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchBar value={search} onChange={setSearch} placeholder="Search compliance issues..." />
            <FilterBar
              activeFilter={filter}
              onChange={setFilter}
              filters={[
                { value: 'all', label: 'All', count: complianceIssues.length },
                { value: 'Open', label: 'Open', count: complianceIssues.filter(i => i.status === 'Open').length },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Resolved', label: 'Resolved' },
              ]}
            />
          </div>
          <DataTable
            columns={[
              { key: 'id', label: 'ID', width: 80 },
              { key: 'title', label: 'Issue', sortable: true },
              { key: 'category', label: 'Category' },
              { key: 'severity', label: 'Severity', render: v => <Badge variant={getSeverityColor(v)} dot>{v}</Badge> },
              { key: 'status', label: 'Status', render: v => <Badge variant={getStatusColor(v)} dot>{v}</Badge> },
              { key: 'department', label: 'Department' },
              { key: 'assignee', label: 'Assignee' },
              { key: 'dueDate', label: 'Due Date', render: v => formatDate(v) },
              { key: 'regulation', label: 'Regulation' },
              { key: 'id', label: '', render: (_, row) => (
                <Button size="sm" variant="ghost" onClick={() => setSelectedIssue(row)}>View</Button>
              )},
            ]}
            data={complianceIssues.filter(i =>
              (filter === 'all' || i.status === filter) &&
              i.title.toLowerCase().includes(search.toLowerCase())
            )}
          />
        </div>
      )}

      {/* Policy Detail Modal */}
      <Modal open={!!selectedPolicy} onClose={() => setSelectedPolicy(null)} title="Policy Details" size="sm">
        {selectedPolicy && (
          <div className="space-y-3">
            {[
              ['Title', selectedPolicy.title],
              ['Category', selectedPolicy.category],
              ['Version', selectedPolicy.version],
              ['Status', selectedPolicy.status],
              ['Owner', selectedPolicy.owner],
              ['Last Reviewed', formatDate(selectedPolicy.lastReviewed)],
              ['Next Review', formatDate(selectedPolicy.nextReview)],
              ['Acknowledged', `${selectedPolicy.acknowledgements} / ${selectedPolicy.total}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm border-b border-slate-200 pb-2">
                <span className="text-textSecondary">{k}</span>
                <span className="font-medium text-textPrimary">{v}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Compliance Issue Modal */}
      <Modal open={!!selectedIssue} onClose={() => setSelectedIssue(null)} title="Compliance Issue Details" size="sm">
        {selectedIssue && (
          <div className="space-y-3">
            <div className="flex gap-2 mb-2">
              <Badge variant={getSeverityColor(selectedIssue.severity)} dot>{selectedIssue.severity}</Badge>
              <Badge variant={getStatusColor(selectedIssue.status)} dot>{selectedIssue.status}</Badge>
            </div>
            {[
              ['Title', selectedIssue.title],
              ['Category', selectedIssue.category],
              ['Department', selectedIssue.department],
              ['Assignee', selectedIssue.assignee],
              ['Regulation', selectedIssue.regulation],
              ['Created', formatDate(selectedIssue.createdDate)],
              ['Due Date', formatDate(selectedIssue.dueDate)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm border-b border-slate-200 pb-2">
                <span className="text-textSecondary">{k}</span>
                <span className="font-medium text-textPrimary">{v}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </PageContainer>
  )
}
