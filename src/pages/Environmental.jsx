import { useState } from 'react'
import { Plus, Download, Eye, Leaf, Target, TrendingDown, RefreshCw } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import PageContainer from '@/components/layouts/PageContainer'
import Card, { CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/ui/DataTable'
import SearchBar from '@/components/ui/SearchBar'
import FilterBar from '@/components/ui/FilterBar'
import Modal from '@/components/ui/Modal'
import ProgressRing from '@/components/ui/ProgressRing'
import { TableSkeleton } from '@/components/ui/LoadingSkeleton'

import { useApi } from '@/hooks/useApi'
import {
  fetchEmissionFactors,
  fetchCarbonTransactions,
  fetchEnvironmentalGoals,
  fetchProductProfiles,
} from '@/services/api'

import {
  emissionFactors as staticEmissionFactors,
  carbonTransactions as staticCarbonTransactions,
  sustainabilityGoals as staticGoals,
  productESGProfiles as staticProducts,
} from '@/data/environmentalData'
import { carbonTrendData, departmentEmissionsData, energyConsumptionData } from '@/data/chartData'
import { getStatusColor, formatDate } from '@/utils/formatters'

const tabs = ['Dashboard', 'Emission Factors', 'Carbon Transactions', 'Sustainability Goals', 'Product ESG']

// Normalise backend emission factor shape → frontend shape
function normaliseEmissionFactors(items) {
  return items.map(f => ({
    id: f.factor_id ?? f.id,
    name: f.source_name ?? f.name,
    category: f.category ?? 'Scope 1',
    factor: f.emission_factor ?? f.factor,
    unit: f.unit,
    source: f.description ?? '—',
    status: 'Active',
  }))
}

// Normalise backend carbon transaction shape
function normaliseCarbonTx(items) {
  return items.map(t => ({
    id: t.transaction_id ?? t.id,
    date: t.transaction_date ?? t.date,
    department: t.department ?? '—',
    activity: t.activity_name ?? t.activity,
    quantity: t.activity_amount ?? t.quantity,
    unit: t.unit ?? '—',
    emissions: parseFloat(t.carbon_emission ?? t.emissions ?? 0),
    scope: t.scope ?? 'Scope 1',
    status: t.status ?? 'Verified',
  }))
}

// Normalise backend goals
function normaliseGoals(items) {
  return items.map(g => ({
    id: g.goal_id ?? g.id,
    title: g.goal_name ?? g.title,
    category: g.category ?? 'General',
    target: parseFloat(g.target_value ?? g.target ?? 0),
    current: parseFloat(g.current_value ?? g.current ?? 0),
    unit: g.unit ?? '',
    progress: g.progress ?? 50,
    status: g.status ?? 'Active',
    deadline: g.target_date ?? g.deadline,
  }))
}

// Normalise product profiles
function normaliseProducts(items) {
  return items.map(p => ({
    id: p.product_id ?? p.id,
    product: p.product_name ?? p.product,
    category: p.category ?? '—',
    carbonFootprint: parseFloat(p.carbon_footprint ?? p.carbonFootprint ?? 0),
    recyclability: parseFloat(p.recyclability ?? 0),
    renewableContent: parseFloat(p.renewable_content ?? p.renewableContent ?? 0),
    esgScore: parseFloat(p.environmental_score ?? p.esgScore ?? 0),
    certification: p.certification ?? 'None',
  }))
}

export default function Environmental() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [scopeFilter, setScopeFilter] = useState('all')
  const [selectedFactor, setSelectedFactor] = useState(null)

  const { data: rawFactors,  loading: loadingFactors,  isLive: factorsLive,  refetch: refetchFactors  } = useApi(fetchEmissionFactors,  staticEmissionFactors)
  const { data: rawTx,       loading: loadingTx,       isLive: txLive,       refetch: refetchTx       } = useApi(fetchCarbonTransactions, staticCarbonTransactions)
  const { data: rawGoals,    loading: loadingGoals,    isLive: goalsLive,    refetch: refetchGoals    } = useApi(fetchEnvironmentalGoals,  staticGoals)
  const { data: rawProducts, loading: loadingProducts, isLive: productsLive, refetch: refetchProducts } = useApi(fetchProductProfiles,     staticProducts)

  const emissionFactors = factorsLive  ? normaliseEmissionFactors(rawFactors)  : rawFactors
  const carbonTx        = txLive       ? normaliseCarbonTx(rawTx)              : rawTx
  const goals           = goalsLive    ? normaliseGoals(rawGoals)               : rawGoals
  const products        = productsLive ? normaliseProducts(rawProducts)         : rawProducts

  return (
    <PageContainer
      title="Environmental"
      description="Track emissions, energy, water and sustainability goals"
      breadcrumbs={[{ label: 'Environmental' }]}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" size="sm"><Download size={13} /> Export</Button>
          <Button variant="primary" size="sm"><Plus size={13} /> Add Entry</Button>
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

      {/* DASHBOARD TAB */}
      {activeTab === 'Dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Emissions', value: '1,284 tCO₂e', icon: Leaf,        color: 'bg-green-50 text-green-700' },
              { label: 'Scope 1',         value: '315 tCO₂e',   icon: TrendingDown, color: 'bg-blue-50 text-blue-700' },
              { label: 'Scope 2',         value: '240 tCO₂e',   icon: TrendingDown, color: 'bg-purple-50 text-purple-700' },
              { label: 'Scope 3',         value: '729 tCO₂e',   icon: TrendingDown, color: 'bg-amber-50 text-amber-700' },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label}>
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg mb-3 ${color}`}><Icon size={15} /></div>
                <p className="text-xl font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card padding={false}>
              <div className="px-5 pt-5 pb-3 border-b border-slate-200">
                <CardTitle>Carbon Emission Trend</CardTitle>
                <CardDescription>Monthly tCO₂e — all scopes</CardDescription>
              </div>
              <div className="p-5" style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={carbonTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="scope1" name="Scope 1" stroke="#16A34A" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="scope2" name="Scope 2" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="scope3" name="Scope 3" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card padding={false}>
              <div className="px-5 pt-5 pb-3 border-b border-slate-200">
                <CardTitle>Energy Mix</CardTitle>
                <CardDescription>Renewable vs non-renewable (%)</CardDescription>
              </div>
              <div className="p-5" style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={energyConsumptionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="renew" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Area type="monotone" dataKey="renewable" name="Renewable %" stroke="#16A34A" strokeWidth={2} fill="url(#renew)" />
                    <Area type="monotone" dataKey="nonRenewable" name="Non-Renewable %" stroke="#CBD5E1" strokeWidth={2} fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card padding={false}>
            <div className="px-5 pt-5 pb-3 border-b border-slate-200">
              <CardTitle>Department Emissions vs Targets</CardTitle>
              <CardDescription>Actual vs reduction targets (tCO₂e)</CardDescription>
            </div>
            <div className="p-5" style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentEmissionsData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="emissions" name="Actual" fill="#16A34A" radius={[4, 4, 0, 0]} maxBarSize={32} />
                  <Bar dataKey="target"    name="Target" fill="#E2E8F0" radius={[4, 4, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* EMISSION FACTORS */}
      {activeTab === 'Emission Factors' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <SearchBar value={search} onChange={setSearch} placeholder="Search emission factors..." />
            <FilterBar activeFilter={scopeFilter} onChange={setScopeFilter} filters={[
              { value: 'all', label: 'All' },
              { value: 'Scope 1', label: 'Scope 1' },
              { value: 'Scope 2', label: 'Scope 2' },
              { value: 'Scope 3', label: 'Scope 3' },
            ]} />
            <Button size="sm" variant="ghost" onClick={refetchFactors}><RefreshCw size={13} /></Button>
          </div>
          {loadingFactors ? <TableSkeleton rows={6} cols={5} /> : (
            <DataTable
              columns={[
                { key: 'id',     label: 'ID',     width: 80 },
                { key: 'name',   label: 'Factor Name', sortable: true },
                { key: 'category', label: 'Scope', render: v => <Badge variant={v === 'Scope 1' ? 'green' : v === 'Scope 2' ? 'blue' : 'purple'}>{v}</Badge> },
                { key: 'factor', label: 'Factor', sortable: true, render: v => <span className="font-mono text-xs">{v}</span> },
                { key: 'unit',   label: 'Unit' },
                { key: 'source', label: 'Source' },
                { key: 'status', label: 'Status', render: v => <Badge variant={getStatusColor(v)} dot>{v}</Badge> },
                { key: 'id', label: '', render: (_, row) => (
                  <Button size="sm" variant="ghost" onClick={() => setSelectedFactor(row)}><Eye size={13} /></Button>
                )},
              ]}
              data={emissionFactors.filter(f =>
                (scopeFilter === 'all' || f.category === scopeFilter) &&
                (f.name?.toLowerCase().includes(search.toLowerCase()) || String(f.id).includes(search))
              )}
              pageSize={8}
            />
          )}
          {factorsLive && <p className="text-xs text-green-600">● Live data from backend</p>}
        </div>
      )}

      {/* CARBON TRANSACTIONS */}
      {activeTab === 'Carbon Transactions' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <SearchBar value={search} onChange={setSearch} placeholder="Search transactions..." />
            <FilterBar activeFilter={scopeFilter} onChange={setScopeFilter} filters={[
              { value: 'all', label: 'All' },
              { value: 'Scope 1', label: 'Scope 1' },
              { value: 'Scope 2', label: 'Scope 2' },
              { value: 'Scope 3', label: 'Scope 3' },
            ]} />
            <Button size="sm" variant="ghost" onClick={refetchTx}><RefreshCw size={13} /></Button>
          </div>
          {loadingTx ? <TableSkeleton rows={6} cols={6} /> : (
            <DataTable
              columns={[
                { key: 'id',         label: 'ID',     width: 80 },
                { key: 'date',       label: 'Date',   sortable: true, render: v => v ? formatDate(v) : '—' },
                { key: 'department', label: 'Department' },
                { key: 'activity',   label: 'Activity' },
                { key: 'quantity',   label: 'Qty', render: (v, r) => `${v ?? '—'} ${r.unit ?? ''}` },
                { key: 'emissions',  label: 'Emissions (kgCO₂e)', sortable: true, render: v => Number(v).toFixed(1) },
                { key: 'scope',      label: 'Scope', render: v => <Badge variant={v === 'Scope 1' ? 'green' : v === 'Scope 2' ? 'blue' : 'purple'}>{v}</Badge> },
                { key: 'status',     label: 'Status', render: v => <Badge variant={getStatusColor(v)} dot>{v}</Badge> },
              ]}
              data={carbonTx.filter(t =>
                (scopeFilter === 'all' || t.scope === scopeFilter) &&
                ((t.activity ?? '').toLowerCase().includes(search.toLowerCase()) ||
                 (t.department ?? '').toLowerCase().includes(search.toLowerCase()))
              )}
            />
          )}
          {txLive && <p className="text-xs text-green-600">● Live data from backend</p>}
        </div>
      )}

      {/* SUSTAINABILITY GOALS */}
      {activeTab === 'Sustainability Goals' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" variant="ghost" onClick={refetchGoals}><RefreshCw size={13} /> Refresh</Button>
          </div>
          {loadingGoals ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({length:6}).map((_,i)=><Card key={i} className="h-40 animate-pulse bg-slate-50" />)}</div> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goals.map(goal => (
                <Card key={goal.id} hover>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-sm font-semibold text-slate-900 truncate">{goal.title}</p>
                      <Badge variant={getStatusColor(goal.status)} dot className="mt-1">{goal.status}</Badge>
                    </div>
                    <ProgressRing value={goal.progress ?? 0} size={64} strokeWidth={6} color={
                      goal.status === 'On Track' || goal.status === 'Active' ? '#16A34A' :
                      goal.status === 'At Risk' ? '#EF4444' : '#F59E0B'
                    } />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wide">Category</p>
                      <p className="text-xs font-medium text-slate-900">{goal.category}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wide">Deadline</p>
                      <p className="text-xs font-medium text-slate-900">{goal.deadline ? formatDate(goal.deadline) : '—'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wide">Current</p>
                      <p className="text-xs font-medium text-slate-900">{goal.current} {goal.unit}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wide">Target</p>
                      <p className="text-xs font-medium text-slate-900">{goal.target} {goal.unit}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          {goalsLive && <p className="text-xs text-green-600">● Live data from backend</p>}
        </div>
      )}

      {/* PRODUCT ESG */}
      {activeTab === 'Product ESG' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" variant="ghost" onClick={refetchProducts}><RefreshCw size={13} /> Refresh</Button>
          </div>
          {loadingProducts ? <TableSkeleton rows={5} cols={6} /> : (
            <DataTable
              columns={[
                { key: 'id',              label: 'ID' },
                { key: 'product',         label: 'Product Name', sortable: true },
                { key: 'category',        label: 'Category' },
                { key: 'carbonFootprint', label: 'Carbon Footprint', sortable: true, render: v => `${v} kgCO₂e` },
                { key: 'recyclability',   label: 'Recyclability', render: v => (
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 rounded-full h-1.5">
                      <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${v}%` }} />
                    </div>
                    <span className="text-xs">{v}%</span>
                  </div>
                )},
                { key: 'esgScore', label: 'ESG Score', sortable: true, render: v => (
                  <span className={`font-semibold text-xs ${v >= 80 ? 'text-green-600' : v >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{v}</span>
                )},
                { key: 'certification', label: 'Certification', render: v => v !== 'None'
                  ? <Badge variant="green">{v}</Badge>
                  : <Badge variant="gray">None</Badge>
                },
              ]}
              data={products}
            />
          )}
          {productsLive && <p className="text-xs text-green-600">● Live data from backend</p>}
        </div>
      )}

      <Modal open={!!selectedFactor} onClose={() => setSelectedFactor(null)} title="Emission Factor Details" size="sm">
        {selectedFactor && (
          <div className="space-y-3">
            {Object.entries(selectedFactor).map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm border-b border-slate-200 pb-2">
                <span className="text-slate-500 capitalize">{k}</span>
                <span className="font-medium text-slate-900">{String(v)}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </PageContainer>
  )
}
