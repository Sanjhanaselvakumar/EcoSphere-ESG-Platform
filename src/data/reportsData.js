export const reportsList = [
  { id: 'RPT001', title: 'Q2 2024 ESG Summary Report', type: 'ESG Summary', period: 'Q2 2024', status: 'Published', createdBy: 'Sarah Chen', createdAt: '2024-07-15', size: '2.4 MB' },
  { id: 'RPT002', title: 'Annual Environmental Report 2023', type: 'Environmental', period: 'FY 2023', status: 'Published', createdBy: 'Mark Johnson', createdAt: '2024-02-28', size: '4.8 MB' },
  { id: 'RPT003', title: 'H1 2024 Social Impact Report', type: 'Social', period: 'H1 2024', status: 'Draft', createdBy: 'Priya Patel', createdAt: '2024-08-01', size: '1.9 MB' },
  { id: 'RPT004', title: 'Governance & Compliance Report Q2', type: 'Governance', period: 'Q2 2024', status: 'Under Review', createdBy: 'Legal Team', createdAt: '2024-07-20', size: '3.1 MB' },
  { id: 'RPT005', title: 'GHG Emissions Verification Report', type: 'Environmental', period: 'FY 2023', status: 'Published', createdBy: 'DNV GL', createdAt: '2024-05-10', size: '1.2 MB' },
  { id: 'RPT006', title: 'TCFD Disclosure 2024', type: 'ESG Summary', period: 'FY 2024', status: 'Draft', createdBy: 'CFO Office', createdAt: '2024-08-05', size: '5.6 MB' },
]

export const reportMetrics = {
  environmental: {
    totalEmissions: 5136,
    emissionsIntensity: 3.46,
    renewableEnergyShare: 68,
    wasteRecycledShare: 74,
    waterConsumption: 18400,
    scope1: 1580,
    scope2: 1424,
    scope3: 2132,
  },
  social: {
    totalEmployees: 1482,
    volunteeringHours: 3840,
    trainingHoursPerEmployee: 42,
    employeeEngagementScore: 82,
    diversityScore: 78,
    safetyIncidents: 4,
    communityInvestment: 245000,
  },
  governance: {
    boardIndependence: 73,
    womenOnBoard: 44,
    policiesActive: 24,
    complianceRate: 93,
    auditFindings: 16,
    criticalFindings: 1,
    esgTrainingRate: 91,
  },
}
