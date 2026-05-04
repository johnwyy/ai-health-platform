import React from 'react';

const menuItems = [
  {
    id: 'dashboard',
    label: '领导驾驶舱',
    subLabel: '综合态势一张图',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 12h8v8H3zM13 3h8v8h-8zM13 13h8v8h-8zM3 3h8v8H3z" fill="#9fb0d8" />
      </svg>
    ),
  },
  {
    id: 'weijian',
    label: '卫健监管子系统',
    subLabel: '医疗质量、机构、人员、药械',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16v12H4z" fill="#9fb0d8" />
      </svg>
    ),
  },
  {
    id: 'yibao',
    label: '医保监管子系统',
    subLabel: '基金监管、DRG/DIP、集采',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 6h18v12H3z" fill="#9fb0d8" />
      </svg>
    ),
  },
  {
    id: 'gongwe',
    label: '公卫管理子系统',
    subLabel: '传染病、慢病、妇幼、老龄',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l8 20H4z" fill="#9fb0d8" />
      </svg>
    ),
  },
  {
    id: 'ai',
    label: 'AI监测预警中心',
    subLabel: '监测、预警、处置闭环',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l9 4v12l-9 4-9-4V6z" fill="#9fb0d8" />
      </svg>
    ),
  },
  {
    id: 'decision',
    label: '决策分析系统',
    subLabel: '资源配置、预测模拟、政策评估',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M2 12h20" stroke="#9fb0d8" strokeWidth="1.5" />
      </svg>
    ),
  },
];

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">AI</div>
        <div>
          <div className="title">AI健康城区综合监管平台</div>
          <div className="subtitle">PRD V1.5 演示原型</div>
        </div>
      </div>

      <div className="menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <div>
              <div style={{ fontWeight: 700 }}>{item.label}</div>
              <div className="small">{item.subLabel}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="menu-footer">
        <div className="small">环境：演示数据 · 离线单文件</div>
      </div>
    </aside>
  );
}

export default Sidebar;