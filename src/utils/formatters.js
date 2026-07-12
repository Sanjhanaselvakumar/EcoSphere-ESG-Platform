export const formatNumber = (num) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return String(num)
}

export const formatCurrency = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)

export const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export const formatPercent = (val, decimals = 1) => `${Number(val).toFixed(decimals)}%`

export const getSeverityColor = (severity) => {
  const map = { High: 'red', Medium: 'yellow', Low: 'green', Critical: 'red' }
  return map[severity] || 'gray'
}

export const getStatusColor = (status) => {
  const map = {
    Active: 'green', Completed: 'blue', Upcoming: 'yellow',
    Open: 'red', Resolved: 'green', 'In Progress': 'yellow',
    Published: 'green', Draft: 'gray', 'Under Review': 'yellow',
    Verified: 'green', Pending: 'yellow', Scheduled: 'blue',
    'On Track': 'green', 'At Risk': 'red', 'Needs Attention': 'yellow',
  }
  return map[status] || 'gray'
}

export const getRarityColor = (rarity) => {
  const map = { Common: 'gray', Rare: 'blue', Epic: 'purple', Legendary: 'yellow' }
  return map[rarity] || 'gray'
}
