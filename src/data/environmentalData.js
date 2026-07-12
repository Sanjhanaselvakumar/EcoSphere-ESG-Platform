export const emissionFactors = [
  { id: 'EF001', name: 'Natural Gas Combustion', category: 'Scope 1', factor: 2.204, unit: 'kgCO₂e/m³', source: 'IPCC 2021', status: 'Active' },
  { id: 'EF002', name: 'Grid Electricity — US Average', category: 'Scope 2', factor: 0.386, unit: 'kgCO₂e/kWh', source: 'EPA 2023', status: 'Active' },
  { id: 'EF003', name: 'Diesel Fuel (Road)', category: 'Scope 1', factor: 2.688, unit: 'kgCO₂e/L', source: 'DEFRA 2023', status: 'Active' },
  { id: 'EF004', name: 'Air Travel (Economy)', category: 'Scope 3', factor: 0.158, unit: 'kgCO₂e/km', source: 'ICAO 2022', status: 'Active' },
  { id: 'EF005', name: 'Refrigerant R-134a', category: 'Scope 1', factor: 1430, unit: 'kgCO₂e/kg', source: 'IPCC AR5', status: 'Active' },
  { id: 'EF006', name: 'Paper Production', category: 'Scope 3', factor: 1.084, unit: 'kgCO₂e/kg', source: 'Ecoinvent 3.8', status: 'Active' },
  { id: 'EF007', name: 'Waste to Landfill', category: 'Scope 3', factor: 0.587, unit: 'kgCO₂e/kg', source: 'DEFRA 2023', status: 'Review' },
  { id: 'EF008', name: 'Gasoline Fuel', category: 'Scope 1', factor: 2.312, unit: 'kgCO₂e/L', source: 'EPA 2023', status: 'Active' },
  { id: 'EF009', name: 'Steam Purchased', category: 'Scope 2', factor: 0.227, unit: 'kgCO₂e/kWh', source: 'IEA 2023', status: 'Active' },
  { id: 'EF010', name: 'Rail Travel', category: 'Scope 3', factor: 0.041, unit: 'kgCO₂e/km', source: 'DEFRA 2023', status: 'Active' },
]

export const carbonTransactions = [
  { id: 'CT001', date: '2024-08-01', department: 'Operations', activity: 'Natural Gas Combustion', quantity: 1200, unit: 'm³', emissions: 2644.8, scope: 'Scope 1', status: 'Verified' },
  { id: 'CT002', date: '2024-08-02', department: 'IT', activity: 'Grid Electricity', quantity: 4500, unit: 'kWh', emissions: 1737.0, scope: 'Scope 2', status: 'Verified' },
  { id: 'CT003', date: '2024-08-03', department: 'Logistics', activity: 'Diesel Fuel', quantity: 800, unit: 'L', emissions: 2150.4, scope: 'Scope 1', status: 'Pending' },
  { id: 'CT004', date: '2024-08-04', department: 'HR', activity: 'Air Travel', quantity: 3200, unit: 'km', emissions: 505.6, scope: 'Scope 3', status: 'Verified' },
  { id: 'CT005', date: '2024-08-05', department: 'Marketing', activity: 'Paper Usage', quantity: 150, unit: 'kg', emissions: 162.6, scope: 'Scope 3', status: 'Draft' },
  { id: 'CT006', date: '2024-08-06', department: 'Operations', activity: 'Refrigerant Leak', quantity: 2.5, unit: 'kg', emissions: 3575.0, scope: 'Scope 1', status: 'Verified' },
  { id: 'CT007', date: '2024-08-07', department: 'Finance', activity: 'Rail Travel', quantity: 1800, unit: 'km', emissions: 73.8, scope: 'Scope 3', status: 'Verified' },
  { id: 'CT008', date: '2024-08-08', department: 'R&D', activity: 'Grid Electricity', quantity: 2200, unit: 'kWh', emissions: 849.2, scope: 'Scope 2', status: 'Pending' },
]

export const sustainabilityGoals = [
  { id: 'SG001', title: 'Net Zero by 2035', category: 'Carbon', target: 0, current: 1284, unit: 'tCO₂e', progress: 62, status: 'On Track', deadline: '2035-12-31' },
  { id: 'SG002', title: '80% Renewable Energy', category: 'Energy', target: 80, current: 68, unit: '%', progress: 85, status: 'On Track', deadline: '2026-12-31' },
  { id: 'SG003', title: 'Zero Waste to Landfill', category: 'Waste', target: 0, current: 12, unit: 'tonnes/month', progress: 40, status: 'At Risk', deadline: '2027-06-30' },
  { id: 'SG004', title: '50% Water Reduction', category: 'Water', target: 50, current: 31, unit: '%', progress: 62, status: 'On Track', deadline: '2028-12-31' },
  { id: 'SG005', title: 'Carbon Neutral Supply Chain', category: 'Scope 3', target: 0, current: 480, unit: 'tCO₂e', progress: 35, status: 'Needs Attention', deadline: '2030-12-31' },
  { id: 'SG006', title: '100% LED Lighting', category: 'Energy', target: 100, current: 87, unit: '%', progress: 87, status: 'On Track', deadline: '2024-12-31' },
]

export const productESGProfiles = [
  { id: 'PR001', product: 'EcoWidget Pro', category: 'Electronics', carbonFootprint: 12.4, recyclability: 85, renewableContent: 42, esgScore: 78, certification: 'ISO 14001' },
  { id: 'PR002', product: 'GreenPack Box', category: 'Packaging', carbonFootprint: 3.2, recyclability: 98, renewableContent: 95, esgScore: 94, certification: 'FSC Certified' },
  { id: 'PR003', product: 'CleanSolv Liquid', category: 'Chemicals', carbonFootprint: 8.7, recyclability: 60, renewableContent: 28, esgScore: 61, certification: 'Ecolabel' },
  { id: 'PR004', product: 'ThermoPanel X1', category: 'Construction', carbonFootprint: 24.6, recyclability: 72, renewableContent: 18, esgScore: 55, certification: 'None' },
  { id: 'PR005', product: 'AquaFilter Plus', category: 'Water Systems', carbonFootprint: 6.1, recyclability: 80, renewableContent: 35, esgScore: 72, certification: 'WaterSense' },
]
