import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

function PublicHealth({ onRowClick }) {
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
      data: ['周1', '周2', '周3', '周4', '周5', '周6', '周7'],
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
    },
    yAxis: {
      type: 'value',
      name: '病例数',
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        type: 'line',
        name: '报告病例数',
        data: [12, 9, 18, 16, 22, 28, 19],
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
    legend: {
      data: ['高血压', '糖尿病'],
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
      name: '规范管理率(%)',
      min: 50,
      max: 80,
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8', formatter: '{value}%' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        name: '高血压',
        type: 'line',
        data: [65.2, 66.1, 66.8, 67.4, 67.9, 68.2],
        smooth: true,
        lineStyle: { color: '#ef4444' },
        itemStyle: { color: '#ef4444' },
      },
      {
        name: '糖尿病',
        type: 'line',
        data: [59.5, 60.2, 60.9, 61.5, 62.1, 62.7],
        smooth: true,
        lineStyle: { color: '#f59e0b' },
        itemStyle: { color: '#f59e0b' },
      },
    ],
  });

  const tableData = [
    { 事件ID: 'E-20240501', 报告病例数: '12', 预警事件: '否', 处置进度: '已监控', 是否聚集性疫情: '否' },
    { 事件ID: 'E-20240503', 报告病例数: '34', 预警事件: '是', 处置进度: '处置中', 是否聚集性疫情: '是' },
    { 事件ID: 'E-20240505', 报告病例数: '7', 预警事件: '否', 处置进度: '已关闭', 是否聚集性疫情: '否' },
  ];

  return (
    <section>
      <div className="top-cards">
        <div className="metric">
          <div className="label">传染病监测</div>
          <div className="value">报告病例数：128 起</div>
          <div className="delta">
            <span className="small">预警事件</span>
            <strong style={{ marginLeft: '6px' }}>6 起</strong>
          </div>
        </div>
        <div className="metric">
          <div className="label">慢病管理</div>
          <div className="value">高血压规范管理率：68.2%</div>
          <div className="delta">
            <span className="small">糖尿病规范管理率</span>
            <strong style={{ marginLeft: '6px' }}>62.7%</strong>
          </div>
        </div>
        <div className="metric">
          <div className="label">妇幼健康</div>
          <div className="value">孕产妇管理总览：系统管理率 92%</div>
          <div className="delta">
            <span className="small">高危管理率</span>
            <strong style={{ marginLeft: '6px' }}>4.1%</strong>
          </div>
        </div>
        <div className="metric">
          <div className="label">老龄/精神卫生</div>
          <div className="value">老年健康管理率：54%</div>
          <div className="delta">
            <span className="small">精神障碍登记率</span>
            <strong style={{ marginLeft: '6px' }}>88%</strong>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col card fancy">
          <div style={{ fontWeight: 700, marginBottom: '8px' }}>传染病 · 报告病例数 / 聚集性分析 / 传播预测</div>
          <div className="charts">
            <ReactECharts ref={chartRef1} option={getChart1Option()} style={{ height: '100%', width: '100%' }} />
            <ReactECharts ref={chartRef2} option={getChart2Option()} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        <aside className="warnings">
          <div className="card fancy" style={{ padding: '12px' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>公卫预警</div>
            <div className="warn-item" onClick={() => onRowClick('聚集性疫情疑似事件')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">聚集性疫情疑似事件</div>
                <div className="small">报告病例数 异常增长</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--danger)' }}></div>
            </div>

            <div className="warn-item" onClick={() => onRowClick('疫苗接种覆盖率下降（儿童保健）')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">疫苗接种覆盖率下降（儿童保健）</div>
                <div className="small">需关注接种进度</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--warn)' }}></div>
            </div>

            <div className="small" style={{ marginTop: '8px' }}>AI多源监测：医院/药店/学校/舆情 数据整合</div>
          </div>
        </aside>
      </div>

      <div className="card" style={{ marginTop: '12px' }}>
        <div style={{ fontWeight: 700, marginBottom: '8px' }}>公卫数据表 · 报告病例数 / 处理进度 / 高危场所</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>事件ID</th>
                <th>报告病例数</th>
                <th>预警事件</th>
                <th>处置进度</th>
                <th>是否聚集性疫情</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} onClick={() => onRowClick(Object.values(row).join(' | '))}>
                  <td>{row.事件ID}</td>
                  <td>{row.报告病例数}</td>
                  <td>{row.预警事件}</td>
                  <td>{row.处置进度}</td>
                  <td>{row.是否聚集性疫情}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default PublicHealth;