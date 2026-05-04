import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

function AIWarning({ onRowClick }) {
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
      data: ['0-6h', '6-12h', '12-18h', '18-24h'],
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
    },
    yAxis: {
      type: 'value',
      name: '预警数量',
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        type: 'bar',
        name: '预警数量',
        data: [8, 12, 15, 7],
        itemStyle: { color: '#3b82f6' },
      },
    ],
  });

  const getChart2Option = () => ({
    tooltip: {},
    legend: {
      data: ['红', '黄', '蓝'],
      textStyle: { color: '#9fb0d8' },
      top: 5,
    },
    xAxis: {
      type: 'category',
      data: ['卫健', '医保', '公卫'],
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
    },
    yAxis: {
      type: 'value',
      name: '数量',
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        name: '红',
        type: 'bar',
        data: [2, 3, 1],
        itemStyle: { color: '#ef4444' },
      },
      {
        name: '黄',
        type: 'bar',
        data: [4, 6, 3],
        itemStyle: { color: '#f59e0b' },
      },
      {
        name: '蓝',
        type: 'bar',
        data: [12, 20, 10],
        itemStyle: { color: '#3b82f6' },
      },
    ],
  });

  const tableData = [
    { 预警ID: 'R001', 领域: '医保', 预警等级: '高', 状态: '待处置', 处置人进度: '王某 / 未开始' },
    { 预警ID: 'R102', 领域: '卫健', 预警等级: '中', 状态: '处置中', 处置人进度: '李某 / 60%' },
    { 预警ID: 'R203', 领域: '公卫', 预警等级: '中', 状态: '已确认', 处置人进度: '张某 / 已指派' },
  ];

  return (
    <section>
      <div className="top-cards">
        <div className="metric">
          <div className="label">监测预警规则管理</div>
          <div className="value">规则总数：128 条</div>
          <div className="delta">
            <span className="small">规则测试</span>
            <strong style={{ marginLeft: '6px' }}>已通过 78%</strong>
          </div>
        </div>
        <div className="metric">
          <div className="label">预警实时监控</div>
          <div className="value">预警列表：当日 42 条</div>
          <div className="delta">
            <span className="small">待处置</span>
            <strong style={{ marginLeft: '6px' }}>9</strong>
          </div>
        </div>
        <div className="metric">
          <div className="label">预警处置闭环</div>
          <div className="value">处置率：82%</div>
          <div className="delta">
            <span className="small">平均处置时长</span>
            <strong style={{ marginLeft: '6px' }}>18h</strong>
          </div>
        </div>
        <div className="metric">
          <div className="label">预警综合研判</div>
          <div className="value">异常事件：12 起</div>
          <div className="delta">
            <span className="small">误报率</span>
            <strong style={{ marginLeft: '6px' }}>6%</strong>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col card fancy">
          <div style={{ fontWeight: 700, marginBottom: '8px' }}>预警统计分析 · 预警列表 / 趋势 / 处置分析</div>
          <div className="charts">
            <ReactECharts ref={chartRef1} option={getChart1Option()} style={{ height: '100%', width: '100%' }} />
            <ReactECharts ref={chartRef2} option={getChart2Option()} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        <aside className="warnings">
          <div className="card fancy" style={{ padding: '12px' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>预警实时列表</div>

            <div className="warn-item" onClick={() => onRowClick('R001：同一患者30天内住院≥3次（分解住院识别）')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">R001：同一患者30天内住院≥3次（分解住院识别）</div>
                <div className="small">风险等级：高 · 来源：AI医保监测</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--danger)' }}></div>
            </div>

            <div className="warn-item" onClick={() => onRowClick('药品短缺风险（AI预测）')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">药品短缺风险（AI预测）</div>
                <div className="small">风险等级：中</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--warn)' }}></div>
            </div>

            <div className="warn-item" onClick={() => onRowClick('院感早期预警（AI）')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">院感早期预警（AI）</div>
                <div className="small">风险等级：中</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--warn)' }}></div>
            </div>

            <div className="small" style={{ marginTop: '8px' }}>规则示例：R001~R005（见 PRD）</div>
          </div>
        </aside>
      </div>

      <div className="card" style={{ marginTop: '12px' }}>
        <div style={{ fontWeight: 700, marginBottom: '8px' }}>预警列表与处置记录</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>预警ID</th>
                <th>领域</th>
                <th>预警等级</th>
                <th>状态</th>
                <th>处置人/进度</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} onClick={() => onRowClick(Object.values(row).join(' | '))}>
                  <td>{row.预警ID}</td>
                  <td>{row.领域}</td>
                  <td>{row.预警等级}</td>
                  <td>{row.状态}</td>
                  <td>{row.处置人进度}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AIWarning;