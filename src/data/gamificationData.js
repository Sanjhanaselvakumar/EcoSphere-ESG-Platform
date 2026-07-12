export const challenges = [
  { id: 'CH001', title: 'Zero-Waste Week', category: 'Environmental', xp: 500, participants: 234, status: 'Active', deadline: '2024-08-31', difficulty: 'Medium', description: 'Eliminate all single-use plastics from your workspace for one week.', progress: 68, icon: 'Leaf' },
  { id: 'CH002', title: 'Cycle to Work Month', category: 'Environmental', xp: 750, participants: 87, status: 'Active', deadline: '2024-08-31', difficulty: 'Hard', description: 'Commute by bicycle or public transport every working day this month.', progress: 45, icon: 'Bike' },
  { id: 'CH003', title: 'ESG Policy Champion', category: 'Governance', xp: 300, participants: 512, status: 'Active', deadline: '2024-09-15', difficulty: 'Easy', description: 'Complete all ESG policy acknowledgements and pass the governance quiz.', progress: 82, icon: 'Shield' },
  { id: 'CH004', title: 'Community Volunteer 10h', category: 'Social', xp: 600, participants: 128, status: 'Active', deadline: '2024-10-31', difficulty: 'Medium', description: 'Log 10 hours of approved community volunteering activities.', progress: 38, icon: 'Heart' },
  { id: 'CH005', title: 'Energy Audit Hero', category: 'Environmental', xp: 400, participants: 43, status: 'Active', deadline: '2024-09-30', difficulty: 'Medium', description: 'Complete an energy audit of your department and submit a reduction plan.', progress: 22, icon: 'Zap' },
  { id: 'CH006', title: 'Diversity Ally Training', category: 'Social', xp: 350, participants: 680, status: 'Completed', deadline: '2024-07-31', difficulty: 'Easy', description: 'Complete the 2-hour diversity, equity and inclusion online training.', progress: 100, icon: 'Users' },
]

export const badges = [
  { id: 'B001', name: 'Green Pioneer', description: 'First to complete 5 environmental challenges', icon: '🌱', rarity: 'Rare', holders: 12 },
  { id: 'B002', name: 'Carbon Crusher', description: 'Reduced personal carbon footprint by 20%', icon: '💨', rarity: 'Epic', holders: 5 },
  { id: 'B003', name: 'Policy Master', description: 'Acknowledged all governance policies on time', icon: '📋', rarity: 'Common', holders: 842 },
  { id: 'B004', name: 'Community Champion', description: 'Logged 50+ volunteering hours', icon: '🤝', rarity: 'Rare', holders: 28 },
  { id: 'B005', name: 'ESG Evangelist', description: 'Referred 5 colleagues to ESG challenges', icon: '⭐', rarity: 'Common', holders: 156 },
  { id: 'B006', name: 'Net Zero Warrior', description: 'Part of the first net-zero department', icon: '🌍', rarity: 'Legendary', holders: 2 },
  { id: 'B007', name: 'Data Champion', description: 'Submitted accurate ESG data 12 months in a row', icon: '📊', rarity: 'Epic', holders: 8 },
  { id: 'B008', name: 'Innovation Spark', description: 'Submitted sustainability improvement idea adopted company-wide', icon: '💡', rarity: 'Legendary', holders: 3 },
]

export const leaderboard = [
  { rank: 1, name: 'Sarah Chen', department: 'Operations', xp: 4820, level: 12, badges: 8, avatar: 'SC', change: 0 },
  { rank: 2, name: 'Mark Johnson', department: 'HR', xp: 4650, level: 11, badges: 7, avatar: 'MJ', change: 1 },
  { rank: 3, name: 'Priya Patel', department: 'R&D', xp: 4420, level: 11, badges: 9, avatar: 'PP', change: -1 },
  { rank: 4, name: 'David Kim', department: 'IT', xp: 4100, level: 10, badges: 6, avatar: 'DK', change: 2 },
  { rank: 5, name: 'Emma Wilson', department: 'Marketing', xp: 3980, level: 10, badges: 5, avatar: 'EW', change: -1 },
  { rank: 6, name: 'Tom Rivera', department: 'Finance', xp: 3720, level: 9, badges: 6, avatar: 'TR', change: 0 },
  { rank: 7, name: 'Lisa Park', department: 'Logistics', xp: 3510, level: 9, badges: 4, avatar: 'LP', change: 3 },
  { rank: 8, name: 'Ben Carter', department: 'Operations', xp: 3290, level: 8, badges: 5, avatar: 'BC', change: -2 },
  { rank: 9, name: 'Anna Lee', department: 'IT', xp: 3100, level: 8, badges: 4, avatar: 'AL', change: 1 },
  { rank: 10, name: 'John Smith', department: 'Logistics', xp: 2950, level: 7, badges: 3, avatar: 'JS', change: -1 },
]

export const departmentRankings = [
  { rank: 1, department: 'HR', score: 91, change: 2, xp: 28400 },
  { rank: 2, department: 'R&D', score: 88, change: 0, xp: 26100 },
  { rank: 3, department: 'Operations', score: 84, change: -1, xp: 24800 },
  { rank: 4, department: 'IT', score: 82, change: 1, xp: 23500 },
  { rank: 5, department: 'Finance', score: 79, change: 0, xp: 21200 },
  { rank: 6, department: 'Marketing', score: 76, change: 2, xp: 19800 },
  { rank: 7, department: 'Logistics', score: 71, change: -2, xp: 17400 },
]

export const rewards = [
  { id: 'R001', title: 'Extra Day Off', description: 'One paid day off for personal use', cost: 2000, category: 'Time Off', available: true, redeemed: 23 },
  { id: 'R002', title: 'Green Restaurant Voucher', description: '$50 voucher at eco-certified restaurants', cost: 500, category: 'Food & Dining', available: true, redeemed: 87 },
  { id: 'R003', title: 'EV Charging Priority', description: 'Priority EV charging spot for 1 month', cost: 800, category: 'Transport', available: true, redeemed: 41 },
  { id: 'R004', title: 'Sustainability Conference Ticket', description: 'Full access to ESG summit conference', cost: 3000, category: 'Learning', available: true, redeemed: 8 },
  { id: 'R005', title: 'Plant a Tree in Your Name', description: 'Company plants 10 trees in your name', cost: 200, category: 'Environmental', available: true, redeemed: 156 },
  { id: 'R006', title: 'Home Energy Audit', description: 'Professional home energy efficiency audit', cost: 1500, category: 'Home', available: false, redeemed: 12 },
]
