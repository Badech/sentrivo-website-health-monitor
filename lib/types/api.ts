/**
 * API Type Definitions
 * Shared types for API requests and responses
 */

import { z } from 'zod';

// ============================================
// Request Schemas
// ============================================

export const CreateSiteSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  domain: z.string().min(1, 'Domain is required'),
  industry: z.string().optional(),
  scanFrequency: z.enum(['DAILY', 'WEEKLY', 'MANUAL']).optional(),
});

export const UpdateSiteSchema = z.object({
  name: z.string().min(1).optional(),
  industry: z.string().optional(),
  scanFrequency: z.enum(['DAILY', 'WEEKLY', 'MANUAL']).optional(),
  status: z.enum(['ACTIVE', 'PAUSED', 'ARCHIVED']).optional(),
});

export const CreateScanSchema = z.object({
  source: z.enum(['DEMO', 'LIVE']).optional(),
});

export const UpdateIssueSchema = z.object({
  status: z.enum(['OPEN', 'ACKNOWLEDGED', 'RESOLVED']),
});

export const GenerateReportSchema = z.object({
  scanId: z.string().min(1, 'Scan ID is required'),
});

export const UpdateWorkspaceSettingsSchema = z.object({
  alertEmail: z.string().email().optional().nullable(),
  slackWebhookUrl: z.string().url().optional().nullable(),
  defaultScanFrequency: z.enum(['DAILY', 'WEEKLY', 'MANUAL']).optional(),
  timezone: z.string().optional(),
});

// ============================================
// Response Types
// ============================================

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  details?: any;
}

export interface PaginatedResponse<T = any> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

// ============================================
// Error Types
// ============================================

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 400, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

// ============================================
// Type Inference from Schemas
// ============================================

export type CreateSiteInput = z.infer<typeof CreateSiteSchema>;
export type UpdateSiteInput = z.infer<typeof UpdateSiteSchema>;
export type CreateScanInput = z.infer<typeof CreateScanSchema>;
export type UpdateIssueInput = z.infer<typeof UpdateIssueSchema>;
export type GenerateReportInput = z.infer<typeof GenerateReportSchema>;
export type UpdateWorkspaceSettingsInput = z.infer<typeof UpdateWorkspaceSettingsSchema>;
