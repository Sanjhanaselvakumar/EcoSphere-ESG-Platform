import { useState } from 'react'
import { Plus, Edit2, Trash2, Save, Building2, Tag, Bell, Settings2, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import PageContainer from '@/components/layouts/PageContainer'
import Card, { CardTitle, CardDescription } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/ui/DataTable'
import Modal from '@/components/ui/Modal'
import { departments, categories } from '@/data/settingsData'

const tabs = ['General', 'Departments', 'Categories', 'Emission Config', 'Notifications']

const notifSettings = [
  { key: 'complianceAlerts', label: 'Compliance Alerts', desc: 'Notify when new compliance issues are raised', enabled: true },
  { key: 'policyUpdates', label: 'Policy Updates', desc: 'Notify when policies are published or updated', enabled: true },
  { key: 'challengeReminders', label: 'Challenge Reminders', desc: 'Weekly reminders for active challenges', enabled: true },
  { key: 'reportPublished', label: 'Report Published', desc: 'Notify when a new ESG report is available', enabled: false },
  { key: 'auditScheduled', label: 'Audit Scheduled', desc: 'Notify when an audit is scheduled for your dept', enabled: true },
  { key: 'goalMilestones', label: 'Goal Milestones', desc: 'Notify on sustainability goal progress milestones', enabled: false },
  { key: 'leaderboardUpdates', label: 'Leaderboard Updates', desc: 'Weekly leaderboard position changes', enabled: false },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General')
  const [notifications, setNotifications] = useState(notifSettings)
  const [addDeptOpen, setAddDeptOpen] = useState(false)
  const [generalSaved, setGeneralSaved] = useState(false)

  const [general, setGeneral] = useState({
    orgName: 'EcoSphere Corp',
    fiscalYearStart: 'January',
    baseYear: '2020',
    reportingFramework: 'GRI Standards',
    currency: 'USD',
    timezone: 'America/Los_Angeles',
  })

  const toggleNotif = (key) => {
    setNotifications(n => n.map(x => x.key === key ? { ...x, enabled: !x.enabled } : x))
  }

  const saveGeneral = () => {
    setGeneralSaved(true)
    setTimeout(() => setGeneralSaved(false), 2000)
  }

  return (
    <PageContainer
      title="Settings"
      description="Platform configuration, departments and preferences"
      breadcrumbs={[{ label: 'Settings' }]}
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

      {/* GENERAL */}
      {activeTab === 'General' && (
        <div className="max-w-2xl space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-5">
              <Globe size={16} className="text-slate-500" />
              <CardTitle>Organization Settings</CardTitle>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'orgName', label: 'Organization Name', type: 'text' },
                { key: 'fiscalYearStart', label: 'Fiscal Year Start', type: 'select', options: ['January', 'April', 'July', 'October'] },
                { key: 'baseYear', label: 'Baseline Year', type: 'select', options: ['2019', '2020', '2021', '2022'] },
                { key: 'reportingFramework', label: 'Reporting Framework', type: 'select', options: ['GRI Standards', 'SASB', 'TCFD', 'GHG Protocol'] },
                { key: 'currency', label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'JPY'] },
                { key: 'timezone', label: 'Timezone', type: 'select', options: ['America/Los_Angeles', 'America/New_York', 'Europe/London', 'Asia/Tokyo'] },
              ].map(({ key, label, type, options }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-900 mb-1.5">{label}</label>
                  {type === 'select' ? (
                    <select
                      value={general[key]}
                      onChange={e => setGeneral(g => ({ ...g, [key]: e.target.value }))}
                      className="input"
                    >
                      {options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={general[key]}
                      onChange={e => setGeneral(g => ({ ...g, [key]: e.target.value }))}
                      className="input"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-5">
              <Button variant="primary" size="md" onClick={saveGeneral}>
                <Save size={13} />
                {generalSaved ? 'Saved!' : 'Save Settings'}
              </Button>
              {generalSaved && <span className="text-xs text-green-600">✓ Changes saved</span>}
            </div>
          </Card>
        </div>
      )}

      {/* DEPARTMENTS */}
      {activeTab === 'Departments' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500">{departments.length} departments configured</p>
            <Button variant="primary" size="sm" onClick={() => setAddDeptOpen(true)}>
              <Plus size={13} /> Add Department
            </Button>
          </div>
          <DataTable
            columns={[
              { key: 'id', label: 'ID', width: 80 },
              { key: 'name', label: 'Department', sortable: true },
              { key: 'head', label: 'Department Head' },
              { key: 'headcount', label: 'Headcount', sortable: true },
              { key: 'esgScore', label: 'ESG Score', sortable: true, render: v => (
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-slate-100 rounded-full h-1.5">
                    <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${v}%` }} />
                  </div>
                  <span className="text-xs font-semibold">{v}</span>
                </div>
              )},
              { key: 'status', label: 'Status', render: v => <Badge variant="green" dot>{v}</Badge> },
              { key: 'id', label: '', render: () => (
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost"><Edit2 size={13} /></Button>
                  <Button size="sm" variant="ghost"><Trash2 size={13} className="text-red-400" /></Button>
                </div>
              )},
            ]}
            data={departments}
          />
        </div>
      )}

      {/* CATEGORIES */}
      {activeTab === 'Categories' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500">{categories.length} categories configured</p>
            <Button variant="primary" size="sm"><Plus size={13} /> Add Category</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map(cat => (
              <Card key={cat.id} hover>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-slate-900">{cat.name}</p>
                      {!cat.active && <Badge variant="gray">Inactive</Badge>}
                    </div>
                    <p className="text-xs text-slate-500">{cat.description}</p>
                    <Badge variant={cat.type === 'Environmental' ? 'green' : cat.type === 'Social' ? 'blue' : 'purple'} className="mt-2">
                      {cat.type}
                    </Badge>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button size="sm" variant="ghost"><Edit2 size={13} /></Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* EMISSION CONFIG */}
      {activeTab === 'Emission Config' && (
        <div className="max-w-2xl space-y-4">
          <Card>
            <CardTitle className="mb-1">Emission Calculation Settings</CardTitle>
            <CardDescription className="mb-5">Configure how GHG emissions are calculated and reported</CardDescription>
            <div className="space-y-4">
              {[
                { label: 'Calculation Methodology', options: ['GHG Protocol Corporate', 'ISO 14064', 'EPA Methods'] },
                { label: 'Emission Factor Source', options: ['IPCC AR6', 'IPCC AR5', 'EPA 2023', 'DEFRA 2023'] },
                { label: 'Reporting Unit', options: ['tCO₂e', 'kgCO₂e', 'MtCO₂e'] },
                { label: 'Global Warming Potential', options: ['AR6 (100-year)', 'AR5 (100-year)', 'AR5 (20-year)'] },
                { label: 'Boundary Method', options: ['Operational Control', 'Financial Control', 'Equity Share'] },
              ].map(({ label, options }) => (
                <div key={label} className="grid grid-cols-2 gap-3 items-center">
                  <label className="text-sm text-slate-900 font-medium">{label}</label>
                  <select className="input">
                    {options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <Button variant="primary" size="md" className="mt-5"><Save size={13} /> Save Configuration</Button>
          </Card>
        </div>
      )}

      {/* NOTIFICATIONS */}
      {activeTab === 'Notifications' && (
        <div className="max-w-2xl space-y-3">
          <Card>
            <CardTitle className="mb-1">Notification Preferences</CardTitle>
            <CardDescription className="mb-5">Manage which notifications you receive</CardDescription>
            <div className="space-y-0 divide-y divide-border">
              {notifications.map(n => (
                <div key={n.key} className="flex items-center justify-between py-3.5">
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-medium text-slate-900">{n.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleNotif(n.key)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${
                      n.enabled ? 'bg-primary-600' : 'bg-slate-200'
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${
                      n.enabled ? 'translate-x-4.5' : 'translate-x-0.5'
                    }`} style={{ transform: n.enabled ? 'translateX(18px)' : 'translateX(2px)' }} />
                  </button>
                </div>
              ))}
            </div>
            <Button variant="primary" size="md" className="mt-4"><Save size={13} /> Save Preferences</Button>
          </Card>
        </div>
      )}

      {/* Add Department Modal */}
      <Modal open={addDeptOpen} onClose={() => setAddDeptOpen(false)} title="Add Department" size="sm">
        <div className="space-y-4">
          {['Department Name', 'Department Head', 'Email'].map(label => (
            <div key={label}>
              <label className="block text-xs font-medium text-slate-900 mb-1.5">{label}</label>
              <input type="text" className="input" placeholder={label} />
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="primary" className="flex-1" onClick={() => setAddDeptOpen(false)}>Add Department</Button>
            <Button variant="secondary" onClick={() => setAddDeptOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  )
}
