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
  type: 'gauge' | 'vertical_tank' | 'bar' | 'numeric_card' | 'time_series';
  linked_metric_id: string;
  unit: string;
  display_min?: number;
  display_max?: number;
  show_today_max?: boolean;
  aggregation?: string;
  aggregation_for_today_max?: string;
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