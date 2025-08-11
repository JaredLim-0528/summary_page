import React, { useState } from 'react';
import { BarChart3, Thermometer, Zap, ChevronUp, ChevronDown, CheckCircle, AlertTriangle, Clock, Maximize2, Power, Gauge, Calendar, Clock3, Languages } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend,
  Filler
);

// Translation object
const translations = {
  en: {
    overallData: 'Overall Data',
    lastUpdated: 'Last updated: 5 mins ago',
    cop: 'COP',
    overallCoolingLoad: 'Overall Cooling Load',
    overallPowerConsumption: 'Overall Power Consumption',
    inUse: 'In Use',
    alarm: 'Alarm',
    status: 'Status',
    abnormalIssues: 'Abnormal Issues',
    state: 'State',
    device: 'Device',
    urgent: 'Urgent',
    time: 'Time',
    chiller: 'Chiller',
    coolingTower: 'Cooling Tower',
    waterPumps: 'Water Pumps',
    chilledWaterSupplyTemp: 'Chilled water supply temp',
    chilledWaterReturnTemp: 'Chilled water return temp',
    deltaTemp: 'Delta temp',
    condensingWaterEnteringTemp: 'Condensing water entering temp',
    condensingWaterDepartTemp: 'Condensing water depart temp',
    hourly: 'Hourly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    current: 'Current',
    previous: 'Previous',
    indicatorReference: 'Indicator Reference: 1000kWh',
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
  trend: string;
  trendDirection: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, trend, trendDirection, icon }) => (
  <div className="bg-gray-800 rounded-lg p-6 relative">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <div className="text-cyan-400">{icon}</div>
        <span className="text-gray-300 text-sm font-medium">{title}</span>
      </div>
      <Maximize2 className="text-gray-500 w-4 h-4 cursor-pointer hover:text-gray-300" />
    </div>
    <div className="flex items-end justify-between">
      <span className="text-cyan-400 text-5xl font-bold">{value}</span>
      <div className={`flex items-center space-x-1 text-sm ${
        trendDirection === 'up' ? 'text-green-400' : 'text-red-400'
      }`}>
        {trendDirection === 'up' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        <span>{trend}</span>
      </div>
    </div>
  </div>
);

interface EquipmentStatusCardProps {
  title: string;
  inUse: number;
  alarm: number;
  details: Array<{ label: string; value: string }>;
  statusText: string;
  inUseText: string;
  alarmText: string;
}

const EquipmentStatusCard: React.FC<EquipmentStatusCardProps> = ({ title, inUse, alarm, details, statusText, inUseText, alarmText }) => (
  <div className="bg-gray-800 rounded-lg p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-gray-300 font-medium text-lg">{title}</h3>
      <div className="flex items-center space-x-2">
        <CheckCircle className="text-green-400 w-5 h-5" />
        <span className="text-green-400 text-sm font-medium">{statusText}</span>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-4">
      {/* In Use Card */}
      <div className="bg-gray-700 rounded-lg p-4 relative">
        <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
          <Power className="text-yellow-400 w-4 h-4" />
          <span className="text-gray-300 text-sm">{inUseText}</span>
        </div>
          <ChevronUp className="text-yellow-400 w-4 h-4" />
        </div>
        <div className="text-yellow-400 text-4xl font-bold">{inUse}</div>
      </div>
      
      {/* Alarm Card */}
      <div className="bg-gray-700 rounded-lg p-4 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="text-red-400 w-4 h-4" />
            <span className="text-gray-300 text-sm">{alarmText}</span>
          </div>
          <ChevronDown className="text-red-400 w-4 h-4" />
        </div>
        <div className="text-red-400 text-4xl font-bold">{alarm}</div>
      </div>
    </div>
    
    <div className="space-y-3">
      {details.map((detail, index) => (
        <div key={index} className="flex justify-between text-sm">
          <div className="flex items-center space-x-2">
            {detail.label.toLowerCase().includes('temp') && (
              <Thermometer className="text-gray-400 w-3 h-3" />
            )}
            {(detail.label === 'PCH' || detail.label === 'PCW' || detail.label === 'PCHD') && (
              <Gauge className="text-gray-400 w-3 h-3" />
            )}
            <span className="text-gray-400">{detail.label}</span>
          </div>
          <span className="text-gray-300 font-medium">{detail.value}</span>
        </div>
      ))}
    </div>
  </div>
);

interface AbnormalIssue {
  state: string;
  device: string;
  urgency: 'I' | 'II' | 'III';
  time: string;
}

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'I': return 'bg-yellow-500';
    case 'II': return 'bg-orange-500';
    case 'III': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const App: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'hourly' | 'monthly' | 'yearly'>('hourly');
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  
  const t = translations[language];

  // Mock data for charts - matching the image exactly
  const chartData = {
    labels: ['22:00', '22:02', '22:04', '22:06', '22:08', '22:10'],
    datasets: [
      {
        label: 'Current',
        data: [8000, 9200, 7800, 10500, 8700, 10000],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: 'Previous',
        data: [7000, 8200, 6800, 9500, 7700, 8500],
        borderColor: '#a855f7',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'end' as const,
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
        displayColors: true,
        callbacks: {
          title: function() {
            return 'Dec 8, 2024 22:08';
          },
          label: function(context: any) {
            if (context.dataset.label === 'Current') {
              return `Current: ${context.parsed.y}`;
            } else {
              return `Previous: ${context.parsed.y}`;
            }
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
          maxTicksLimit: 8,
        },
        title: {
          display: true,
          text: 'Indicator Reference: 1000kWh',
          color: '#f59e0b',
          align: 'start' as const,
          position: 'top' as const,
        },
        min: 0,
        max: 15000,
      },
    },
  };

  const abnormalIssues: AbnormalIssue[] = [
    { state: 'Abnormal growth', device: 'DT 4-1', urgency: 'III', time: '2024-12-08 22:08:54' },
    { state: 'Abnormal growth', device: 'DT 1-1', urgency: 'III', time: '2024-12-08 22:08:54' },
    { state: 'Abnormal growth', device: 'DT 2-3', urgency: 'II', time: '2024-12-08 22:08:54' },
    { state: 'Abnormal growth', device: 'DT 3-2', urgency: 'II', time: '2024-12-08 22:08:54' },
    { state: 'Abnormal growth', device: 'DT 5-1', urgency: 'II', time: '2024-12-08 22:08:54' },
    { state: 'Abnormal growth', device: 'DT 6-2', urgency: 'II', time: '2024-12-08 22:08:54' },
    { state: 'Abnormal growth', device: 'DT 7-1', urgency: 'I', time: '2024-12-08 22:08:54' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">{t.overallData}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{t.lastUpdated}</span>
          </div>
          <button
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-800/70 rounded-lg transition-colors"
            title={language === 'en' ? 'Switch to Chinese' : '切换到英文'}
          >
            <Languages className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'en' ? '中文' : 'EN'}
            </span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          title={t.cop}
          value="2.63"
          trend="+0.12"
          trendDirection="up"
          icon={<BarChart3 className="w-5 h-5" />}
          color="cyan"
        />
        <KPICard
          title={t.overallCoolingLoad}
          value="5.18"
          trend="-0.24"
          trendDirection="down"
          icon={<Thermometer className="w-5 h-5" />}
          color="cyan"
        />
        <KPICard
          title={t.overallPowerConsumption}
          value="10.1"
          trend="+1.2"
          trendDirection="up"
          icon={<Zap className="w-5 h-5" />}
          color="cyan"
        />
      </div>

      {/* Equipment Status and Abnormal Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <EquipmentStatusCard
            title={t.chiller}
            inUse={9}
            alarm={1}
            statusText={t.status}
            inUseText={t.inUse}
            alarmText={t.alarm}
            details={[
              { label: t.chilledWaterSupplyTemp, value: '14 °C' },
              { label: t.chilledWaterReturnTemp, value: '8 °C' },
              { label: t.deltaTemp, value: '11 °C' },
            ]}
          />
          <EquipmentStatusCard
            title={t.coolingTower}
            inUse={9}
            alarm={1}
            statusText={t.status}
            inUseText={t.inUse}
            alarmText={t.alarm}
            details={[
              { label: t.condensingWaterEnteringTemp, value: '13 °C' },
              { label: t.condensingWaterDepartTemp, value: '6 °C' },
              { label: t.deltaTemp, value: '10 °C' },
            ]}
          />
          <EquipmentStatusCard
            title={t.waterPumps}
            inUse={9}
            alarm={1}
            statusText={t.status}
            inUseText={t.inUse}
            alarmText={t.alarm}
            details={[
              { label: 'PCH', value: '652' },
              { label: 'PCW', value: '1215' },
              { label: 'PCHD', value: '265' },
            ]}
          />
        </div>

        {/* Abnormal Issues */}
        <div className="rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="text-red-400 w-5 h-5" />
            <h3 className="text-gray-300 font-medium">{t.abnormalIssues}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-2">{t.state}</th>
                  <th className="text-left py-2">{t.device}</th>
                  <th className="text-left py-2">{t.urgent}</th>
                  <th className="text-left py-2">{t.time}</th>
                </tr>
              </thead>
              <tbody>
                {abnormalIssues.map((issue, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-2 text-gray-300">{t.abnormalGrowth}</td>
                    <td className="py-2 text-gray-300">{issue.device}</td>
                    <td className="py-2">
                      <div className={`inline-block px-2 py-1 rounded text-white text-xs ${getUrgencyColor(issue.urgency)}`}>
                        {issue.urgency}
                      </div>
                    </td>
                    <td className="py-2 text-gray-300">{issue.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Historical Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chiller Graph */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-gray-300 font-medium mb-3">{t.chiller}</h3>
            <div className="flex space-x-2">
              {(['hourly', 'monthly', 'yearly'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-3 py-1 rounded text-sm flex items-center space-x-1 ${
                    selectedTimeRange === range
                      ? 'bg-cyan-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range === 'hourly' && <Clock3 className="w-3 h-3" />}
                  {range === 'monthly' && <Calendar className="w-3 h-3" />}
                  {range === 'yearly' && <Calendar className="w-3 h-3" />}
                  <span>{range === 'hourly' ? t.hourly : range === 'monthly' ? t.monthly : t.yearly}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Cooling Tower Graph */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-gray-300 font-medium mb-3">{t.coolingTower}</h3>
            <div className="flex space-x-2">
              {(['hourly', 'monthly', 'yearly'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-3 py-1 rounded text-sm flex items-center space-x-1 ${
                    selectedTimeRange === range
                      ? 'bg-cyan-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range === 'hourly' && <Clock3 className="w-3 h-3" />}
                  {range === 'monthly' && <Calendar className="w-3 h-3" />}
                  {range === 'yearly' && <Calendar className="w-3 h-3" />}
                  <span>{range === 'hourly' ? t.hourly : range === 'monthly' ? t.monthly : t.yearly}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 