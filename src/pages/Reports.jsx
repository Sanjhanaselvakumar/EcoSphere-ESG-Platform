import { useState } from 'react'
import { Download, Plus, FileText, Eye, Filter, BarChart3, Leaf, Users, Shield } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import PageContainer from '@/components/layouts/PageContainer'
import Card, { CardTitle, CardDescription } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/ui/DataTable'
import SearchBar from '@/components/ui/SearchBar'
import Modal from '@/components/ui/Modal'
import { reportsList, reportMetrics } from '@/data/reportsData'
import { esgTrendData } from '@/data/chartData'
import { getStatusColor, formatDate } from '@/utils/formatters'

const tabs = ['Report Library', 'ESG Summary', 'Environmental', 'Social', 'Governance', 'Custom Builder']

const metricGroups = [
  {
    icon: Leaf, label: 'Environmental', color: 'text-green-600 bg-green-50',
    metrics: [
      ['Total GHG Emissions', `${reportMetrics.environmental.totalEmissions.toLocaleString()} tCO₂e`],
      ['Emissions Intensity', `${reportMetrics.environmental.emissionsIntensity} tCO₂e/M$`],
      ['Renewable Energy', `${reportMetrics.environmental.renewableEnergyShare}%`],
      ['Waste Recycled', `${reportMetrics.environmental.wasteRecycledShare}%`],
      ['Scope 1', `${reportMetrics.environmental.scope1.toLocaleString()} tCO₂e`],
      ['Scope 2', `${reportMetrics.environmental.scope2.toLocaleString()} tCO₂e`],
      ['Scope 3', `${reportMetrics.environmental.scope3.toLocaleString()} tCO₂e`],
    ]
  },
  {
    icon: Users, label: 'Social', color: 'text-blue-600 bg-blue-50',
    metrics: [
      ['Total Employees', reportMetrics.social.totalEmployees.toLocaleString()],
      ['Volunteering Hours', `${reportMetrics.social.volunteeringHours.toLocaleString()} hrs`],
      ['Training Hrs/Employee', `${reportMetrics.social.trainingHoursPerEmployee} hrs`],
      ['Engagement Score', `${reportMetrics.social.employeeEngagementScore}/100`],
      ['Diversity Score', `${reportMetrics.social.diversityScore}/100`],
      ['Safety Incidents', reportMetrics.social.safetyIncidents],
      ['Community Investment', `$${(reportMetrics.social.communityInvestment / 1000).toFixed(0)}K`],
    ]
  },
  {
    icon: Shield, label: 'Governance', color: 'text-purple-600 bg-purple-50',
    metrics: [
      ['Board Independence', `${reportMetrics.governance.boardIndependence}%`],
      ['Women on Board', `${reportMetrics.governance.womenOnBoard}%`],
      ['Active Policies', reportMetrics.governance.policiesActive],
      ['Compliance Rate', `${reportMetrics.governance.complianceRate}%`],
      ['Audit Findings', reportMetrics.governance.auditFindings],
      ['Critical Findings', reportMetrics.governance.criticalFindings],
      ['ESG Training Rate', `${reportMetrics.governance.esgTrainingRate}%`],
    ]
  },
]

