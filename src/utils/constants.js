export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

export const EXPERIENCE_LEVELS = ['Entry', 'Mid', 'Senior', 'Executive'];

export const APPLICATION_STATUS = {
  pending: 'Pending',
  reviewing: 'Reviewing',
  shortlisted: 'Shortlisted',
  rejected: 'Rejected',
  accepted: 'Accepted'
};

export const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewing: 'bg-blue-100 text-blue-800',
  shortlisted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  accepted: 'bg-purple-100 text-purple-800'
};