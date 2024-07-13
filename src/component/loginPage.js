import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Input, message, Space, Modal } from 'antd';
import { userLogin, userUnTokenLogin, getUserData } from '../resource';
import { v4 as uuidv4 } from 'uuid';
import hunterCarImg from '../assets/hunter_car.jpg';
import { getToken, getUUid, setToken, setUUid } from './localStorage';
import { errorType } from '../common/common';
import './loginPage.css';

const onFinish = async (values) => {
  const { nick, cell, email } = values;
  const uuid = uuidv4();
  const result = await userUnTokenLogin(uuid, cell, email, nick);
  if (result['status'] >= 0) {
    setToken(result['data']);
    setUUid(uuid);
    Modal.info({
      content: (
        <div>
          <span>請通知系統人員授權</span>
        </div>
      ),
      onOk () { window.location.reload(); },
    });
  } else {
    message.warning(result['data']);
  }
};

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [hasUUID, setUUID] = useState('');

  useEffect(() => {
    fetchLogin();
  }, []);

  const fetchLogin = async () => {
    const uuid = getUUid();
    const token = getToken();
    if (!uuid || !token) {
      setIsLogin(true);
    } else {
      const result = await userLogin(uuid, token);
      if (result['status'] > 0) {
        setToken(result['data']);
        window.location.href = 'admin';
      } else if (result['status'] < 0) {
        Modal.error({
          content: (
            <div>
              <span>{result['data']}</span>
            </div>
          ),
          onOk () {
            if (errorType.includes(result['status'])) {
              setToken('');
              setUUid('');
            } else {
              setUUID(uuid);
            }
            Modal.destroyAll();
          },
          destroyOnClose: true
        });
      } else {
        setUUID(uuid);
      }
    };
  };

  return (
    <div className='login-page'>
      <img src={hunterCarImg} alt='car hunter' />
      <h2>Car Hunter</h2>
      {hasUUID !== '' ? (<span>請致電系統人員(0917-992-197)</span>) : null}
      {isLogin ? (
        <div className='login-div'>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            className='login-form'
          >
            <Form.Item
              label="簡稱"
              name="nick"
              rules={[
                {
                  required: true,
                  message: '請輸入簡稱!',
                },
              ]}

            >
              <Input />
            </Form.Item>

            <Form.Item
              label="電話"
              name="cell"
              rules={[
                {
                  required: true,
                  message: '請輸入電話!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="email"
              name="email"

              rules={[
                {
                  required: true,
                  message: '請輸入email!',
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item style={{ float: 'right', marginTop: 24, marginBottom: 10 }}>
              <Space>
                <Button type="primary" htmlType="submit" >
                  送出授權申請
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      ) : null}

    </div>

  );
};

export default LoginPage;