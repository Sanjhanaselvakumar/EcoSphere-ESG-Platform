/**
 * EcoSphere API Service
 * Connects to Django REST Framework backend at http://127.0.0.1:8000/api/
 * Falls back to static mock data if backend is unavailable.
 */

const BASE_URL = 'http://127.0.0.1:8000/api'

// ── Core fetch wrapper ────────────────────────────────────────────────────────

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }
  const response = await fetch(url, config)
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }))
    throw new Error(error.detail || `HTTP ${response.status}`)
  }
  return response.json()
}

export const api = {
  get:    (endpoint)       => request(endpoint),
  post:   (endpoint, data) => request(endpoint, { method: 'POST',  body: JSON.stringify(data) }),
  put:    (endpoint, data) => request(endpoint, { method: 'PUT',   body: JSON.stringify(data) }),
  patch:  (endpoint, data) => request(endpoint, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (endpoint)       => request(endpoint, { method: 'DELETE' }),
}

// ── Health Check ─────────────────────────────────────────────────────────────

export async function checkHealth() {
  try {
    const data = await api.get('/health/')
    return { online: true, message: data.message }
  } catch {
    return { online: false, message: 'Backend offline — using static data' }
  }
}

// ── Departments ───────────────────────────────────────────────────────────────

export async function fetchDepartments() {
  return api.get('/v1/users/departments/')
}

// ── Employees ─────────────────────────────────────────────────────────────────

export async function fetchEmployees() {
  return api.get('/v1/users/employees/')
}

// ── Environmental ─────────────────────────────────────────────────────────────

export async function fetchEmissionFactors() {
  return api.get('/v1/environmental/emission-factors/')
}

export async function fetchEnvironmentalGoals() {
  return api.get('/v1/environmental/goals/')
}

export async function fetchCarbonTransactions() {
  return api.get('/v1/environmental/carbon-transactions/')
}

export async function createCarbonTransaction(data) {
  return api.post('/v1/environmental/carbon-transactions/', data)
}

export async function updateCarbonTransaction(id, data) {
  return api.patch(`/v1/environmental/carbon-transactions/${id}/`, data)
}

// ── Social / Gamification ─────────────────────────────────────────────────────

export async function fetchCategories() {
  return api.get('/v1/social/categories/')
}

export async function fetchBadges() {
  return api.get('/v1/social/badges/')
}

export async function fetchRewards() {
  return api.get('/v1/social/rewards/')
}

export async function fetchChallenges() {
  return api.get('/v1/social/challenges/')
}

export async function fetchCsrActivities() {
  return api.get('/v1/social/csr-activities/')
}

export async function fetchChallengeParticipations() {
  return api.get('/v1/social/challenge-participations/')
}

export async function joinChallenge(data) {
  return api.post('/v1/social/challenge-participations/', data)
}

export async function updateChallengeParticipation(id, data) {
  return api.patch(`/v1/social/challenge-participations/${id}/`, data)
}

export async function fetchCsrParticipations() {
  return api.get('/v1/social/csr-participations/')
}

// ── Governance ────────────────────────────────────────────────────────────────

export async function fetchAudits() {
  return api.get('/v1/governance/audits/')
}

export async function fetchComplianceIssues() {
  return api.get('/v1/governance/compliance-issues/')
}

export async function createComplianceIssue(data) {
  return api.post('/v1/governance/compliance-issues/', data)
}

export async function updateComplianceIssue(id, data) {
  return api.patch(`/v1/governance/compliance-issues/${id}/`, data)
}

export async function fetchPolicies() {
  return api.get('/v1/governance/policies/')
}

export async function fetchPolicyAcknowledgements() {
  return api.get('/v1/governance/policy-acknowledgements/')
}

export async function createPolicyAcknowledgement(data) {
  return api.post('/v1/governance/policy-acknowledgements/', data)
}

// ── Reports ───────────────────────────────────────────────────────────────────

export async function fetchDepartmentScores() {
  return api.get('/v1/reports/department-scores/')
}

export async function fetchProductProfiles() {
  return api.get('/v1/reports/product-profiles/')
}
