export const policies = [
  { id: 'POL001', title: 'Environmental Management Policy', category: 'Environmental', version: '3.2', status: 'Active', lastReviewed: '2024-03-15', nextReview: '2025-03-15', owner: 'Sarah Chen', acknowledgements: 1420, total: 1482 },
  { id: 'POL002', title: 'Code of Business Conduct', category: 'Ethics', version: '5.1', status: 'Active', lastReviewed: '2024-01-10', nextReview: '2025-01-10', owner: 'Mark Johnson', acknowledgements: 1470, total: 1482 },
  { id: 'POL003', title: 'Anti-Bribery & Corruption Policy', category: 'Compliance', version: '2.4', status: 'Active', lastReviewed: '2024-02-20', nextReview: '2025-02-20', owner: 'Legal Team', acknowledgements: 1460, total: 1482 },
  { id: 'POL004', title: 'Data Privacy Policy (GDPR)', category: 'Data', version: '4.0', status: 'Active', lastReviewed: '2024-05-01', nextReview: '2025-05-01', owner: 'DPO Office', acknowledgements: 1410, total: 1482 },
  { id: 'POL005', title: 'Supplier Code of Conduct', category: 'Supply Chain', version: '2.1', status: 'Under Review', lastReviewed: '2023-11-15', nextReview: '2024-11-15', owner: 'Procurement', acknowledgements: 980, total: 1482 },
  { id: 'POL006', title: 'Health & Safety Policy', category: 'Safety', version: '6.3', status: 'Active', lastReviewed: '2024-06-01', nextReview: '2025-06-01', owner: 'HSE Manager', acknowledgements: 1480, total: 1482 },
  { id: 'POL007', title: 'Whistleblower Protection Policy', category: 'Ethics', version: '1.5', status: 'Active', lastReviewed: '2024-04-12', nextReview: '2025-04-12', owner: 'HR Director', acknowledgements: 1390, total: 1482 },
]

export const audits = [
  { id: 'AUD001', title: 'ISO 14001 Surveillance Audit', type: 'External', scope: 'Environmental Management System', status: 'Completed', date: '2024-06-15', auditor: 'Bureau Veritas', findings: 2, criticalFindings: 0, score: 94 },
  { id: 'AUD002', title: 'SOX Compliance Audit', type: 'Internal', scope: 'Financial Controls', status: 'Completed', date: '2024-05-20', auditor: 'Internal Audit Team', findings: 5, criticalFindings: 1, score: 87 },
  { id: 'AUD003', title: 'GDPR Data Processing Audit', type: 'External', scope: 'Data Privacy Controls', status: 'In Progress', date: '2024-08-10', auditor: 'PwC', findings: 0, criticalFindings: 0, score: null },
  { id: 'AUD004', title: 'Supply Chain Ethics Audit', type: 'Third-party', scope: 'Supplier Compliance', status: 'Scheduled', date: '2024-09-15', auditor: 'EcoVadis', findings: 0, criticalFindings: 0, score: null },
  { id: 'AUD005', title: 'Health & Safety Inspection', type: 'Internal', scope: 'All Facilities', status: 'Completed', date: '2024-07-08', auditor: 'HSE Manager', findings: 8, criticalFindings: 0, score: 91 },
  { id: 'AUD006', title: 'GHG Emission Verification', type: 'External', scope: 'Scope 1, 2, 3 Emissions', status: 'Completed', date: '2024-04-30', auditor: 'DNV GL', findings: 1, criticalFindings: 0, score: 96 },
]

export const complianceIssues = [
  { id: 'CI001', title: 'Missing Environmental Impact Assessment', category: 'Environmental', severity: 'High', status: 'Open', department: 'Operations', assignee: 'John Smith', createdDate: '2024-07-15', dueDate: '2024-08-30', regulation: 'ISO 14001' },
  { id: 'CI002', title: 'Incomplete Supplier Screening Records', category: 'Supply Chain', severity: 'Medium', status: 'In Progress', department: 'Procurement', assignee: 'Lisa Park', createdDate: '2024-07-20', dueDate: '2024-09-15', regulation: 'UK Modern Slavery Act' },
  { id: 'CI003', title: 'Overdue Safety Training Certification', category: 'Safety', severity: 'High', status: 'Open', department: 'Logistics', assignee: 'Mike Torres', createdDate: '2024-07-22', dueDate: '2024-08-15', regulation: 'OSHA 1910' },
  { id: 'CI004', title: 'Data Retention Policy Gap', category: 'Data Privacy', severity: 'Medium', status: 'In Progress', department: 'IT', assignee: 'Anna Lee', createdDate: '2024-06-30', dueDate: '2024-09-30', regulation: 'GDPR Art. 17' },
  { id: 'CI005', title: 'GHG Reporting Discrepancy', category: 'Environmental', severity: 'Low', status: 'Resolved', department: 'R&D', assignee: 'Ben Carter', createdDate: '2024-06-15', dueDate: '2024-07-31', regulation: 'GHG Protocol' },
  { id: 'CI006', title: 'Board Diversity Threshold Not Met', category: 'Governance', severity: 'Medium', status: 'Open', department: 'Executive', assignee: 'CEO Office', createdDate: '2024-07-01', dueDate: '2024-12-31', regulation: 'NASDAQ Rule 5605' },
  { id: 'CI007', title: 'Conflict Minerals Declaration Pending', category: 'Supply Chain', severity: 'High', status: 'Open', department: 'Procurement', assignee: 'Lisa Park', createdDate: '2024-07-28', dueDate: '2024-09-01', regulation: 'Dodd-Frank 1502' },
]
