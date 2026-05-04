import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

function DecisionAnalysis({ onRowClick }) {
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
      data: ['区域A', '区域B', '区域C', '区域D'],
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
    },
    yAxis: {
      type: 'value',
      name: '资源需求指数',
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        type: 'bar',
        name: '资源需求',
        data: [120, 90, 40, 60],
        itemStyle: {
          color: (params) => {
            const colors = ['#ef4444', '#f59e0b', '#2dd4bf', '#3b82f6'];
            return colors[params.dataIndex % colors.length];
          },
        },
      },
    ],
  });

  const getChart2Option = () => ({
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['无措施', '措施A', '措施B', '措施C'],
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
    },
    yAxis: {
      type: 'value',
      name: '预测值',
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        type: 'line',
        name: '预测趋势',
        data: [1000, 920, 850, 780],
        smooth: true,
        lineStyle: { color: '#3b82f6', width: 3 },
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

  const tableData = [
    { 项: '资源分配', 指标: '床位/千人', 当前值: '2.3', 建议: '下沉床位', 优先级: '高' },
    { 项: '选址', 指标: '服务半径', 当前值: '5km', 建议: '新区布局', 优先级: '中' },
    { 项: '政策效果', 指标: '门诊量增长', 当前值: '+4%', 建议: '持续观察', 优先级: '低' },
  ];

  return (
    <section>
      <div className="top-cards">
        <div className="metric">
          <div className="label">资源配置研判</div>
          <div className="value">资源分布分析：热力显示</div>
          <div className="delta">
            <span className="small">供需平衡分析</span>
            <strong style={{ marginLeft: '6px' }}>部分偏低区域</strong>
          </div>
        </div>
        <div className="metric">
          <div className="label">政策效果评估</div>
          <div className="value">政策执行监测：执行进度 74%</div>
          <div className="delta">
            <span className="small">反馈效果评估</span>
            <strong style={{ marginLeft: '6px' }}>初步改善</strong>
          </div>
        </div>
        <div className="metric">
          <div className="label">预测模拟分析</div>
          <div className="value">趋势预测：核心指标上升</div>
          <div className="delta">
            <span className="small">情景模拟</span>
            <strong style={{ marginLeft: '6px' }}>多场景可比</strong>
          </div>
        </div>
        <div className="metric">
          <div className="label">专题分析报告</div>
          <div className="value">自动生成报告：5 份</div>
          <div className="delta">
            <span className="small">报告模板管理</span>
            <strong style={{ marginLeft: '6px' }}>已更新</strong>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col card fancy">
          <div style={{ fontWeight: 700, marginBottom: '8px' }}>资源配置分析 / 预测模拟 / 政策效果评估</div>
          <div className="charts">
            <ReactECharts ref={chartRef1} option={getChart1Option()} style={{ height: '100%', width: '100%' }} />
            <ReactECharts ref={chartRef2} option={getChart2Option()} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        <aside className="warnings">
          <div className="card fancy" style={{ padding: '12px' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>决策提示</div>
            <div style={{ marginBottom: '8px' }} className="small">AI建议：针对供需不平衡区域，优先资源下沉与选址决策支持</div>
            <div className="warn-item" onClick={() => onRowClick('选址建议：新区A 建议设立社区卫生服务中心')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">选址建议：新区A 建议设立社区卫生服务中心</div>
                <div className="small">基于资源分布分析与供需模型</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--success)' }}></div>
            </div>
          </div>
        </aside>
      </div>

      <div className="card" style={{ marginTop: '12px' }}>
        <div style={{ fontWeight: 700, marginBottom: '8px' }}>决策分析结果表 · 资源/选址/政策效果</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>项</th>
                <th>指标</th>
                <th>当前值</th>
                <th>建议</th>
                <th>优先级</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} onClick={() => onRowClick(Object.values(row).join(' | '))}>
                  <td>{row.项}</td>
                  <td>{row.指标}</td>
                  <td>{row.当前值}</td>
                  <td>{row.建议}</td>
                  <td>{row.优先级}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default DecisionAnalysis;