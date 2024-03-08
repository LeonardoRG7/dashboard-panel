export interface Server {
  percentaje_time: number;
  deploys: number;
  time: TimeData[];
}

export interface TimeData {
  time: string;
  value: number;
}
