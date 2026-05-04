import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';

function MedicalInsurance({ onRowClick }) {
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
      name: '可疑金额(万元)',
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        type: 'bar',
        name: '欺诈识别金额',
        data: [120, 180, 90, 240, 320, 420],
        itemStyle: { color: '#ef4444' },
      },
    ],
  });

  const getChart2Option = () => ({
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
    },
    yAxis: {
      type: 'value',
      name: '金额(万元)',
      axisLine: { lineStyle: { color: '#9fb0d8' } },
      axisLabel: { color: '#9fb0d8' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    legend: {
      data: ['收入', '支出'],
      textStyle: { color: '#9fb0d8' },
      top: 5,
    },
    series: [
      {
        name: '收入',
        type: 'line',
        data: [22000, 23500, 24800, 26000, 27200, 28000],
        smooth: true,
        lineStyle: { color: '#2dd4bf' },
        itemStyle: { color: '#2dd4bf' },
      },
      {
        name: '支出',
        type: 'line',
        data: [18000, 19500, 21000, 22500, 23800, 24500],
        smooth: true,
        lineStyle: { color: '#f59e0b' },
        itemStyle: { color: '#f59e0b' },
      },
    ],
  });

  const tableData = [
    { 机构名称: '城区中心医院', 疑似欺诈次数: '3', 涉案金额: '¥1,200,000', 入组率: '82%', CMI: '1.18' },
    { 机构名称: '北区社区卫生服务中心', 疑似欺诈次数: '0', 涉案金额: '¥0', 入组率: '60%', CMI: '0.85' },
    { 机构名称: '南区中医院', 疑似欺诈次数: '2', 涉案金额: '¥320,000', 入组率: '74%', CMI: '1.02' },
  ];

  return (
    <section>
      <div className="top-cards">
        <div className="metric">
          <div className="label">基金运行监测</div>
          <div className="value">基金收支：本期支出 ¥ 98,400,000</div>
          <div className="delta">
            <span className="small">当期结余</span>
            <strong style={{ marginLeft: '6px' }}>¥ 128,400,000</strong>
          </div>
        </div>
        <div className="metric">
          <div className="label">欺诈风险监测</div>
          <div className="value">欺诈识别统计：27 起</div>
          <div className="delta">
            <span className="small">涉案金额</span>
            <strong style={{ marginLeft: '6px' }}>¥ 4,200,000</strong>
          </div>
        </div>
        <div className="metric">
          <div className="label">DRG/DIP 运行</div>
          <div className="value">入组率：78%</div>
          <div className="delta">
            <span className="small">CMI</span>
            <strong style={{ marginLeft: '6px' }}>1.12</strong>
            <span style={{ marginLeft: '8px', color: '#fca5a5' }}>时间消耗指数 略升</span>
          </div>
        </div>
        <div className="metric">
          <div className="label">集采监管</div>
          <div className="value">集采任务完成进度：86%</div>
          <div className="delta">
            <span className="small">使用异常监测</span>
            <strong style={{ marginLeft: '6px' }}>中</strong>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col card fancy">
          <div style={{ fontWeight: 700, marginBottom: '8px' }}>欺诈识别 & 支付监管（DRG/DIP）</div>
          <div className="charts">
            <ReactECharts ref={chartRef1} option={getChart1Option()} style={{ height: '100%', width: '100%' }} />
            <ReactECharts ref={chartRef2} option={getChart2Option()} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        <aside className="warnings">
          <div className="card fancy" style={{ padding: '12px' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>医保预警</div>
            <div className="warn-item" onClick={() => onRowClick('疑似欺诈高风险机构识别')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">疑似欺诈高风险机构识别</div>
                <div className="small">规则引擎监测 / AI模型提示</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--danger)' }}></div>
            </div>

            <div className="warn-item" onClick={() => onRowClick('DRG 入组率异常波动')}>
              <div style={{ flex: 1 }}>
                <div className="warn-title">DRG 入组率异常波动</div>
                <div className="small">入组率 / CMI 监控</div>
              </div>
              <div className="warn-dot" style={{ background: 'var(--warn)' }}></div>
            </div>

            <div className="small" style={{ marginTop: '8px' }}>注：欺诈识别包含分解住院、过度医疗、团伙欺诈等</div>
          </div>
        </aside>
      </div>

      <div className="card" style={{ marginTop: '12px' }}>
        <div style={{ fontWeight: 700, marginBottom: '8px' }}>医保数据表 · 欺诈识别 / 基金收支 / DRG 监测</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>机构名称</th>
                <th>疑似欺诈次数</th>
                <th>涉案金额</th>
                <th>入组率</th>
                <th>CMI</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} onClick={() => onRowClick(Object.values(row).join(' | '))}>
                  <td>{row.机构名称}</td>
                  <td>{row.疑似欺诈次数}</td>
                  <td>{row.涉案金额}</td>
                  <td>{row.入组率}</td>
                  <td>{row.CMI}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default MedicalInsurance;