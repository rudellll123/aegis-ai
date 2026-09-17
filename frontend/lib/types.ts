export type Incident = {
  id: string;
  title: string;
  severity: string;
  date: string;
};

export type IncidentDetail = Incident & {
  date: string;
  description: string;
};

export type HealthStatus = {
  status: string;
  database: string;
};
