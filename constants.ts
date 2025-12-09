import { DashboardConfig } from './types';

export const DASHBOARD_CONFIG: DashboardConfig = {
  "dashboard_id": "coromandel_nandesari_unit_head",
  "dashboard_title": "Nandesari Unit Head – SSP / GSSP PI Vision Replica",
  "description": "Config + ranges for generating synthetic time-series data.",
  "layout_groups": [
    {
      "group_id": "stack_parameters",
      "title": "Stack Parameters",
      "description": "Stack emission parameters for SSP unit.",
      "widgets": [
        { "widget_id": "stack_ssp_pm", "title": "SSP PM (OCMS-1)", "type": "gauge", "linked_metric_id": "OCMS-1 SSP PM", "unit": "mg/Nm3", "display_min": 0, "display_max": 180, "show_today_max": true },
        { "widget_id": "stack_ssp_hf", "title": "SSP HF (OCMS-2)", "type": "gauge", "linked_metric_id": "OCMS-2 SSP HF", "unit": "mg/Nm3", "display_min": 0, "display_max": 25, "show_today_max": true },
        { "widget_id": "stack_rockdryer_pm", "title": "Rock Dryer PM (OCMS-3)", "type": "gauge", "linked_metric_id": "OCMS-3 SSP Rock dryer PM", "unit": "mg/Nm3", "display_min": 0, "display_max": 60, "show_today_max": true },
        { "widget_id": "stack_etp_flow", "title": "ETP Flow (OCMS-4)", "type": "gauge", "linked_metric_id": "OCMS-4 SSP ETP flow", "unit": "m3/h", "display_min": 0, "display_max": 5, "show_today_max": true }
      ]
    },
    {
      "group_id": "sulphuric_acid_stock_level_mt",
      "title": "Sulphuric Acid Stock (%)",
      "description": "Tank wise sulphuric acid stock level.",
      "widgets": [
        { "widget_id": "acid_tank1_mt", "title": "Tank-1", "type": "vertical_tank", "linked_metric_id": "Sulphuric Acid Tank-1 Level Transmitter", "unit": "%", "display_min": 0, "display_max": 1 },
        { "widget_id": "acid_tank2_mt", "title": "Tank-2", "type": "vertical_tank", "linked_metric_id": "Sulphuric Acid Tank-2 Level Transmitter", "unit": "%", "display_min": 0, "display_max": 1 },
        { "widget_id": "acid_tank3_mt", "title": "Tank-3", "type": "vertical_tank", "linked_metric_id": "Sulphuric Acid Tank-3 Level Transmitter", "unit": "%", "display_min": 0, "display_max": 1 },
        { "widget_id": "acid_tank4_mt", "title": "Tank-4", "type": "vertical_tank", "linked_metric_id": "Sulphuric Acid Tank-4 Level Transmitter", "unit": "%", "display_min": 0, "display_max": 1 }
      ]
    },
    {
      "group_id": "equipment_status",
      "title": "Equipment Run Status",
      "description": "Live running status of key machinery.",
      "widgets": [
        { "widget_id": "eq_ball_mill", "title": "Ball Mill", "type": "status_card", "linked_metric_id": "STATUS_BALL_MILL", "unit": "State" },
        { "widget_id": "eq_crusher", "title": "Crusher", "type": "status_card", "linked_metric_id": "STATUS_CRUSHER", "unit": "State" },
        { "widget_id": "eq_blower", "title": "Main Blower", "type": "status_card", "linked_metric_id": "STATUS_BLOWER", "unit": "State" },
        { "widget_id": "eq_conveyor", "title": "Feed Conveyor", "type": "status_card", "linked_metric_id": "STATUS_CONVEYOR", "unit": "State" }
      ]
    },
    {
      "group_id": "plant_throughput",
      "title": "Throughput (MT/h)",
      "description": "Production bars.",
      "widgets": [
        { "widget_id": "throughput_ssp", "title": "SSP", "type": "bar", "linked_metric_id": "Mill 100 HP Load-1", "unit": "MT/h", "display_min": 0, "display_max": 200 },
        { "widget_id": "throughput_ussp", "title": "USSP", "type": "bar", "linked_metric_id": "Mill 100 HP Load-2", "unit": "MT/h", "display_min": 0, "display_max": 200 },
        { "widget_id": "throughput_gssp1", "title": "GSSP-1", "type": "bar", "linked_metric_id": "Mill 100 HP Load-3", "unit": "MT/h", "display_min": 0, "display_max": 200 }
      ]
    },
    {
      "group_id": "enhancer_and_process_parameters",
      "title": "Process Parameters",
      "description": "Flows and Temps.",
      "widgets": [
        { "widget_id": "product_temperature", "title": "Product Temp", "type": "numeric_card", "linked_metric_id": "Temperature Transmitter", "unit": "°C" },
        { "widget_id": "silica_water_flow", "title": "Silica Water Flow", "type": "numeric_card", "linked_metric_id": "Silica Flow Meter", "unit": "m3/h" },
        { "widget_id": "acid_flow", "title": "Sulphuric Acid Flow", "type": "time_series", "linked_metric_id": "Acid Flow Meter", "unit": "m3/h" },
        { "widget_id": "water_flow", "title": "Water Flow", "type": "numeric_card", "linked_metric_id": "Water Flow Meter", "unit": "m3/h" },
        { "widget_id": "ipa_belt", "title": "Rock Phosphate", "type": "numeric_card", "linked_metric_id": "IPA Belt Weigh Feeding Signal", "unit": "TPH" }
      ]
    },
    {
      "group_id": "quality_control",
      "title": "Quality Control",
      "description": "Lab analysis and inline sensors.",
      "widgets": [
        { "widget_id": "qc_p2o5", "title": "P2O5 Content", "type": "gauge", "linked_metric_id": "QC_P2O5", "unit": "%", "display_min": 14, "display_max": 20 },
        { "widget_id": "qc_moisture", "title": "Moisture", "type": "gauge", "linked_metric_id": "QC_MOISTURE", "unit": "%", "display_min": 0, "display_max": 10 },
        { "widget_id": "qc_granule", "title": "Granule Size >4mm", "type": "bar", "linked_metric_id": "QC_GRANULE_SIZE", "unit": "%", "display_min": 0, "display_max": 5 }
      ]
    },
    {
      "group_id": "electrical_and_mech_feedbacks",
      "title": "Electrical Feedbacks",
      "description": "Motor currents.",
      "widgets": [
        { "widget_id": "ssp_fan_speed", "title": "SSP Fan Speed", "type": "gauge", "linked_metric_id": "SSP Fan Speed Feedback", "unit": "RPM", "display_min": 0, "display_max": 1200 },
        { "widget_id": "den_current", "title": "DEN Current", "type": "time_series", "linked_metric_id": "DEN Current feedback", "unit": "A" },
        { "widget_id": "mixer_current", "title": "Mixer Current", "type": "time_series", "linked_metric_id": "Mixer Current feedback", "unit": "A" },
        { "widget_id": "elevator_current", "title": "Elevator Current", "type": "time_series", "linked_metric_id": "Elevator Current feedback", "unit": "A" }
      ]
    },
    {
      "group_id": "maintenance_stats",
      "title": "Maintenance & Downtime",
      "description": "Breakdown analysis.",
      "widgets": [
        { "widget_id": "maint_downtime", "title": "Planned vs Unplanned", "type": "donut", "linked_metric_id": "MAINT_PLANNED_VS_UNPLANNED", "unit": "hrs" },
        { "widget_id": "maint_mtbf", "title": "MTBF", "type": "numeric_card", "linked_metric_id": "MAINT_MTBF", "unit": "hrs" },
        { "widget_id": "maint_breakdowns", "title": "Breakdowns Today", "type": "numeric_card", "linked_metric_id": "MAINT_BREAKDOWNS", "unit": "cnt" }
      ]
    },
    {
      "group_id": "energy_monitoring",
      "title": "Energy Monitoring",
      "description": "Power consumption metrics.",
      "widgets": [
        { "widget_id": "energy_kw", "title": "Active Power", "type": "gauge", "linked_metric_id": "ENERGY_KW", "unit": "kW", "display_min": 0, "display_max": 500 },
        { "widget_id": "energy_kwh", "title": "Daily Consumption", "type": "numeric_card", "linked_metric_id": "ENERGY_KWH_DAY", "unit": "kWh" },
        { "widget_id": "energy_pf", "title": "Power Factor", "type": "numeric_card", "linked_metric_id": "ENERGY_PF", "unit": "PF" }
      ]
    },
    {
      "group_id": "mill_pressures_and_loads",
      "title": "Mill Pressures",
      "description": "Duct line pressures.",
      "widgets": [
        { "widget_id": "mill_1st_duct_pressure", "title": "Mill 1st Duct", "type": "time_series", "linked_metric_id": "Mill 1st Duct line pressure", "unit": "mmWC" },
        { "widget_id": "mill_2nd_duct_pressure", "title": "Mill 2nd Duct", "type": "time_series", "linked_metric_id": "Mill 2nd Duct line pressure", "unit": "mmWC" }
      ]
    },
    {
      "group_id": "flow_totalisers_and_manual_entries",
      "title": "Flow Totalisers",
      "description": "Totalisers.",
      "widgets": [
        { "widget_id": "acid_totaliser", "title": "ACID TOTAL", "type": "numeric_card", "linked_metric_id": "ACID_FT_TOTALIZER", "unit": "m3" },
        { "widget_id": "water_totaliser", "title": "WATER TOTAL", "type": "numeric_card", "linked_metric_id": "WTR_FT_TOTALIZER", "unit": "m3" },
        { "widget_id": "silica_totaliser", "title": "SILICA TOTAL", "type": "numeric_card", "linked_metric_id": "SILICA_FT_TOTALIZER", "unit": "m3" }
      ]
    }
  ],
  "metrics": {
    "Acid Flow Meter": { "role": "process_value", "value_range": { "min": 0.16, "max": 5.57 }, "unit": "m3/h", "decimals": 2 },
    "Water Flow Meter": { "role": "process_value", "value_range": { "min": 0.32, "max": 3.97 }, "unit": "m3/h", "decimals": 2 },
    "Silica Flow Meter": { "role": "process_value", "value_range": { "min": 0.16, "max": 4.21 }, "unit": "m3/h", "decimals": 2 },
    "Temperature Transmitter": { "role": "temperature", "value_range": { "min": 33.1, "max": 129.0 }, "unit": "°C", "decimals": 1 },
    "Mill 1st Duct line pressure": { "role": "pressure", "value_range": { "min": 18.1, "max": 145.4 }, "unit": "mmWC", "decimals": 1 },
    "Mill 2nd Duct line pressure": { "role": "pressure", "value_range": { "min": 1.15, "max": 53.1 }, "unit": "mmWC", "decimals": 1 },
    "OCMS-2 SSP HF": { "role": "stack_parameter", "value_range": { "min": 0.07, "max": 23.9 }, "unit": "mg/Nm3", "decimals": 2 },
    "Sulphuric Acid Tank-1 Level Transmitter": { "role": "tank_level", "value_range": { "min": 0.2, "max": 0.92 }, "unit": "frac", "decimals": 2 },
    "Sulphuric Acid Tank-2 Level Transmitter": { "role": "tank_level", "value_range": { "min": 0.04, "max": 0.46 }, "unit": "frac", "decimals": 2 },
    "Sulphuric Acid Tank-3 Level Transmitter": { "role": "tank_level", "value_range": { "min": 0.06, "max": 0.34 }, "unit": "frac", "decimals": 2 },
    "Sulphuric Acid Tank-4 Level Transmitter": { "role": "tank_level", "value_range": { "min": 0.36, "max": 0.38 }, "unit": "frac", "decimals": 2 },
    "SSP Fan Speed Feedback": { "role": "speed", "value_range": { "min": 0.1, "max": 1135.5 }, "unit": "RPM", "decimals": 0 },
    "OCMS-1 SSP PM": { "role": "stack_parameter", "value_range": { "min": 2.2, "max": 174.3 }, "unit": "mg/Nm3", "decimals": 2 },
    "OCMS-3 SSP Rock dryer PM": { "role": "stack_parameter", "value_range": { "min": 4.09, "max": 54.8 }, "unit": "mg/Nm3", "decimals": 2 },
    "OCMS-4 SSP ETP flow": { "role": "flow", "value_range": { "min": 0.24, "max": 4.0 }, "unit": "m3/h", "decimals": 2 },
    "Mill 100 HP Load-1": { "role": "motor_load", "value_range": { "min": 52.4, "max": 191.4 }, "unit": "A", "decimals": 1 },
    "Mill 100 HP Load-2": { "role": "motor_load", "value_range": { "min": 56.8, "max": 200.0 }, "unit": "A", "decimals": 1 },
    "Mill 100 HP Load-3": { "role": "motor_load", "value_range": { "min": 175.6, "max": 200.0 }, "unit": "A", "decimals": 1 },
    "DEN Current feedback": { "role": "motor_current", "value_range": { "min": 0.01, "max": 5.95 }, "unit": "A", "decimals": 2 },
    "Mixer Current feedback": { "role": "motor_current", "value_range": { "min": 0.09, "max": 33.9 }, "unit": "A", "decimals": 2 },
    "Elevator Current feedback": { "role": "motor_current", "value_range": { "min": 0.01, "max": 56.1 }, "unit": "A", "decimals": 2 },
    "IPA Belt Weigh Feeding Signal": { "role": "throughput", "value_range": { "min": 0.004, "max": 12.1 }, "unit": "TPH", "decimals": 2 },
    "ACID_FT_TOTALIZER": { "role": "totaliser", "value_range": { "min": 3752.2, "max": 3812.2 }, "unit": "m3", "decimals": 0 },
    "WTR_FT_TOTALIZER": { "role": "totaliser", "value_range": { "min": 3000.4, "max": 3040.0 }, "unit": "m3", "decimals": 0 },
    "SILICA_FT_TOTALIZER": { "role": "totaliser", "value_range": { "min": 3758.3, "max": 3801.1 }, "unit": "m3", "decimals": 0 },
    "MANUAL_ACID_TOTALISER": { "role": "totaliser", "value_range": { "min": 3561.0, "max": 4369.7 }, "unit": "MT", "decimals": 0 },
    
    "STATUS_BALL_MILL": { "role": "status", "value_range": { "min": 1, "max": 1 }, "unit": "bool", "decimals": 0 },
    "STATUS_CRUSHER": { "role": "status", "value_range": { "min": 1, "max": 1 }, "unit": "bool", "decimals": 0 },
    "STATUS_BLOWER": { "role": "status", "value_range": { "min": 1, "max": 1 }, "unit": "bool", "decimals": 0 },
    "STATUS_CONVEYOR": { "role": "status", "value_range": { "min": 1, "max": 1 }, "unit": "bool", "decimals": 0 },
    
    "QC_P2O5": { "role": "quality", "value_range": { "min": 14.5, "max": 18.0 }, "unit": "%", "decimals": 2 },
    "QC_MOISTURE": { "role": "quality", "value_range": { "min": 2.5, "max": 5.5 }, "unit": "%", "decimals": 2 },
    "QC_GRANULE_SIZE": { "role": "quality", "value_range": { "min": 0.5, "max": 2.5 }, "unit": "%", "decimals": 2 },
    
    "ENERGY_KW": { "role": "energy", "value_range": { "min": 250, "max": 450 }, "unit": "kW", "decimals": 0 },
    "ENERGY_KWH_DAY": { "role": "energy", "value_range": { "min": 1200, "max": 8000 }, "unit": "kWh", "decimals": 0 },
    "ENERGY_PF": { "role": "energy", "value_range": { "min": 0.85, "max": 0.99 }, "unit": "PF", "decimals": 2 },
    
    "MAINT_PLANNED_VS_UNPLANNED": { "role": "maintenance", "value_range": { "min": 0, "max": 10 }, "unit": "h", "decimals": 1 },
    "MAINT_MTBF": { "role": "maintenance", "value_range": { "min": 120, "max": 400 }, "unit": "h", "decimals": 0 },
    "MAINT_BREAKDOWNS": { "role": "maintenance", "value_range": { "min": 0, "max": 3 }, "unit": "cnt", "decimals": 0 }
  }
};