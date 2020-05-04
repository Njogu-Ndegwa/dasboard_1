import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeAppTheme } from '../components/i18n/actions'
import { view as Header } from '../components/header';
import { view as Sidebar } from '../components/sidebar';
import { routes } from '../routes';
import NotFound from './404';
import { getSession } from './getSession';

import styles from './home.module.css';

const HomePage = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarWidth = collapsed ? 80 : 256;
    const sidebarStyle = {
        flex: '0 0 ' + sidebarWidth + 'px',
        width: sidebarWidth + 'px'
    };
    const onThemeChange = (theme) => {
        props.changeTheme(theme);
    }

    return (
        <div className="ant-layout ant-layout-has-sider">
            <div style={sidebarStyle} className={`ant-layout-sider ant-layout-sider-${props.theme}`}>
                <Sidebar collapsed={collapsed} onThemeChange={onThemeChange} theme={props.theme} />
            </div>
            <div className={`${styles['content-wrapper']} ant-layout`}>
                <div className={`${styles.header} ant-layout-header`}>
                    <Header collapsed={collapsed} setCollapsed={setCollapsed} locales={props.locales} />
                </div>
                <div className={`${styles.content} ant-layout-content`}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    // render={props => <route.component {...props} />}
                                    render={ props=> ( getSession() ?  <route.component {...props}/> : (     <Redirect  to ={{ pathname: '/login', state: { reason: 'User is not active' } }}/>  ) ) }
                                    
                                />
                            ) : null;
                        })}
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = state => ({
    theme: state.theming.theme,
    locales: state.i18ning.locales,
});
const mapDispachToProps = (dispatch, props) => ({
    changeTheme: (theme) => {
        dispatch(changeAppTheme(theme));
    }
});
export default connect(mapStateToProps, mapDispachToProps)(HomePage);