import React, { useState } from 'react';
import { StarOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Manage from './component/managePage';
import PasswordPage from './component/passwordPage';

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: 'manage',
    label: '管理者頁面',
    icon: <StarOutlined />,
  },
  {
    key: 'password',
    label: '密碼設定',
    icon: <UserOutlined />,
  },
];

const App = () => {
  const [page, setPage] = useState('manage');
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo"><StarOutlined /> </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[page]}
          items={items}
          onClick={e => setPage(e.key)}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '10px 24px',
        }}
      >
        {page === 'manage' ? <Manage /> : <PasswordPage />}
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Car Hunter ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};
export default App;