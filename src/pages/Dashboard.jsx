import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

function Dashboard({ onRowClick }) {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      chartRef1.current?.getEchartsInstance()?.resize();
      chartRef2.current?.getEchartsInstance()?.resize();
      mapRef.current?.getEchartsInstance()?.resize();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const getChart1Option = () => ({
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        type: 'line',
        name: '日/月门诊量',
        data: [12000, 13200, 12800, 14000, 15000, 14200, 15500, 16000, 15800, 16200, 16800, 17200],
        smooth: true,
        lineStyle: { color: '#3b82f6', width: 2 },
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
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        type: 'bar',
        name: '医保基金',
        data: [9800, 10200, 10500, 11000, 10800, 11200, 11500, 11800, 12000, 12200, 12500, 12800],
        itemStyle: { color: '#2dd4bf' },
      },
    ],
  });

  const tableData = [
    { 机构名称: '城区中心医院', 日门诊量: '3,420', 住院量: '980', 床位使用率: '88%', 病历合格率: '94.2%' },
    { 机构名称: '北区社区卫生服务中心', 日门诊量: '1,120', 住院量: '120', 床位使用率: '60%', 病历合格率: '90.3%' },
    { 机构名称: '南区中医院', 日门诊量: '820', 住院量: '300', 床位使用率: '75%', 病历合格率: '89.6%' },
    { 机构名称: '东区人民医院', 日门诊量: '2,380', 住院量: '680', 床位使用率: '82%', 病历合格率: '92.1%' },
  ];

  return (
    <section>
      <div className="top-cards">
        <div className="metric">
          <div className="label">辖区概览</div>
          <div className="value">医疗机构分布：1,248 家</div>
          <div className="delta">
            <span className="small">床位</span>
            <strong style={{ marginLeft: '6px' }}>23,400</strong>
            <span style={{ marginLeft: '8px', color: '#7dd3fc' }}>同比 +3.2%</span>
          </div>
        </div>
        <div className="metric">
          <div className="label">医疗服务概览</div>
          <div className="value">日门诊量：18,420 人次</div>
          <div className="delta">
            <span className="small">住院量</span>
            <strong style={{ marginLeft: '6px' }}>3,128</strong>
            <span style={{ marginLeft: '8px', color: '#fca5a5' }}>环比 -1.8%</span>
          </div>
        </div>
        <div className="metric">
          <div className="label">医保基金概览</div>
          <div className="value">当期结余：¥ 128,400,000</div>
          <div className="delta">
            <span className="small">累计结余</span>
            <strong style={{ marginLeft: '6px' }}>¥ 3,420,000,000</strong>
            <span style={{ marginLeft: '8px', color: '#7dd3fc' }}>同比 +4.1%</span>
          </div>
        </div>
        <div className="metric">
          <div className="label">AI监测预警</div>
          <div className="value">当日预警数量：42 条</div>
          <div className="delta">
            <span className="small">待处置预警</span>
            <strong style={{ marginLeft: '6px' }}>9</strong>
            <span style={{ marginLeft: '8px', color: '#ffb020' }}>预警等级分布：红 3 / 黄 6</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col card fancy">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontWeight: 700 }}>趋势分析 · 核心指标同比、环比趋势图</div>
            <div className="small">单位：人次 / 元 / %</div>
          </div>
          <div className="charts">
            <ReactECharts ref={chartRef1} option={getChart1Option()} style={{ height: '100%', width: '100%' }} />
            <ReactECharts ref={chartRef2} option={getChart2Option()} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        <aside className="warnings">
          <div className="card fancy" style={{ padding: '12px' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>预警目录 · 当日</div>
            <div className="warn-item" onClick={() => onRowClick('基金穿底风险预警 — 基金收支情况 异常下降')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">基金穿底风险预警 — 基金收支情况 异常下降</div>
                <div className="small">风险等级：高 · 来源：医保结算系统</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--danger)' }}></div>
            </div>

            <div className="warn-item" onClick={() => onRowClick('院感发生率上升 — 院感率 异常')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">院感发生率上升 — 院感率 异常</div>
                <div className="small">风险等级：中 · 来源：医疗机构上报</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--warn)' }}></div>
            </div>

            <div className="warn-item" onClick={() => onRowClick('传染病报告聚集性事件')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">传染病报告聚集性事件</div>
                <div className="small">风险等级：中 · 报告病例数 突增</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--warn)' }}></div>
            </div>

            <div style={{ marginTop: '10px' }} className="footer-note">说明：红色为高风险，黄色为中风险。点击可查看详情（演示）。</div>
          </div>

          <div className="card fancy" style={{ marginTop: '12px', padding: '12px' }}>
            <div style={{ fontWeight: 700, marginBottom: '6px' }}>资源分布地图</div>
            <div className="map">
              <ReactECharts
                ref={mapRef}
                option={{
                  tooltip: {},
                  xAxis: {
                    type: 'category',
                    data: ['区域A', '区域B', '区域C', '区域D', '区域E'],
                    axisLine: { lineStyle: { color: '#9fb0d8' } },
                    axisLabel: { color: '#9fb0d8', rotate: 45 },
                  },
                  yAxis: {
                    type: 'value',
                    name: '机构数量',
                    axisLine: { lineStyle: { color: '#9fb0d8' } },
                    axisLabel: { color: '#9fb0d8' },
                    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
                  },
                  series: [
                    {
                      type: 'bar',
                      data: [320, 280, 210, 180, 150],
                      itemStyle: { color: '#3b82f6' },
                    },
                  ],
                }}
                style={{ height: '100%', width: '100%' }}
              />
            </div>
            <div className="small" style={{ marginTop: '8px' }}>GIS：医疗资源GIS分布（支持钻取）</div>
          </div>
        </aside>
      </div>

      <div className="card" style={{ marginTop: '12px' }}>
        <div style={{ fontWeight: 700, marginBottom: '8px' }}>机构运行一览表 · 门诊/住院/床位使用率/病历合格率</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>机构名称</th>
                <th>日门诊量</th>
                <th>住院量</th>
                <th>床位使用率</th>
                <th>病历合格率</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} onClick={() => onRowClick(Object.values(row).join(' | '))}>
                  <td>{row.机构名称}</td>
                  <td>{row.日门诊量}</td>
                  <td>{row.住院量}</td>
                  <td>{row.床位使用率}</td>
                  <td>{row.病历合格率}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;