import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import PasswordModal from './passwordPage';
import { userLogin } from '../resource';
import './loginPage.css';
import hunterCarImg from '../assets/hunter_car.jpg';

const onFinish = async (values) => {
  const { username, password } = values;
  // const result = await userLogin(username, password);
  // console.log(result);
  window.location.href = 'manage';

};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LoginPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleOpen = () => {
    setIsModalVisible(true);
  };

  return (
    <div className='login-page'>
      <div className='login-div'>
        <img src={hunterCarImg} />
        <h2>Car Hunter</h2>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className='login-form'
        >
          <Form.Item
            label="帳號"
            name="username"
            rules={[
              {
                required: true,
                message: '請輸入帳號!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密碼"
            name="password"
            rules={[
              {
                required: true,
                message: '請輸入密碼!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item style={{ float: 'right' }}>
            <Space>
              <Button onClick={handleOpen}>
                更改密碼
              </Button>
              <Button type="primary" htmlType="submit" >
                登入
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <PasswordModal visible={isModalVisible} onClose={handleClose} />
      </div>
    </div>

  );
};

export default LoginPage;