/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  learningProgress: number; // Percentage
  savedBlogs: string[]; // Blog IDs
  savedTools: string[]; // Saved tool IDs
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  likes: number;
  bookmarks: number;
  tags: string[];
  slug: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation: string;
  category: 'SSC' | 'Aptitude' | 'English';
}

export interface AnalyticsSummary {
  totalUsers: number;
  totalBlogs: number;
  totalApiRequests: number;
  totalToolsUsed: number;
  requestsByDay: { day: string; count: number }[];
  popularTools: { name: string; count: number }[];
}

export interface AIResponse {
  success: boolean;
  text?: string;
  error?: string;
}
