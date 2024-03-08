export interface DeliveryReport {
  porcentaje: string;
  cicle: string;
  top_projects: TopProject[];
  nc_state: NcState;
}

export interface TopProject {
  name: string;
  porcentaje: string;
  is_nc: boolean;
  is_delay: boolean;
  is_deliver: boolean;
}

export interface NcState {
  detected: number;
  process: number;
  solved: number;
}
