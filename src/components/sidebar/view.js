import React, { useState } from 'react';
import data from './data';
import { Link } from 'react-router-dom';
import {  Menu, Switch, Icon } from 'antd';
import styles from './sidebar.module.css';
import logo from '../../assets/images/logo-dark.png';
import lightlogo from '../../assets/images/logo-light.png';
import minilogo from '../../assets/images/mini-logo-trans.png';
import ScrollBar from '../ScrollBar'
import { Trans } from '@lingui/macro';
const { SubMenu } = Menu;

const Sidebar = ({ collapsed, onThemeChange, theme }) => {

  const [current, setCurrent] = useState('overview');

  return (
    <div className="ant-layout-sider-children">
      <div className={styles.logo}>
        <a href="/">
          {collapsed ? <img src={minilogo} alt="logo" /> : (theme === 'dark' ? <img src={logo} alt="logo" /> : <img src={lightlogo} alt="logo" />)}
        </a>
      </div>
      <ScrollBar
        style={{ height: '85%' }}
        options={{
          // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
          suppressScrollX: true,
        }}
      >
        <Menu
          theme={theme}
          onClick={(e) => setCurrent(e.key)}
          style={{ padding: '16px 0', width: '100%' }}
          defaultOpenKeys={['overview', 'sub-res', 'sub-other']}
          selectedKeys={[current]}
          mode="inline"
          inlineCollapsed={collapsed}
        >
          {
            data.map((item) => {
              if (item.children instanceof Array) {
                return (
                  <SubMenu key={item.key}
                    title={<span><Icon type={item.icon} /><span><Trans>{item.label}</Trans></span></span>}>
                    {
                      item.children.map((subItem) => (
                        
                        <Menu.Item key={subItem.key}>
                          <Link to={subItem.url}><Trans>{subItem.label}</Trans></Link>
                        </Menu.Item>
                        
                      ))
                    }
                  </SubMenu>
                )
              } else {
                return (
                  <Menu.Item key={item.key}>
                    <Link to={item.url}>
                      <Icon type={item.icon} /><span><Trans>{item.label}</Trans></span>
                    </Link>
                  </Menu.Item>
                )
              }
            })
          }
        </Menu>
      </ScrollBar>
      {collapsed ? null : (
        <div className={styles.switchTheme}>
          <span>
            <Icon type="bulb" />
            Switch Theme
            </span>
          <Switch
            onChange={onThemeChange.bind(this, theme === 'dark' ? 'light' : 'dark')}
            defaultChecked={theme === 'dark'}
            checkedChildren={`Dark`}
            unCheckedChildren={`Light`}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;