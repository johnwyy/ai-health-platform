import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

function HealthSupervision({ onRowClick }) {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      chartRef1.current?.getEchartsInstance()?.resize();
      chartRef2.current?.getEchartsInstance()?.resize();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const getChart1Option = () => ({
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
    },
    yAxis: {
      type: 'value',
      name: '合格率(%)',
      min: 85,
      max: 95,
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8', formatter: '{value}%' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        type: 'line',
        name: '病历合格率',
        data: [88, 89.2, 90.1, 90.6, 91, 91.4],
        smooth: true,
        lineStyle: { color: '#3b82f6', width: 2 },
        itemStyle: { color: '#3b82f6' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59,130,246,0.3)' },
              { offset: 1, color: 'rgba(59,130,246,0.05)' },
            ],
          },
        },
      },
    ],
  });

  const getChart2Option = () => ({
    tooltip: {},
    legend: {
      data: ['完整性', '时效性', '逻辑性', '规范性'],
      textStyle: { color: '#9fb0d8' },
      top: 5,
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
    },
    yAxis: {
      type: 'value',
      name: '缺陷数',
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        name: '完整性',
        type: 'line',
        data: [28, 32, 30, 35, 33, 34],
        smooth: true,
        lineStyle: { color: '#2dd4bf' },
      },
      {
        name: '时效性',
        type: 'line',
        data: [20, 22, 18, 24, 21, 22],
        smooth: true,
        lineStyle: { color: '#f59e0b' },
      },
      {
        name: '逻辑性',
        type: 'line',
        data: [15, 18, 16, 20, 17, 18],
        smooth: true,
        lineStyle: { color: '#8b5cf6' },
      },
      {
        name: '规范性',
        type: 'line',
        data: [22, 25, 24, 28, 25, 26],
        smooth: true,
        lineStyle: { color: '#ec4899' },
      },
    ],
  });

  const tableData = [
    { 机构名称: '城区中心医院', 病历合格率: '94.2%', 术后并发率: '1.1%', 院感率: '0.7%', 院感聚集事件: '否' },
    { 机构名称: '北区社区卫生服务中心', 病历合格率: '90.3%', 术后并发率: '0.5%', 院感率: '0.4%', 院感聚集事件: '否' },
    { 机构名称: '南区中医院', 病历合格率: '89.6%', 术后并发率: '1.8%', 院感率: '1.2%', 院感聚集事件: '是' },
  ];

  return (
    <section>
      <div className="top-cards">
        <div className="metric">
          <div className="label">监管总览</div>
          <div className="value">病历质量总览</div>
          <div className="delta">
            <span className="small">病历合格率</span>
            <strong style={{ marginLeft: '6px' }}>91.4%</strong>
            <span style={{ marginLeft: '8px', color: '#7dd3fc' }}>同比 +1.2%</span>
          </div>
        </div>
        <div className="metric">
          <div className="label">医疗质量监测</div>
          <div className="value">术后并发率：1.2%</div>
          <div className="delta">
            <span className="small">院感率</span>
            <strong style={{ marginLeft: '6px' }}>0.8%</strong>
            <span style={{ marginLeft: '8px', color: '#fca5a5' }}>环比 -0.2%</span>
          </div>
        </div>
        <div className="metric">
          <div className="label">机构运行监测</div>
          <div className="value">床位使用率：72.6%</div>
          <div className="delta">
            <span className="small">门诊住院量趋势</span>
            <strong style={{ marginLeft: '6px' }}>稳定</strong>
          </div>
        </div>
        <div className="metric">
          <div className="label">药械监管</div>
          <div className="value">基药占比：65%</div>
          <div className="delta">
            <span className="small">抗菌药物使用强度</span>
            <strong style={{ marginLeft: '6px' }}>1.9 DDD/1000</strong>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col card fancy">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontWeight: 700 }}>病历质量 · 病历合格率 / AI病历质控</div>
            <div className="small">病历合格率 / AI缺陷分布</div>
          </div>
          <div className="charts">
            <ReactECharts ref={chartRef1} option={getChart1Option()} style={{ height: '100%', width: '100%' }} />
            <ReactECharts ref={chartRef2} option={getChart2Option()} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        <aside className="warnings">
          <div className="card fancy" style={{ padding: '12px' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>卫健预警</div>
            <div className="warn-item" onClick={() => onRowClick('病历合格率异常下降')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">病历合格率异常下降</div>
                <div className="small">AI病历质控发现 不合格率 上升</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--danger)' }}></div>
            </div>

            <div className="warn-item" onClick={() => onRowClick('手术并发率突增')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">手术并发率突增</div>
                <div className="small">手术安全 总览 监测到并发率上升</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--warn)' }}></div>
            </div>

            <div className="warn-item" onClick={() => onRowClick('院感监测：感染聚集预警')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">院感监测：感染聚集预警</div>
                <div className="small">院感率 / 多重耐药菌感染率 评估中</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--warn)' }}></div>
            </div>

            <div className="small" style={{ marginTop: '8px' }}>AI病历质控规则：完整性、时效性、逻辑性、规范性</div>
          </div>
        </aside>
      </div>

      <div className="card" style={{ marginTop: '12px' }}>
        <div style={{ fontWeight: 700, marginBottom: '8px' }}>医疗质量数据表 · 机构病历质量 / 手术安全 / 院感</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>机构名称</th>
                <th>病历合格率</th>
                <th>术后并发率</th>
                <th>院感率</th>
                <th>院感聚集事件</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} onClick={() => onRowClick(Object.values(row).join(' | '))}>
                  <td>{row.机构名称}</td>
                  <td>{row.病历合格率}</td>
                  <td>{row.术后并发率}</td>
                  <td>{row.院感率}</td>
                  <td>{row.院感聚集事件}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default HealthSupervision;