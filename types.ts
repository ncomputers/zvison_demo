export type Timeframe = '1H' | '8H' | '24H' | '7D' | '30D' | 'LIVE';

export interface ValueRange {
  min: number;
  max: number;
}

export interface MetricDefinition {
  role: string;
  value_range: ValueRange;
  unit: string;
  decimals: number;
}

export interface WidgetConfig {
  widget_id: string;
  title: string;
  type: 'gauge' | 'vertical_tank' | 'bar' | 'numeric_card' | 'time_series' | 'status_card' | 'donut';
  linked_metric_id: string;
  unit: string;
  display_min?: number;
  display_max?: number;
  show_today_max?: boolean;
}

export interface LayoutGroup {
  group_id: string;
  title: string;
  description: string;
  widgets: WidgetConfig[];
}

export interface DashboardConfig {
  dashboard_id: string;
  dashboard_title: string;
  description: string;
  layout_groups: LayoutGroup[];
  metrics: Record<string, MetricDefinition>;
}

export interface LiveData {
  [key: string]: number;
}

export interface HistoryPoint {
  value: number;
  timestamp: number;
}