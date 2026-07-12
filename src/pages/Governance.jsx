import { useState } from 'react'
import { Plus, Download, Shield, CheckCircle, AlertTriangle, FileText, RefreshCw } from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import PageContainer from '@/components/layouts/PageContainer'
import Card, { CardTitle, CardDescription } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/ui/DataTable'
import SearchBar from '@/components/ui/SearchBar'
import FilterBar from '@/components/ui/FilterBar'
import Modal from '@/components/ui/Modal'
import ProgressRing from '@/components/ui/ProgressRing'
import { TableSkeleton } from '@/components/ui/LoadingSkeleton'

import { useApi } from '@/hooks/useApi'
import { fetchPolicies, fetchAudits, fetchComplianceIssues, updateComplianceIssue } from '@/services/api'

import { policies as staticPolicies, audits as staticAudits, complianceIssues as staticIssues } from '@/data/governanceData'
import { complianceData } from '@/data/chartData'
import { getStatusColor, getSeverityColor, formatDate } from '@/utils/formatters'

const tabs = ['Dashboard', 'Policies', 'Acknowledgements', 'Audits', 'Compliance Issues']

function normalisePolicies(items) {
  return items.map(p => ({
    id: p.policy_id ?? p.id,
    title: p.policy_name ?? p.title,
    category: p.category ?? 'General',
    version: p.version ?? '1.0',
    status: p.status ?? 'Active',
    owner: p.owner ?? '—',
    lastReviewed: p.effective_date ?? p.lastReviewed,
    nextReview: p.nextReview ?? p.effective_date,
    acknowledgements: p.acknowledgements ?? 0,
    total: p.total ?? 100,
  }))
}

function normaliseAudits(items) {
  return items.map(a => ({
    id: a.audit_id ?? a.id,
    title: a.audit_name ?? a.title,
    type: a.type ?? 'Internal',
    scope: a.scope ?? '—',
    status: a.status ?? 'Scheduled',
    date: a.audit_date ?? a.date,
    auditor: a.auditor,
    findings: a.findings ?? 0,
    criticalFindings: a.critical_findings ?? a.criticalFindings ?? 0,
    score: a.score ?? null,
  }))
}

function normaliseIssues(items) {
  return items.map(i => ({
    id: i.issue_id ?? i.id,
    title: i.description?.slice(0, 60) ?? i.title ?? '—',
    category: i.category ?? 'General',
    severity: i.severity ?? 'Medium',
    status: i.status ?? 'Open',
    department: i.department ?? '—',
    assignee: i.owner ?? i.assignee ?? '—',
    dueDate: i.due_date ?? i.dueDate,
    regulation: i.regulation ?? '—',
  }))
}

