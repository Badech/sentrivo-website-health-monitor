# Sentrivo API Documentation

Complete API reference for the Sentrivo backend.

## Base URL

```
/api
```

## Authentication

⚠️ **Current Status:** Authentication not yet implemented. All endpoints currently use the demo workspace.

**Coming Soon:** JWT-based authentication with workspace-based authorization.

---

## API Routes

### Sites

#### `GET /api/sites`
Get all sites for the current workspace.

**Response:**
```json
{
  "sites": [
    {
      "id": "string",
      "name": "string",
      "domain": "string",
      "healthScore": number,
      "lastScanAt": "datetime",
      "_count": {
        "scans": number,
        "issues": number
      }
    }
  ]
}
```

#### `POST /api/sites`
Create a new site.

**Request Body:**
```json
{
  "name": "ACME Plumbing",
  "domain": "acmeplumbing.com",
  "industry": "Home Services", // optional
  "scanFrequency": "DAILY" // DAILY | WEEKLY | MANUAL, optional
}
```

**Response:** `201 Created`
```json
{
  "site": { /* site object */ }
}
```

#### `GET /api/sites/[siteId]`
Get site details.

**Response:**
```json
{
  "site": {
    "id": "string",
    "name": "string",
    "domain": "string",
    "industry": "string",
    "healthScore": number,
    "leadRiskScore": number,
    "lastScanAt": "datetime",
    "workspace": {
      "id": "string",
      "name": "string",
      "slug": "string"
    },
    "_count": {
      "scans": number,
      "issues": number
    }
  }
}
```

#### `PATCH /api/sites/[siteId]`
Update site settings.

**Request Body:**
```json
{
  "name": "string", // optional
  "industry": "string", // optional
  "scanFrequency": "DAILY" | "WEEKLY" | "MANUAL", // optional
  "status": "ACTIVE" | "PAUSED" | "ARCHIVED" // optional
}
```

#### `GET /api/sites/[siteId]/dashboard`
Get complete dashboard summary for a site.

**Response:**
```json
{
  "site": {
    "id": "string",
    "name": "string",
    "domain": "string",
    "healthScore": number,
    "leadRiskScore": number,
    "lastScanAt": "datetime"
  },
  "workspace": {
    "id": "string",
    "name": "string"
  },
  "latestScan": {
    "id": "string",
    "completedAt": "datetime",
    "pagesScanned": number,
    "checksRun": number,
    "healthScore": number,
    "criticalCount": number,
    "warningCount": number,
    "healthyCount": number
  },
  "issueCounts": {
    "critical": number,
    "warning": number,
    "total": number,
    "open": number
  },
  "recentIssues": [
    {
      "id": "string",
      "title": "string",
      "severity": "CRITICAL" | "WARNING",
      "category": "string",
      "page": "string",
      "firstSeenAt": "datetime",
      "impactSummary": "string"
    }
  ],
  "weeklyTrend": [
    {
      "day": "2024-01-15",
      "critical": number,
      "warning": number,
      "healthy": number,
      "total": number
    }
  ]
}
```

---

### Scans

#### `GET /api/sites/[siteId]/scans`
Get scan history for a site.

**Query Parameters:**
- `limit` (optional, default: 50)
- `offset` (optional, default: 0)
- `source` (optional: DEMO | LIVE)

**Response:**
```json
{
  "scans": [
    {
      "id": "string",
      "status": "COMPLETED" | "QUEUED" | "RUNNING" | "FAILED",
      "source": "DEMO" | "LIVE",
      "pagesScanned": number,
      "checksRun": number,
      "healthScore": number,
      "criticalCount": number,
      "warningCount": number,
      "createdAt": "datetime",
      "completedAt": "datetime",
      "site": {
        "id": "string",
        "name": "string",
        "domain": "string"
      },
      "_count": {
        "issues": number,
        "pages": number
      }
    }
  ],
  "total": number
}
```

#### `POST /api/sites/[siteId]/scans`
Create a new scan.

**Request Body:**
```json
{
  "source": "DEMO" | "LIVE" // optional, default: LIVE
}
```

**Response:** `201 Created`
```json
{
  "scan": { /* scan object */ }
}
```

#### `GET /api/scans/[scanId]`
Get detailed scan results including all issues and pages.

**Response:**
```json
{
  "scan": {
    "id": "string",
    "status": "string",
    "pagesScanned": number,
    "checksRun": number,
    "healthScore": number,
    "criticalCount": number,
    "warningCount": number,
    "completedAt": "datetime",
    "site": { /* site object */ },
    "pages": [ /* array of ScanPage */ ],
    "issues": [ /* array of Issue */ ]
  }
}
```

