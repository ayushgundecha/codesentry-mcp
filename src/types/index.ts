/**
 * Type definitions for CodeSentry MCP Server
 */

export interface AnalysisConfig {
  enableSecurity: boolean;
  enablePerformance: boolean;
  enableQuality: boolean;
  enableDocumentation: boolean;
  maxFileSize: number; // in bytes
  supportedExtensions: string[];
  ignorePatterns: string[];
}

export interface SecurityIssue {
  id: string;
  type: SecurityIssueType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  file: string;
  line: number;
  column?: number;
  title: string;
  description: string;
  suggestion: string;
  fix?: string;
  cwe?: string; // Common Weakness Enumeration
  owasp?: string; // OWASP Top 10 reference
}

export type SecurityIssueType = 
  | 'SQL_INJECTION'
  | 'XSS'
  | 'CSRF'
  | 'INSECURE_CRYPTO'
  | 'PATH_TRAVERSAL'
  | 'COMMAND_INJECTION'
  | 'AUTHENTICATION_BYPASS'
  | 'AUTHORIZATION_FLAW'
  | 'SENSITIVE_DATA_EXPOSURE'
  | 'DEPENDENCY_VULNERABILITY'
  | 'HARDCODED_SECRET';

export interface PerformanceIssue {
  id: string;
  type: PerformanceIssueType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  file: string;
  line: number;
  column?: number;
  title: string;
  description: string;
  suggestion: string;
  complexity?: string; // e.g., "O(n²)"
  estimatedImpact?: string; // e.g., "90% improvement"
}

export type PerformanceIssueType = 
  | 'ALGORITHM_COMPLEXITY'
  | 'MEMORY_LEAK'
  | 'BLOCKING_OPERATION'
  | 'INEFFICIENT_QUERY'
  | 'LARGE_OBJECT'
  | 'REGEX_PERFORMANCE'
  | 'LOOP_OPTIMIZATION'
  | 'CACHING_OPPORTUNITY';

export interface QualityIssue {
  id: string;
  type: QualityIssueType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  file: string;
  line: number;
  column?: number;
  title: string;
  description: string;
  suggestion: string;
}

export type QualityIssueType = 
  | 'CODE_SMELL'
  | 'DUPLICATION'
  | 'COMPLEXITY'
  | 'NAMING_CONVENTION'
  | 'DEAD_CODE'
  | 'MAGIC_NUMBER'
  | 'LONG_METHOD'
  | 'LARGE_CLASS';

export interface DocumentationIssue {
  id: string;
  type: DocumentationIssueType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  file: string;
  line: number;
  title: string;
  description: string;
  suggestion: string;
}

export type DocumentationIssueType = 
  | 'MISSING_FUNCTION_DOC'
  | 'MISSING_CLASS_DOC'
  | 'MISSING_PARAM_DOC'
  | 'MISSING_RETURN_DOC'
  | 'OUTDATED_DOC'
  | 'MISSING_README'
  | 'MISSING_API_DOC';

export interface AnalysisReport {
  id: string;
  timestamp: Date;
  repository: string;
  branch: string;
  commit: string;
  files: string[];
  summary: AnalysisSummary;
  security: SecurityIssue[];
  performance: PerformanceIssue[];
  quality: QualityIssue[];
  documentation: DocumentationIssue[];
  metrics: CodeMetrics;
}

export interface AnalysisSummary {
  totalFiles: number;
  totalLines: number;
  securityIssues: number;
  performanceIssues: number;
  qualityIssues: number;
  documentationIssues: number;
  overallScore: number; // 0-100
}

export interface CodeMetrics {
  linesOfCode: number;
  cyclomaticComplexity: number;
  maintainabilityIndex: number;
  technicalDebt: string; // e.g., "2 hours"
  testCoverage?: number;
  duplicatedLines?: number;
}

export interface RepositoryInfo {
  name: string;
  path: string;
  branch: string;
  commit: string;
  url?: string;
  size: number;
  fileCount: number;
  languages: Record<string, number>; // language -> line count
}

export interface AIAnalysisOptions {
  provider: 'openai' | 'anthropic';
  model: string;
  maxTokens: number;
  temperature: number;
  includeContext: boolean;
}

export interface GitHubIntegration {
  token: string;
  owner: string;
  repo: string;
  enableComments: boolean;
  enableStatusChecks: boolean;
}