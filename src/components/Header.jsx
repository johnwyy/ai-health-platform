import React, { useState, useEffect } from 'react';

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <div className="h-title">AI健康城区综合监管+宏观决策平台</div>
        <div className="h-sub">演示原型 · 基于 PRD V1.5 指标</div>
      </div>
      <div className="header-right">
        <div className="badge">{currentTime.toLocaleString()}</div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div className="small">角色：领导 / 监管人员</div>
        </div>
      </div>
    </div>
  );
}

export default Header;