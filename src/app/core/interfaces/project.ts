export interface Project {
  id?: string;
  project_name: string;
  repo_url: string;
  client: string;
  developers: string;
  ci: false;
  cd: false;
  frontend_tecnology: string;
  backend_tecnology: string;
  databases: string;
  errors_count: number;
  warning_count: number;
  deploy_count: number;
  percentage_completion: string;
  report_nc: number;
  status: string;
}