export default function Governance() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedPolicy, setSelectedPolicy] = useState(null)
  const [selectedIssue, setSelectedIssue] = useState(null)

  const { data: rawPolicies, loading: loadingPolicies, isLive: policiesLive, refetch: refetchPolicies } = useApi(fetchPolicies, staticPolicies)
  const { data: rawAudits,   loading: loadingAudits,   isLive: auditsLive,   refetch: refetchAudits   } = useApi(fetchAudits,   staticAudits)
  const { data: rawIssues,   loading: loadingIssues,   isLive: issuesLive,   refetch: refetchIssues   } = useApi(fetchComplianceIssues, staticIssues)

  const policies = policiesLive ? normalisePolicies(rawPolicies) : rawPolicies
  const audits   = auditsLive   ? normaliseAudits(rawAudits)     : rawAudits
  const issues   = issuesLive   ? normaliseIssues(rawIssues)     : rawIssues

  const openIssues = issues.filter(i => i.status === 'Open').length

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

      {/* DASHBOARD */}
      {activeTab === 'Dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Policies',   value: policies.filter(p => p.status === 'Active').length, icon: Shield,        color: 'bg-green-50 text-green-600' },
              { label: 'Compliance Rate',   value: '93%',                                               icon: CheckCircle,   color: 'bg-blue-50 text-blue-600' },
              { label: 'Open Issues',       value: openIssues,                                          icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
              { label: 'Audits This Year',  value: audits.length,                                       icon: FileText,      color: 'bg-purple-50 text-purple-600' },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label}>
                <div className={`inline-flex w-8 h-8 rounded-lg items-center justify-center mb-3 ${color}`}><Icon size={15} /></div>
                <p className="text-xl font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
                        {complianceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
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
                        <span className="text-xs text-slate-500">{item.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-2" padding={false}>
              <div className="px-5 pt-5 pb-3 border-b border-slate-200">
                <CardTitle>Policy Acknowledgement Rates</CardTitle>
                <CardDescription>% of employees who acknowledged each policy</CardDescription>
              </div>
              <div className="p-5" style={{ height: 230 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={policies.slice(0, 5).map(p => ({
                      name: (p.title ?? '').split(' ').slice(0, 3).join(' ') + '...',
                      rate: p.total > 0 ? Math.round((p.acknowledgements / p.total) * 100) : 0,
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

          <Card padding={false}>
            <div className="px-5 pt-5 pb-3 border-b border-slate-200">
              <CardTitle>Recent Audits</CardTitle>
            </div>
            <div className="divide-y divide-slate-100">
              {audits.slice(0, 4).map(audit => (
                <div key={audit.id} className="px-5 py-3 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{audit.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{audit.auditor} · {audit.date ? formatDate(audit.date) : '—'}</p>
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
          {(policiesLive || auditsLive) && <p className="text-xs text-green-600">● Live data from backend</p>}
        </div>
      )}

      {/* POLICIES */}
      {activeTab === 'Policies' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <SearchBar value={search} onChange={setSearch} placeholder="Search policies..." />
            <FilterBar activeFilter={filter} onChange={setFilter} filters={[
              { value: 'all', label: 'All' },
              { value: 'Active', label: 'Active' },
              { value: 'Under Review', label: 'Under Review' },
            ]} />
            <Button size="sm" variant="ghost" onClick={refetchPolicies}><RefreshCw size={13} /></Button>
          </div>
          {loadingPolicies ? <TableSkeleton rows={5} cols={6} /> : (
            <DataTable
              columns={[
                { key: 'id',     label: 'ID',           width: 80 },
                { key: 'title',  label: 'Policy Title', sortable: true },
                { key: 'category', label: 'Category' },
                { key: 'version',  label: 'Version' },
                { key: 'status',   label: 'Status', render: v => <Badge variant={getStatusColor(v)} dot>{v}</Badge> },
                { key: 'owner',    label: 'Owner' },
                { key: 'nextReview', label: 'Next Review', render: v => v ? formatDate(v) : '—' },
                { key: 'acknowledgements', label: 'Acknowledged', render: (v, r) => (
                  <span className="text-xs font-medium">{v}/{r.total} ({r.total > 0 ? Math.round((v/r.total)*100) : 0}%)</span>
                )},
                { key: 'id', label: '', render: (_, row) => (
                  <Button size="sm" variant="ghost" onClick={() => setSelectedPolicy(row)}>View</Button>
                )},
              ]}
              data={policies.filter(p =>
                (filter === 'all' || p.status === filter) &&
                (p.title ?? '').toLowerCase().includes(search.toLowerCase())
              )}
            />
          )}
          {policiesLive && <p className="text-xs text-green-600">● Live data from backend</p>}
        </div>
      )}

      {/* ACKNOWLEDGEMENTS */}
      {activeTab === 'Acknowledgements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {policies.map(policy => {
            const rate = policy.total > 0 ? Math.round((policy.acknowledgements / policy.total) * 100) : 0
            return (
              <Card key={policy.id}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-sm font-semibold text-slate-900">{policy.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{policy.category}</p>
                  </div>
                  <ProgressRing value={rate} size={56} strokeWidth={5} color={rate >= 90 ? '#16A34A' : rate >= 75 ? '#F59E0B' : '#EF4444'} />
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${rate}%`, background: rate >= 90 ? '#16A34A' : '#F59E0B' }} />
                </div>
                <p className="text-xs text-slate-500 mt-1.5">{policy.acknowledgements} / {policy.total} employees</p>
              </Card>
            )
          })}
        </div>
      )}

      {/* AUDITS */}
      {activeTab === 'Audits' && (
        <div className="space-y-4">
          <div className="flex gap-3">
            <SearchBar value={search} onChange={setSearch} placeholder="Search audits..." />
            <Button size="sm" variant="ghost" onClick={refetchAudits}><RefreshCw size={13} /></Button>
          </div>
          {loadingAudits ? <TableSkeleton rows={5} cols={7} /> : (
            <DataTable
              columns={[
                { key: 'id',     label: 'ID',    width: 80 },
                { key: 'title',  label: 'Audit', sortable: true },
                { key: 'type',   label: 'Type',  render: v => <Badge variant={v === 'External' ? 'blue' : v === 'Third-party' ? 'purple' : 'gray'}>{v}</Badge> },
                { key: 'status', label: 'Status', render: v => <Badge variant={getStatusColor(v)} dot>{v}</Badge> },
                { key: 'date',   label: 'Date',   render: v => v ? formatDate(v) : '—' },
                { key: 'auditor', label: 'Auditor' },
                { key: 'findings', label: 'Findings', render: v => <span className="text-xs font-medium">{v}</span> },
                { key: 'score', label: 'Score', sortable: true, render: v => v != null
                  ? <span className={`font-bold text-sm ${v >= 90 ? 'text-green-600' : v >= 80 ? 'text-amber-600' : 'text-red-500'}`}>{v}/100</span>
                  : <Badge variant="gray">Pending</Badge>
                },
              ]}
              data={audits.filter(a => (a.title ?? '').toLowerCase().includes(search.toLowerCase()))}
            />
          )}
          {auditsLive && <p className="text-xs text-green-600">● Live data from backend</p>}
        </div>
      )}

      {/* COMPLIANCE ISSUES */}
      {activeTab === 'Compliance Issues' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <SearchBar value={search} onChange={setSearch} placeholder="Search issues..." />
            <FilterBar activeFilter={filter} onChange={setFilter} filters={[
              { value: 'all',         label: 'All',         count: issues.length },
              { value: 'Open',        label: 'Open',        count: issues.filter(i => i.status === 'Open').length },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Resolved',    label: 'Resolved' },
            ]} />
            <Button size="sm" variant="ghost" onClick={refetchIssues}><RefreshCw size={13} /></Button>
          </div>
          {loadingIssues ? <TableSkeleton rows={6} cols={7} /> : (
            <DataTable
              columns={[
                { key: 'id',        label: 'ID',       width: 80 },
                { key: 'title',     label: 'Issue',    sortable: true },
                { key: 'category',  label: 'Category' },
                { key: 'severity',  label: 'Severity', render: v => <Badge variant={getSeverityColor(v)} dot>{v}</Badge> },
                { key: 'status',    label: 'Status',   render: v => <Badge variant={getStatusColor(v)} dot>{v}</Badge> },
                { key: 'department', label: 'Department' },
                { key: 'assignee',  label: 'Assignee' },
                { key: 'dueDate',   label: 'Due Date', render: v => v ? formatDate(v) : '—' },
                { key: 'regulation', label: 'Regulation' },
                { key: 'id', label: '', render: (_, row) => (
                  <Button size="sm" variant="ghost" onClick={() => setSelectedIssue(row)}>View</Button>
                )},
              ]}
              data={issues.filter(i =>
                (filter === 'all' || i.status === filter) &&
                (i.title ?? '').toLowerCase().includes(search.toLowerCase())
              )}
            />
          )}
          {issuesLive && <p className="text-xs text-green-600">● Live data from backend</p>}
        </div>
      )}

      {/* Policy Modal */}
      <Modal open={!!selectedPolicy} onClose={() => setSelectedPolicy(null)} title="Policy Details" size="sm">
        {selectedPolicy && (
          <div className="space-y-3">
            {[['Title', selectedPolicy.title], ['Category', selectedPolicy.category], ['Version', selectedPolicy.version], ['Status', selectedPolicy.status], ['Owner', selectedPolicy.owner], ['Next Review', selectedPolicy.nextReview ? formatDate(selectedPolicy.nextReview) : '—'], ['Acknowledged', `${selectedPolicy.acknowledgements} / ${selectedPolicy.total}`]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm border-b border-slate-200 pb-2">
                <span className="text-slate-500">{k}</span>
                <span className="font-medium text-slate-900">{v}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Issue Modal */}
      <Modal open={!!selectedIssue} onClose={() => setSelectedIssue(null)} title="Compliance Issue" size="sm">
        {selectedIssue && (
          <div className="space-y-3">
            <div className="flex gap-2 mb-2">
              <Badge variant={getSeverityColor(selectedIssue.severity)} dot>{selectedIssue.severity}</Badge>
              <Badge variant={getStatusColor(selectedIssue.status)} dot>{selectedIssue.status}</Badge>
            </div>
            {[['Title', selectedIssue.title], ['Category', selectedIssue.category], ['Department', selectedIssue.department], ['Assignee', selectedIssue.assignee], ['Regulation', selectedIssue.regulation], ['Due Date', selectedIssue.dueDate ? formatDate(selectedIssue.dueDate) : '—']].map(([k, v]) => (
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
