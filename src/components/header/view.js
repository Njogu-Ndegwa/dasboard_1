import React from 'react';
import { Dropdown,  Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import * as LocalStorage from '../../util/localstorage';
import styles from './header.module.css';
import HeaderSearch from '../HeaderSearch';
import LanguageSelector from '../i18n/LanguageSelector'
import { logOut } from '../../pages/getSession';

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Link to="/home/setting">
        <Icon type="setting" />&nbsp;Preferences
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <Link to="/login" onClick={ logOut } >
        <Icon type="poweroff" />&nbsp;Sign Out
      </Link>
    </Menu.Item>
  </Menu>
);


const Header = ({ collapsed, setCollapsed }) => {
  return (
    <div className={styles['header-wrapper']}>
      <span className={styles['header-collapsed']} onClick={() => setCollapsed(!collapsed)}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </span>

      <div className={styles['header-user-info']}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder='search'
          dataSource={[]}
          onSearch={value => {
            console.log('input', value);
          }}
          onPressEnter={value => {
            console.log('enter', value);
          }}
        />
        <LanguageSelector />
        <Dropdown overlay={menu} placement="bottomRight">
          <span className={styles['header-dropdown-link']}>
            <Icon type="user" /> {LocalStorage.get('smarthealth_user')} <Icon type="down" />
          </span>
        </Dropdown>
      </div>
    </div>
  );
};
export default Header;