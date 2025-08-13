import React, { useState } from 'react';
import { 
  BarChart3, 
  Thermometer, 
  Zap, 
  ChevronUp, 
  ChevronDown, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Maximize2, 
  Power, 
  Gauge, 
  Calendar, 
  Clock3, 
  Languages, 
  Snowflake, 
  Wind, 
  Settings,
  MessageCircle,
  Database,
  Bot,
  Eye,
  Calculator,
  Droplets,
  Sun
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Translation object
const translations = {
  en: {
    systemTitle: 'Chiller Plant Control System',
    plantOverview: 'Plant Overview',
    dataManagement: 'Data Management',
    aiAssistant: 'AI Assistant',
    detailedView: 'Detailed View',
    formulas: 'Formulas',
    systemStatus: 'System Status: AI Assistant Ready',
    plantCOP: 'Plant COP',
    coolingLoad: 'Cooling Load',
    power: 'Power (kW)',
    chilledWater: 'Chilled Water',
    condenserWater: 'Condenser Water',
    outdoorConditions: 'Outdoor Conditions',
    supply: 'Supply',
    return: 'Return',
    flow: 'Flow',
    dryBulb: 'Dry Bulb',
    humidity: 'Humidity',
    wetBulb: 'Wet Bulb',
    todaysCoolingLoadProfile: "Today's Cooling Load Profile",
    hourlyCOPPerformance: 'Hourly COP Performance',
    peakLoad: 'Peak Load',
    averageLoad: 'Average Load',
    minimumLoad: 'Minimum Load',
    peakCOP: 'Peak COP',
    averageCOP: 'Average COP',
    minimumCOP: 'Minimum COP',
    chillerStatus: 'Chiller Status',
    chilledWaterPumps: 'Chilled Water Pumps',
    coolingTowers: 'Cooling Towers',
    condensingPumps: 'Condensing Pumps',
    primaryPumps: 'Primary Pumps',
    secondaryPumps: 'Secondary Pumps',
    totalCooling: 'Total Cooling',
    totalPower: 'Total Power',
    avg: 'Avg',
    lastUpdated: 'Last updated',
    cooling: 'Cooling (kW)',
    chwst: 'CHWST',
    chwrt: 'CHWRT',
    powerKW: 'Power (kW)',
    flowLmin: 'Flow (L/min)',
    rpm: 'RPM',
    overallData: 'Overall Data',
    lastUpdatedFull: 'Last updated: 5 mins ago',
    overallCoolingLoad: 'Overall Cooling Load',
    overallPowerConsumption: 'Overall Power Consumption',
    chiller: 'Chiller',
    coolingTower: 'Cooling Tower',
    waterPumps: 'Water Pumps',
    hourly: 'Hourly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    abnormalIssues: 'Abnormal Issues',
    state: 'State',
    device: 'Device',
    urgent: 'Urgent',
    time: 'Time',
    abnormalGrowth: 'Abnormal growth'
  },
  zh: {
    overallData: '总体数据',
    lastUpdated: '最后更新：5分钟前',
    cop: 'COP',
    overallCoolingLoad: '总体冷负荷',
    overallPowerConsumption: '总体功耗',
    inUse: '使用中',
    alarm: '警报',
    status: '状态',
    abnormalIssues: '异常问题',
    state: '状态',
    device: '设备',
    urgent: '紧急',
    time: '时间',
    chiller: '冷水机',
    coolingTower: '冷却塔',
    waterPumps: '水泵',
    chilledWaterSupplyTemp: '冷冻水供应温度',
    chilledWaterReturnTemp: '冷冻水回水温度',
    deltaTemp: '温差',
    condensingWaterEnteringTemp: '冷凝水进水温度',
    condensingWaterDepartTemp: '冷凝水出水温度',
    hourly: '小时',
    monthly: '月',
    yearly: '年',
    current: '当前',
    previous: '之前',
    indicatorReference: '指标参考：1000kWh',
    abnormalGrowth: '异常增长'
  }
};

interface KPICardProps {
  title: string;
  value: string;
  color: 'green' | 'orange' | 'blue' | 'red' | 'cyan' | 'indigo' | 'purple' | 'yellow';
  unit?: string;
  icon: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, color, unit, icon }) => {
  const colorClasses = {
    green: 'text-green-400',
    orange: 'text-orange-400',
    blue: 'text-blue-400',
    red: 'text-red-400',
    cyan: 'text-cyan-400',
    indigo: 'text-indigo-400',
    purple: 'text-purple-400',
    yellow: 'text-yellow-400'
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className={`text-2xl mb-1 ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className={`text-3xl font-bold ${colorClasses[color]} mb-1`}>
        {value}{unit && <span className="text-xl ml-1">{unit}</span>}
    </div>
      <div className="text-gray-400 text-sm">{title}</div>
  </div>
);
};

interface EquipmentStatusCardProps {
  title: string;
  equipment: EquipmentItem[];
  icon: React.ReactNode;
}

const EquipmentStatusCard: React.FC<EquipmentStatusCardProps> = ({ title, equipment, icon }) => {
  const onlineCount = equipment.filter(eq => eq.status === 'online').length;
  const totalCount = equipment.length;

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {icon}
          <h3 className="text-gray-300 font-medium text-lg">{title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="text-green-400 w-5 h-5" />
          <span className="text-green-400 text-sm font-medium">{onlineCount}/{totalCount} Online</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {equipment.map((eq) => (
          <div 
            key={eq.id} 
            className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
              eq.status === 'online' 
                ? 'bg-green-900/30 border border-green-700/30' 
                : 'bg-gray-700/50 border border-gray-600/30'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                eq.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
              }`} />
              <span className={`text-sm font-medium ${
                eq.status === 'online' ? 'text-green-300' : 'text-gray-400'
              }`}>
                {eq.name}
              </span>
            </div>
            {eq.coolingLoad && (
              <span className={`text-sm font-medium ${
                eq.status === 'online' ? 'text-green-300' : 'text-gray-400'
              }`}>
                {eq.coolingLoad} {eq.unit || 'kW'}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface AbnormalIssue {
  state: string;
  device: string;
  urgency: 'I' | 'II' | 'III';
  time: string;
}

interface TemperatureCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
}

interface EquipmentItem {
  id: string;
  name: string;
  status: 'online' | 'offline';
  coolingLoad?: number;
  unit?: string;
}

interface ComponentStatusProps {
  title: string;
  totalValue?: string;
  avgValue?: string;
  components: ComponentItem[];
  lastUpdated?: string;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

interface ComponentItem {
  id: string;
  name: string;
  status: 'active' | 'offline';
  metrics: { [key: string]: string };
}

const ComponentStatus: React.FC<ComponentStatusProps> = ({ 
  title, 
  totalValue, 
  avgValue, 
  components, 
  lastUpdated,
  tabs,
  activeTab,
  onTabChange
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const isChillerStatus = title === 'Chiller Status';
  const isEquipmentStatus = title === 'Chiller Status' || title === 'Chilled Water Pumps' || title === 'Cooling Towers' || title === 'Condensing Pumps';
  const runningChillers = components.filter(c => c.status === 'active').length;
  const totalChillers = components.length;

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-300 font-medium flex items-center gap-2">
          {title === 'Chiller Status' && <Snowflake className="w-5 h-5 text-blue-400" />}
          {title === 'Chilled Water Pumps' && <Droplets className="w-5 h-5 text-cyan-400" />}
          {title === 'Cooling Towers' && <Wind className="w-5 h-5 text-green-400" />}
          {title === 'Condensing Pumps' && <Power className="w-5 h-5 text-orange-400" />}
          {title}
        </h3>
        {isChillerStatus ? (
          <div className="text-green-400 text-sm font-medium">{runningChillers}/{totalChillers} Running</div>
        ) : lastUpdated && (
          <div className="text-gray-500 text-sm">{lastUpdated}</div>
        )}
      </div>
      
      {(totalValue || avgValue) && (
        <div className="flex gap-4 mb-4 text-sm">
          {totalValue && (
            <div>
              <span className="text-gray-300 font-medium">{totalValue}</span>
            </div>
          )}
          {avgValue && (
            <div>
              <span className="text-gray-300 font-medium">{avgValue}</span>
            </div>
          )}
        </div>
      )}

      {tabs && activeTab && onTabChange && (
        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-3 py-1 rounded text-sm ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {components.map((component) => (
          <div 
            key={component.id} 
            className={`flex items-center justify-between p-3 rounded transition-colors ${
              component.status === 'active' && isEquipmentStatus
                ? 'bg-green-900/30 border border-green-700/30'
                : component.status === 'offline' && isEquipmentStatus
                ? 'bg-gray-900/50 border border-gray-700/30'
                : 'bg-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(component.status)}`} />
              <span className={`font-medium ${
                component.status === 'active' && isEquipmentStatus
                  ? 'text-green-300'
                  : component.status === 'offline' && isEquipmentStatus
                  ? 'text-gray-600'
                  : 'text-gray-300'
              }`}>
                {component.name}
              </span>
            </div>
            <div className="flex gap-4 text-sm">
              {Object.entries(component.metrics).map(([key, value]) => (
                <div key={key}>
                  <span className={`${
                    component.status === 'offline' && isEquipmentStatus
                      ? 'text-gray-700'
                      : 'text-gray-400'
                  }`}>
                    {key}:{' '}
                  </span>
                  <span className={`${
                    component.status === 'active' && isEquipmentStatus
                      ? 'text-green-300'
                      : component.status === 'offline' && isEquipmentStatus
                      ? 'text-gray-700'
                      : 'text-gray-300'
                  }`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'I': return 'bg-yellow-500';
    case 'II': return 'bg-orange-500';
    case 'III': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const TemperatureCard: React.FC<TemperatureCardProps> = ({ title, value, unit, icon }) => (
  <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-4 border border-gray-700">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        {icon}
        <span className="text-gray-300 text-sm font-medium">{title}</span>
      </div>
    </div>
    <div className="flex items-baseline">
      <span className="text-purple-400 text-3xl font-bold">{value}</span>
      <span className="text-purple-400 text-lg font-medium ml-1">{unit}</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'hourly' | 'monthly' | 'yearly'>('hourly');
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [activeTab, setActiveTab] = useState('Primary Pumps');
  const [chartView, setChartView] = useState<'load' | 'temperature' | 'flow'>('load');
  const [pumpTab, setPumpTab] = useState<'Primary Pumps' | 'Secondary Pumps'>('Primary Pumps');
  const [statusHistoryView, setStatusHistoryView] = useState<'chiller' | 'coolingTower' | 'pumps'>('chiller');
  
  const handlePumpTabChange = (tab: string) => {
    setPumpTab(tab as 'Primary Pumps' | 'Secondary Pumps');
  };

  // Real equipment status data from CSV
  const realEquipmentData = {
    chiller: [
      { time: '00:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '01:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '02:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '03:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '04:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '05:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '06:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '07:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '08:00', CH01: 0, CH02: 0, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '09:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '10:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '11:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '12:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '13:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '14:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '15:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '16:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
    ],
    coolingTower: [
      // Mock cooling tower data (since we don't have real CSV for this)
      { time: '00:00', CT1: 1, CT2: 1, CT3: 0, CT4: 1, CT5: 1, CT6: 0, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '01:00', CT1: 1, CT2: 1, CT3: 0, CT4: 1, CT5: 1, CT6: 0, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '02:00', CT1: 1, CT2: 1, CT3: 0, CT4: 1, CT5: 1, CT6: 0, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '03:00', CT1: 1, CT2: 1, CT3: 0, CT4: 1, CT5: 1, CT6: 0, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '04:00', CT1: 1, CT2: 1, CT3: 0, CT4: 1, CT5: 1, CT6: 0, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '05:00', CT1: 1, CT2: 1, CT3: 0, CT4: 1, CT5: 1, CT6: 0, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '06:00', CT1: 1, CT2: 1, CT3: 0, CT4: 1, CT5: 1, CT6: 0, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '07:00', CT1: 1, CT2: 1, CT3: 1, CT4: 1, CT5: 1, CT6: 0, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '08:00', CT1: 1, CT2: 1, CT3: 1, CT4: 1, CT5: 1, CT6: 1, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '09:00', CT1: 1, CT2: 1, CT3: 1, CT4: 1, CT5: 1, CT6: 1, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '10:00', CT1: 1, CT2: 1, CT3: 1, CT4: 1, CT5: 1, CT6: 1, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '11:00', CT1: 1, CT2: 1, CT3: 1, CT4: 1, CT5: 1, CT6: 1, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '12:00', CT1: 1, CT2: 1, CT3: 1, CT4: 1, CT5: 1, CT6: 1, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '13:00', CT1: 1, CT2: 1, CT3: 1, CT4: 1, CT5: 1, CT6: 1, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '14:00', CT1: 1, CT2: 1, CT3: 1, CT4: 1, CT5: 1, CT6: 1, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '15:00', CT1: 1, CT2: 1, CT3: 1, CT4: 1, CT5: 1, CT6: 1, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
      { time: '16:00', CT1: 1, CT2: 1, CT3: 1, CT4: 1, CT5: 1, CT6: 1, CT7: 1, CT8: 1, CT9: 1, CT10: 1 },
    ],
    pumps: [
      // Mock pump data
      { time: '00:00', PRI1: 0, PRI2: 0, PRI3: 0, SEC1: 0, SEC2: 0, SEC3: 0 },
      { time: '01:00', PRI1: 0, PRI2: 0, PRI3: 0, SEC1: 0, SEC2: 0, SEC3: 0 },
      { time: '02:00', PRI1: 0, PRI2: 0, PRI3: 0, SEC1: 0, SEC2: 0, SEC3: 0 },
      { time: '03:00', PRI1: 0, PRI2: 0, PRI3: 0, SEC1: 0, SEC2: 0, SEC3: 0 },
      { time: '04:00', PRI1: 0, PRI2: 0, PRI3: 0, SEC1: 0, SEC2: 0, SEC3: 0 },
      { time: '05:00', PRI1: 0, PRI2: 0, PRI3: 0, SEC1: 0, SEC2: 0, SEC3: 0 },
      { time: '06:00', PRI1: 1, PRI2: 0, PRI3: 0, SEC1: 0, SEC2: 0, SEC3: 0 },
      { time: '07:00', PRI1: 1, PRI2: 0, PRI3: 1, SEC1: 0, SEC2: 0, SEC3: 0 },
      { time: '08:00', PRI1: 1, PRI2: 1, PRI3: 1, SEC1: 0, SEC2: 0, SEC3: 0 },
      { time: '09:00', PRI1: 1, PRI2: 1, PRI3: 1, SEC1: 1, SEC2: 0, SEC3: 0 },
      { time: '10:00', PRI1: 1, PRI2: 1, PRI3: 1, SEC1: 1, SEC2: 1, SEC3: 0 },
      { time: '11:00', PRI1: 1, PRI2: 1, PRI3: 1, SEC1: 1, SEC2: 1, SEC3: 0 },
      { time: '12:00', PRI1: 1, PRI2: 1, PRI3: 1, SEC1: 1, SEC2: 1, SEC3: 0 },
      { time: '13:00', PRI1: 1, PRI2: 1, PRI3: 1, SEC1: 1, SEC2: 1, SEC3: 0 },
      { time: '14:00', PRI1: 1, PRI2: 1, PRI3: 1, SEC1: 1, SEC2: 1, SEC3: 0 },
      { time: '15:00', PRI1: 1, PRI2: 1, PRI3: 1, SEC1: 1, SEC2: 1, SEC3: 0 },
      { time: '16:00', PRI1: 1, PRI2: 1, PRI3: 1, SEC1: 1, SEC2: 1, SEC3: 0 },
    ]
  };



    // Parse CSV data for heatmap
  const parseCSVData = () => {
    const csvData = [
      { time: '00:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '00:15', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '00:30', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '00:45', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '01:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '01:15', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '01:30', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '01:45', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '02:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '02:15', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '02:30', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '02:45', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '03:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '03:15', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '03:30', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '03:45', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '04:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '04:15', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '04:30', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '04:45', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '05:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '05:15', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '05:30', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '05:45', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '06:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '06:15', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '06:30', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '06:45', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '07:00', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '07:15', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '07:30', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '07:45', CH01: 0, CH02: 0, CH03: 0, CH04: 1, CH05: 0, CH06: 1 },
      { time: '08:00', CH01: 0, CH02: 0, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '08:15', CH01: 0, CH02: 0, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '08:30', CH01: 0, CH02: 0, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '08:45', CH01: 0, CH02: 0, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '09:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '09:15', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '09:30', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '09:45', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '10:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '10:15', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '10:30', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '10:45', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '11:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '11:15', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '11:30', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '11:45', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '12:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '12:15', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '12:30', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '12:45', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '13:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '13:15', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '13:30', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '13:45', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '14:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '14:15', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '14:30', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '14:45', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '15:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '15:15', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '15:30', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '15:45', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
      { time: '16:00', CH01: 0, CH02: 1, CH03: 1, CH04: 1, CH05: 0, CH06: 1 },
    ];

    return csvData;
  };

  const getStatusHistoryData = () => {
    // Use real CSV data for heatmap
    const data = parseCSVData();
    
    // Get equipment names
    const equipmentNames = ['CH01', 'CH02', 'CH03', 'CH04', 'CH05', 'CH06'];
    
    // Create heatmap data - each equipment gets a dataset with status values for each time point
    const datasets = equipmentNames.map(name => {
      const statusData = data.map(record => (record as any)[name] || 0);
      
      return {
        label: name,
        data: statusData,
        backgroundColor: statusHistoryView === 'chiller' ? 'rgba(74, 144, 226, 0.8)' : // Blue for chillers
                         statusHistoryView === 'coolingTower' ? 'rgba(243, 156, 18, 0.8)' : // Orange for cooling towers
                         'rgba(34, 197, 94, 0.8)', // Green for pumps
        borderColor: statusHistoryView === 'chiller' ? 'rgba(74, 144, 226, 1)' :
                    statusHistoryView === 'coolingTower' ? 'rgba(243, 156, 18, 1)' :
                    'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        borderRadius: 2,
        pointRadius: 0, // No points, just bars
        fill: false,
      };
    });

    return {
      labels: data.map(record => record.time), // X-axis: Time points
      datasets: datasets
    };
  };


  const getStatusHistoryOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: 'Time (24 Hours)',
          color: '#9ca3af'
        },
        ticks: {
          maxTicksLimit: 24, // Show all time points
          color: '#9ca3af'
        },
        grid: {
          color: '#374151'
        }
      },
      y: {
        type: 'linear' as const,
        min: 0,
        max: 1,
        title: {
          display: true,
          text: 'Status',
          color: '#9ca3af'
        },
        ticks: {
          stepSize: 1,
          color: '#9ca3af',
          callback: function(tickValue: string | number) {
            return Number(tickValue) === 1 ? 'ON' : 'OFF';
          }
        },
        grid: {
          color: '#374151'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#9ca3af',
          usePointStyle: true,
          pointStyle: 'rect'
        }
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            return `Time: ${context[0].label}`;
          },
          label: (context: any) => {
            const isOn = context.parsed.y === 1;
            return `${context.dataset.label}: ${isOn ? 'ON' : 'OFF'}`;
          }
        }
      }
    }
  });
  
  const t = translations[language];

  // Cooling Load and Power Usage Profile Data (24-hour axis, data up to current moment - 3 PM)
  const coolingLoadData = {
    labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
    datasets: [
      {
        label: 'Cooling Load (kW)',
        data: [1200, 800, 600, 500, 450, 400, 350, 800, 1500, 2200, 2800, 3200, 3500, 3700, 3800, 3900, null, null, null, null, null, null, null, null],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        spanGaps: false,
      },
      {
        label: 'Power Usage (kW)',
        data: [200, 140, 110, 95, 85, 75, 65, 140, 280, 420, 540, 620, 680, 720, 740, 760, null, null, null, null, null, null, null, null],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        spanGaps: false,
      }
    ],
  };

  // Temperature Profile Data (24-hour axis, data up to current moment - 3 PM)
  const temperatureData = {
    labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
    datasets: [
      {
        label: 'CDWS (°C)',
        data: [32.5, 31.8, 31.2, 30.8, 30.5, 30.2, 29.9, 31.5, 33.2, 35.5, 37.2, 38.8, 39.7, 40.2, 40.8, 41.2, null, null, null, null, null, null, null, null],
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        spanGaps: false,
      },
      {
        label: 'CDWR (°C)',
        data: [28.5, 27.8, 27.2, 26.8, 26.5, 26.2, 25.9, 27.5, 29.2, 31.5, 33.2, 34.8, 35.7, 36.2, 36.8, 37.2, null, null, null, null, null, null, null, null],
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        spanGaps: false,
      },
      {
        label: 'CHWS (°C)',
        data: [8.5, 8.2, 7.9, 7.6, 7.3, 7.0, 6.7, 7.2, 6.8, 6.5, 6.3, 6.1, 6.0, 5.9, 5.8, 5.7, null, null, null, null, null, null, null, null],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        spanGaps: false,
      },
      {
        label: 'CHWR (°C)',
        data: [12.5, 12.2, 11.9, 11.6, 11.3, 11.0, 10.7, 11.2, 10.8, 10.5, 10.3, 10.1, 10.0, 9.9, 9.8, 9.7, null, null, null, null, null, null, null, null],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        spanGaps: false,
      }
    ],
  };

  // Flow Rate Profile Data (24-hour axis, data up to current moment - 3 PM)
  const flowRateData = {
    labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
    datasets: [
      {
        label: 'Chilled Water Flow (L/s)',
        data: [350, 300, 250, 220, 200, 180, 160, 300, 420, 540, 650, 720, 770, 800, 820, 619, null, null, null, null, null, null, null, null],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        spanGaps: false,
      },
      {
        label: 'Condenser Water Flow (L/s)',
        data: [380, 330, 280, 250, 230, 210, 190, 330, 450, 570, 680, 750, 800, 830, 850, 631, null, null, null, null, null, null, null, null],
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        spanGaps: false,
      }
    ],
  };

  // Get latest values from the profile data (3 PM - index 15)
  const latestCoolingLoad = coolingLoadData.datasets[0].data[15] || 3900; // 3900 kW
  const latestPowerUsage = coolingLoadData.datasets[1].data[15] || 760; // 760 kW
  const latestCOP = (latestCoolingLoad / latestPowerUsage).toFixed(2); // 5.13

  // COP Performance Data - calculated from cooling load and power usage
  const copData = {
    labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
    datasets: [
      {
        label: 'COP',
        data: [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, null, null, null, null, null, null, null, null],
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        borderWidth: 1,
      }
    ],
  };

  // Calculate COP values from the profile data
  const coolingLoadValues = coolingLoadData.datasets[0].data;
  const powerUsageValues = coolingLoadData.datasets[1].data;
  const copValues = coolingLoadValues.map((cooling, index) => {
    const power = powerUsageValues[index];
    if (cooling && power && power > 0) {
      return Number((cooling / power).toFixed(2));
    }
    return null;
  });

  // Update COP data with calculated values
  copData.datasets[0].data = copValues;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#d1d5db',
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: '#374151',
        titleColor: '#d1d5db',
        bodyColor: '#d1d5db',
        borderColor: '#4b5563',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
          maxTicksLimit: 12,
        },
      },
      y: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
        },
        min: 0,
      },
    },
  };

  const copChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        max: 7,
      },
    },
  };

  // Component data
  const chillers = [
    {
      id: 'CH01',
      name: 'CH01',
      status: 'active' as const,
      metrics: {
        'Cooling': '1300 kW',
        'Power': '260 kW',
        'COP': '5.00'
      }
    },
    {
      id: 'CH02',
      name: 'CH02',
      status: 'offline' as const,
      metrics: {
        'Cooling': '0 kW',
        'Power': '0 kW',
        'COP': '0.00'
      }
    },
    {
      id: 'CH03',
      name: 'CH03',
      status: 'active' as const,
      metrics: {
        'Cooling': '1300 kW',
        'Power': '260 kW',
        'COP': '5.00'
      }
    },
    {
      id: 'CH04',
      name: 'CH04',
      status: 'offline' as const,
      metrics: {
        'Cooling': '0 kW',
        'Power': '0 kW',
        'COP': '0.00'
      }
    },
    {
      id: 'CH05',
      name: 'CH05',
      status: 'offline' as const,
      metrics: {
        'Cooling': '0 kW',
        'Power': '0 kW',
        'COP': '0.00'
      }
    },
    {
      id: 'CH06',
      name: 'CH06',
      status: 'offline' as const,
      metrics: {
        'Cooling': '0 kW',
        'Power': '0 kW',
        'COP': '0.00'
      }
    }
  ];

  const primaryPumps = [
    {
      id: 'PRI-PUMP-01',
      name: 'PRI-PUMP-01',
      status: 'active' as const,
      metrics: {
        'Power': '11 kW',
        'Flow': '384 L/min'
      }
    },
    {
      id: 'PRI-PUMP-02',
      name: 'PRI-PUMP-02',
      status: 'active' as const,
      metrics: {
        'Power': '12 kW',
        'Flow': '359 L/min'
      }
    },
    {
      id: 'PRI-PUMP-03',
      name: 'PRI-PUMP-03',
      status: 'active' as const,
      metrics: {
        'Power': '9 kW',
        'Flow': '259 L/min'
      }
    }
  ];

  const secondaryPumps = [
    {
      id: 'SEC-PUMP-01',
      name: 'SEC-PUMP-01',
      status: 'active' as const,
      metrics: {
        'Power': '8 kW',
        'Flow': '180 L/min',
        'RPM': '1450'
      }
    },
    {
      id: 'SEC-PUMP-02',
      name: 'SEC-PUMP-02',
      status: 'active' as const,
      metrics: {
        'Power': '7 kW',
        'Flow': '165 L/min',
        'RPM': '1380'
      }
    },
    {
      id: 'SEC-PUMP-03',
      name: 'SEC-PUMP-03',
      status: 'offline' as const,
      metrics: {
        'Power': '0 kW',
        'Flow': '0 L/min',
        'RPM': '0'
      }
    }
  ];

  const coolingTowers = [
    {
      id: 'CT-01',
      name: 'CT-01',
      status: 'active' as const,
      metrics: {
        'Power': '8 kW'
      }
    },
    {
      id: 'CT-02',
      name: 'CT-02',
      status: 'active' as const,
      metrics: {
        'Power': '9 kW'
      }
    },
    {
      id: 'CT-03',
      name: 'CT-03',
      status: 'offline' as const,
      metrics: {
        'Power': '0 kW'
      }
    }
  ];

  const condensingPumps = [
    {
      id: 'COND-PUMP-01',
      name: 'COND-PUMP-01',
      status: 'active' as const,
      metrics: {
        'Power': '18 kW',
        'Flow': '532 L/min',
        'RPM': '801'
      }
    },
    {
      id: 'COND-PUMP-02',
      name: 'COND-PUMP-02',
      status: 'active' as const,
      metrics: {
        'Power': '17 kW',
        'Flow': '494 L/min',
        'RPM': '758'
      }
    },
    {
      id: 'COND-PUMP-03',
      name: 'COND-PUMP-03',
      status: 'active' as const,
      metrics: {
        'Power': '17 kW',
        'Flow': '475 L/min',
        'RPM': '758'
      }
    }
  ];



  return (
    <div className="min-h-screen bg-gray-950">
        {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center">
          <Snowflake className="w-8 h-8 text-blue-400 mr-3" />
          <div>
            <h1 className="text-white font-bold text-xl">{t.systemTitle}</h1>
            <p className="text-gray-400 text-sm">AI-Powered Industrial Plant Monitoring & Optimization</p>
          </div>
            </div>
        <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-800/70 rounded-lg transition-colors"
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? '中文' : 'EN'}
              </span>
            </button>
          <button className="p-2 bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-800/70 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Plant Overview Metrics - Single Row Layout */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
            <h2 className="text-xl font-bold text-white">Plant Overview</h2>
          </div>
          
          <div className="grid grid-cols-4 gap-8 relative">
            {/* Border lines positioned at midpoints between sections */}
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gray-600"></div>
            <div className="absolute left-2/4 top-0 bottom-0 w-px bg-gray-600"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gray-600"></div>
            
            {/* Plant Performance Metrics */}
            <div className="flex flex-col items-center">
              <div className="text-gray-400 text-sm font-medium mb-4">Plant Performance</div>
              <div className="grid grid-cols-3 gap-4 w-full px-4">
                <KPICard 
                  title="Plant COP" 
                  value={latestCOP} 
                  color="green" 
                  icon={<Gauge className="w-8 h-8" />}
                />
                <KPICard 
                  title="Cooling Load" 
                  value={latestCoolingLoad.toString()} 
                  color="blue" 
                  unit=" kW"
                  icon={<Snowflake className="w-8 h-8" />}
                />
                <KPICard 
                  title="Power" 
                  value={latestPowerUsage.toString()} 
                  color="red"
                  unit=" kW"
                  icon={<Zap className="w-8 h-8" />}
                />
              </div>
          </div>

            {/* Chilled Water Section */}
            <div className="flex flex-col items-center">
              <div className="text-gray-400 text-sm font-medium mb-4">Chilled Water</div>
              <div className="grid grid-cols-3 gap-4 w-full px-4">
            <KPICard
                  title="Supply" 
                  value="5.7" 
              color="cyan"
                  unit="°C"
                  icon={<Thermometer className="w-6 h-6" />}
            />
            <KPICard
                  title="Return" 
                  value="9.7" 
                  color="blue" 
                  unit="°C"
                  icon={<Thermometer className="w-6 h-6" />}
            />
            <KPICard
                  title="Flow" 
                  value="619" 
                  color="indigo" 
                  unit=" L/s"
                  icon={<Droplets className="w-6 h-6" />}
            />
          </div>
        </div>

            {/* Condenser Water Section */}
            <div className="flex flex-col items-center">
              <div className="text-gray-400 text-sm font-medium mb-4">Condenser Water</div>
              <div className="grid grid-cols-3 gap-4 w-full px-4">
                <KPICard 
                  title="Supply" 
                  value="41.2" 
                  color="red" 
              unit="°C"
                  icon={<Thermometer className="w-6 h-6" />}
                />
                <KPICard 
                  title="Return" 
                  value="37.2" 
                  color="orange" 
              unit="°C"
                  icon={<Thermometer className="w-6 h-6" />}
                />
                <KPICard 
                  title="Flow" 
                  value="631" 
                  color="purple" 
                  unit=" L/s"
                  icon={<Droplets className="w-6 h-6" />}
                />
              </div>
          </div>

            {/* Outdoor Conditions Section */}
            <div className="flex flex-col items-center">
              <div className="text-gray-400 text-sm font-medium mb-4">Outdoor</div>
              <div className="grid grid-cols-3 gap-4 w-full px-4">
                <KPICard 
                  title="Dry Bulb" 
              value="32.5"
                  color="orange" 
              unit="°C"
                  icon={<Sun className="w-6 h-6" />}
                />
                <KPICard 
                  title="Humidity" 
                  value="65" 
                  color="orange" 
                  unit="%"
                  icon={<Droplets className="w-6 h-6" />}
                />
                <KPICard 
                  title="Wet Bulb" 
              value="28.2"
                  color="orange" 
              unit="°C"
                  icon={<Thermometer className="w-6 h-6" />}
            />
          </div>
        </div>
      </div>
      </div>

                {/* Performance Graphs */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Cooling Load and Power Usage Profile / Temperature Profile */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 font-medium flex items-center gap-2">
                {chartView === 'load' ? (
                  <>
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    Cooling Load and Power Usage Profile
                  </>
                ) : chartView === 'temperature' ? (
                  <>
                    <Thermometer className="w-5 h-5 text-orange-400" />
                    Temperature Profile
                  </>
                ) : (
                  <>
                    <Droplets className="w-5 h-5 text-cyan-400" />
                    Flow Rate Profile
                  </>
                )}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartView('load')}
                  className={`px-3 py-1 rounded text-sm ${
                    chartView === 'load'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Load & Power
                </button>
                <button
                  onClick={() => setChartView('temperature')}
                  className={`px-3 py-1 rounded text-sm ${
                    chartView === 'temperature'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Temperature
                </button>
                <button
                  onClick={() => setChartView('flow')}
                  className={`px-3 py-1 rounded text-sm ${
                    chartView === 'flow'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Flow Rate
                </button>
            </div>
          </div>
            <div className="h-64 mb-4">
              <Line data={
                chartView === 'load' ? coolingLoadData : 
                chartView === 'temperature' ? temperatureData : flowRateData
              } options={chartOptions} />
          </div>
            {chartView === 'load' ? (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-blue-400 font-medium">Peak Cooling Load</div>
                  <div className="text-gray-300">3,900 kW</div>
                </div>
                <div>
                  <div className="text-red-400 font-medium">Peak Power Usage</div>
                  <div className="text-gray-300">760 kW</div>
                </div>
              </div>
            ) : chartView === 'temperature' ? (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-orange-400 font-medium">Peak CDWS</div>
                  <div className="text-gray-300">41.2°C</div>
                </div>
                <div>
                  <div className="text-blue-400 font-medium">Peak CHWR</div>
                  <div className="text-gray-300">12.5°C</div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-blue-400 font-medium">Peak Chilled Water Flow</div>
                  <div className="text-gray-300">820 L/s</div>
                </div>
                <div>
                  <div className="text-orange-400 font-medium">Peak Condenser Water Flow</div>
                  <div className="text-gray-300">850 L/s</div>
                </div>
              </div>
            )}
        </div>

          {/* Equipment Status History */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 font-medium flex items-center gap-2">
                <Clock3 className="w-5 h-5 text-purple-400" />
                {statusHistoryView === 'chiller' ? 'CCP1 Chiller On/Off Status' :
                 statusHistoryView === 'coolingTower' ? 'CCP1 Cooling Tower On/Off Status' :
                 'CCP1 Pumps On/Off Status'}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setStatusHistoryView('chiller')}
                  className={`px-3 py-1 rounded text-sm ${
                    statusHistoryView === 'chiller'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Chiller
                </button>
                <button
                  onClick={() => setStatusHistoryView('coolingTower')}
                  className={`px-3 py-1 rounded text-sm ${
                    statusHistoryView === 'coolingTower'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Cooling Tower
                </button>
                <button
                  onClick={() => setStatusHistoryView('pumps')}
                  className={`px-3 py-1 rounded text-sm ${
                    statusHistoryView === 'pumps'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Pumps
                </button>
            </div>
          </div>
            <div className="h-64 mb-4">
              <Bar data={getStatusHistoryData()} options={getStatusHistoryOptions()} />
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <div>Showing last 24 hours of equipment status</div>
              <div>On: Blue | Off: Black</div>
          </div>
        </div>
      </div>

        {/* COP Performance */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
          <h3 className="text-gray-300 font-medium mb-4 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-green-400" />
            Hourly COP Performance
          </h3>
          <div className="h-64 mb-4">
            <Bar data={copData} options={copChartOptions} />
        </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-green-400 font-medium">Peak COP</div>
              <div className="text-gray-300">6.00</div>
                    </div>
            <div>
              <div className="text-blue-400 font-medium">Average COP</div>
              <div className="text-gray-300">5.45</div>
            </div>
            <div>
              <div className="text-orange-400 font-medium">Minimum COP</div>
              <div className="text-gray-300">5.38</div>
            </div>
          </div>
        </div>



        {/* Component Status Panels */}
        <div className="grid grid-cols-4 gap-4">
          {/* Chiller Status */}
          <ComponentStatus
            title="Chiller Status"
            totalValue="Total Cooling: 2600 kW"
            avgValue="Avg: 433 kW"
            components={chillers}
            lastUpdated="12:53:01 PM"
          />

          {/* Chilled Water Pumps */}
          <ComponentStatus
            title="Chilled Water Pumps"
            totalValue={pumpTab === 'Primary Pumps' ? "Total Power: 32 kW" : "Total Power: 15 kW"}
            avgValue={pumpTab === 'Primary Pumps' ? "Avg: 11 kW" : "Avg: 5 kW"}
            components={pumpTab === 'Primary Pumps' ? primaryPumps : secondaryPumps}
            tabs={['Primary Pumps', 'Secondary Pumps']}
            activeTab={pumpTab}
            onTabChange={handlePumpTabChange}
          />

          {/* Cooling Towers */}
          <ComponentStatus
            title="Cooling Towers"
            totalValue="Total Power: 17 kW"
            avgValue="Avg: 9 kW"
            components={coolingTowers}
            lastUpdated="11:04:23 PM"
          />

          {/* Condensing Pumps */}
          <ComponentStatus
            title="Condensing Pumps"
            totalValue="Total Power: 52 kW"
            avgValue="Avg: 17 kW"
            components={condensingPumps}
            lastUpdated="11:04:37 PM"
          />
        </div>

        {/* Chat Icon */}
        <div className="fixed bottom-6 right-6">
          <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg">
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App; 