#### `GET /api/scans/[scanId]/issues`
Get all issues for a specific scan.

**Response:**
```json
{
  "issues": [ /* array of Issue objects */ ],
  "total": number
}
```

---

### Issues

#### `GET /api/issues`
Get filtered issues across sites.

**Query Parameters:**
- `siteId` (optional)
- `scanId` (optional)
- `severity` (optional: CRITICAL | WARNING | HEALTHY)
- `status` (optional: OPEN | ACKNOWLEDGED | RESOLVED)
- `category` (optional)
- `limit` (optional, default: 100)
- `offset` (optional, default: 0)

**Response:**
```json
{
  "issues": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "severity": "CRITICAL" | "WARNING" | "HEALTHY",
      "status": "OPEN" | "ACKNOWLEDGED" | "RESOLVED",
      "category": "string",
      "impactSummary": "string",
      "evidenceSummary": "string",
      "recommendation": "string",
      "firstSeenAt": "datetime",
      "lastSeenAt": "datetime",
      "resolvedAt": "datetime",
      "site": { /* site object */ },
      "scan": { /* scan object */ },
      "scanPage": { /* page object */ }
    }
  ],
  "total": number
}
```

#### `GET /api/issues/[issueId]`
Get issue details.

**Response:**
```json
{
  "issue": { /* complete issue object with relations */ }
}
```

#### `PATCH /api/issues/[issueId]`
Update issue status.

**Request Body:**
```json
{
  "status": "OPEN" | "ACKNOWLEDGED" | "RESOLVED"
}
```

**Response:**
```json
{
  "issue": { /* updated issue object */ }
}
```

---

### Reports

#### `GET /api/reports/[reportId]`
Get report details.

**Response:**
```json
{
  "report": {
    "id": "string",
    "kind": "SAMPLE" | "SCAN_SUMMARY" | "WEEKLY" | "MONTHLY",
    "title": "string",
    "executiveSummary": "string",
    "generatedAt": "datetime",
    "data": { /* report data object */ },
    "site": { /* site object */ },
    "scan": { /* scan object */ }
  }
}
```

#### `POST /api/reports/generate`
Generate a report from a scan.

**Request Body:**
```json
{
  "scanId": "string"
}
```

**Response:** `201 Created`
```json
{
  "report": { /* generated report object */ }
}
```

---

### Settings

#### `GET /api/settings/workspace`
Get workspace and settings.

**Response:**
```json
{
  "workspace": {
    "id": "string",
    "name": "string",
    "slug": "string",
    "plan": "FREE" | "BETA" | "AGENCY" | "ENTERPRISE"
  },
  "settings": {
    "alertEmail": "string",
    "slackWebhookUrl": "string",
    "defaultScanFrequency": "DAILY" | "WEEKLY" | "MANUAL",
    "timezone": "string"
  }
}
```

#### `PATCH /api/settings/workspace`
Update workspace settings.

**Request Body:**
```json
{
  "alertEmail": "string", // optional
  "slackWebhookUrl": "string", // optional
  "defaultScanFrequency": "DAILY" | "WEEKLY" | "MANUAL", // optional
  "timezone": "string" // optional
}
```

---

## Error Responses

All endpoints return consistent error responses:

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": [ /* Zod validation errors */ ]
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to perform operation"
}
```

---

## Data Access Layer

All API routes use centralized data access functions from `lib/data/*`:

- **`lib/data/workspace.ts`** - Workspace queries
- **`lib/data/sites.ts`** - Site CRUD operations
- **`lib/data/scans.ts`** - Scan management
- **`lib/data/issues.ts`** - Issue filtering and updates
- **`lib/data/reports.ts`** - Report generation
- **`lib/data/dashboard.ts`** - Dashboard aggregations

This ensures:
- Consistent query patterns
- Easy testing and mocking
- Single source of truth for data logic
- Clean separation from API layer

---

## Implementation Status

✅ **Completed:**
- All 11 API route handlers
- Zod validation on all POST/PATCH endpoints
- Error handling
- Type-safe responses
- Data access layer

⏳ **Pending:**
- Authentication middleware
- Rate limiting
- Caching layer
- Real scan execution (Phase 7)

---

## Next Steps

1. Connect UI components to these APIs
2. Build scan engine adapter
3. Add authentication
4. Implement rate limiting
5. Add response caching where appropriate