const customFields = [
  'Total ESG Score', 'Carbon Emissions (Scope 1)', 'Carbon Emissions (Scope 2)', 'Carbon Emissions (Scope 3)',
  'Renewable Energy %', 'Employee Count', 'Volunteering Hours', 'Diversity Score',
  'Board Independence', 'Compliance Rate', 'Training Completion', 'CSR Activities',
]

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Report Library')
  const [search, setSearch] = useState('')
  const [selectedReport, setSelectedReport] = useState(null)
  const [selectedFields, setSelectedFields] = useState(['Total ESG Score', 'Carbon Emissions (Scope 1)', 'Compliance Rate'])

  const toggleField = (field) => {
    setSelectedFields(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    )
  }

  return (
    <PageContainer
      title="Reports"
      description="ESG reports, data exports and custom report builder"
      breadcrumbs={[{ label: 'Reports' }]}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" size="sm"><Download size={13} /> Export All</Button>
          <Button variant="primary" size="sm"><Plus size={13} /> New Report</Button>
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

      {/* REPORT LIBRARY */}
      {activeTab === 'Report Library' && (
        <div className="space-y-4">
          <SearchBar value={search} onChange={setSearch} placeholder="Search reports..." />
          <DataTable
            columns={[
              { key: 'id', label: 'ID', width: 80 },
              { key: 'title', label: 'Report Title', sortable: true },
              { key: 'type', label: 'Type', render: v => (
                <Badge variant={v === 'Environmental' ? 'green' : v === 'Social' ? 'blue' : v === 'Governance' ? 'purple' : 'gray'}>{v}</Badge>
              )},
              { key: 'period', label: 'Period' },
              { key: 'status', label: 'Status', render: v => <Badge variant={getStatusColor(v)} dot>{v}</Badge> },
              { key: 'createdBy', label: 'Created By' },
              { key: 'createdAt', label: 'Date', render: v => formatDate(v) },
              { key: 'size', label: 'Size' },
              { key: 'id', label: '', render: (_, row) => (
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => setSelectedReport(row)}><Eye size={13} /></Button>
                  <Button size="sm" variant="ghost"><Download size={13} /></Button>
                </div>
              )},
            ]}
            data={reportsList.filter(r => r.title.toLowerCase().includes(search.toLowerCase()))}
          />
        </div>
      )}

      {/* ESG SUMMARY */}
      {activeTab === 'ESG Summary' && (
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm"><Download size={13} /> PDF</Button>
            <Button variant="secondary" size="sm"><Download size={13} /> Excel</Button>
            <Button variant="secondary" size="sm"><Download size={13} /> CSV</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {metricGroups.map(({ icon: Icon, label, color, metrics }) => (
              <Card key={label}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
                    <Icon size={14} />
                  </div>
                  <span className="text-sm font-semibold text-textPrimary">{label} Metrics</span>
                </div>
                <div className="space-y-2.5">
                  {metrics.map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center text-xs border-b border-slate-200 pb-2 last:border-0">
                      <span className="text-textSecondary">{k}</span>
                      <span className="font-semibold text-textPrimary">{v}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <Card padding={false}>
            <div className="px-5 pt-5 pb-3 border-b border-slate-200">
              <CardTitle>ESG Score Trend — FY 2024</CardTitle>
              <CardDescription>Full year performance trajectory</CardDescription>
            </div>
            <div className="p-5" style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={esgTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[55, 95]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="total" name="Total ESG" stroke="#16A34A" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="environmental" name="Environmental" stroke="#22C55E" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                  <Line type="monotone" dataKey="social" name="Social" stroke="#3B82F6" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                  <Line type="monotone" dataKey="governance" name="Governance" stroke="#8B5CF6" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* ENVIRONMENTAL / SOCIAL / GOVERNANCE — shared metric display */}
      {['Environmental', 'Social', 'Governance'].includes(activeTab) && (
        <div className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm"><Download size={13} /> PDF</Button>
            <Button variant="secondary" size="sm"><Download size={13} /> Excel</Button>
          </div>
          {metricGroups.filter(g => g.label === activeTab).map(({ icon: Icon, label, color, metrics }) => (
            <Card key={label}>
              <div className="flex items-center gap-2 mb-5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon size={15} />
                </div>
                <div>
                  <CardTitle>{label} Report</CardTitle>
                  <CardDescription>Reporting period: Q3 2024</CardDescription>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {metrics.map(([k, v]) => (
                  <div key={k} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-[10px] text-textSecondary uppercase tracking-wide mb-1">{k}</p>
                    <p className="text-base font-bold text-textPrimary">{v}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* CUSTOM BUILDER */}
      {activeTab === 'Custom Builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-1">
            <CardTitle className="mb-1">Select Metrics</CardTitle>
            <CardDescription className="mb-4">Choose data points to include in your report</CardDescription>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {customFields.map(field => (
                <label key={field} className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 p-2 rounded-md transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(field)}
                    onChange={() => toggleField(field)}
                    className="w-3.5 h-3.5 rounded accent-primary-600"
                  />
                  <span className="text-xs text-textPrimary">{field}</span>
                </label>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle>Report Preview</CardTitle>
                <CardDescription>{selectedFields.length} metrics selected</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm"><Download size={13} /> PDF</Button>
                <Button variant="secondary" size="sm"><Download size={13} /> CSV</Button>
                <Button variant="primary" size="sm">Generate Report</Button>
              </div>
            </div>
            {selectedFields.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-textSecondary">
                <BarChart3 size={32} className="mb-3 opacity-40" />
                <p className="text-sm">Select metrics to preview your report</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {selectedFields.map((field, i) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-slate-50 rounded-lg p-3 border border-slate-200"
                  >
                    <p className="text-[10px] text-textSecondary uppercase tracking-wide mb-1">{field}</p>
                    <p className="text-sm font-bold text-textPrimary">
                      {field.includes('%') ? `${Math.floor(Math.random() * 30 + 70)}%` :
                       field.includes('Score') ? `${Math.floor(Math.random() * 20 + 75)}/100` :
                       field.includes('Emissions') ? `${Math.floor(Math.random() * 600 + 200)} tCO₂e` :
                       Math.floor(Math.random() * 900 + 100)}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Report Detail Modal */}
      <Modal open={!!selectedReport} onClose={() => setSelectedReport(null)} title="Report Details" size="sm">
        {selectedReport && (
          <div className="space-y-3">
            <Badge variant={getStatusColor(selectedReport.status)} dot>{selectedReport.status}</Badge>
            {[
              ['Title', selectedReport.title],
              ['Type', selectedReport.type],
              ['Period', selectedReport.period],
              ['Created By', selectedReport.createdBy],
              ['Created At', formatDate(selectedReport.createdAt)],
              ['File Size', selectedReport.size],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm border-b border-slate-200 pb-2">
                <span className="text-textSecondary">{k}</span>
                <span className="font-medium text-textPrimary">{v}</span>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="primary" className="flex-1"><Download size={13} /> Download PDF</Button>
              <Button variant="secondary"><Download size={13} /> Excel</Button>
            </div>
          </div>
        )}
      </Modal>
    </PageContainer>
  )
}
