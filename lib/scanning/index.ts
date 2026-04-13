/**
 * Scanning module - Real and demo scanning capabilities
 */

// Demo scanning (for marketing/demo purposes)
export * from './issueCatalog';
export * from './runDemoScan';

// Real scanning (production monitoring)
export * from './crawlSite';
export * from './browserChecks';
export * from './pageSpeedIntegration';
export * from './integrations';
export * from './issueBuilder';
export * from './runRealScan';

// Reports
export * from './reportBuilder';
