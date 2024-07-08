import React, { useRef, forwardRef } from 'react';
import { Form, Input, Modal } from 'antd';

const PasswordPage = forwardRef(({ onSubmit, onFail }, ref) => (
  <div>
    <Form
      ref={ref}
      name="changePassword"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 12,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onSubmit}
      onFinishFailed={onFail}
      autoComplete="off"
    >
      <Form.Item
        label="舊密碼"
        name="old"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="新密碼"
        name="new"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="再次輸入新密碼"
        name="new2"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  </div>
));

const PasswordModal = ({ visible, onClose }) => {
  const formRef = useRef(null);

  const onFinish = (values) => {
    console.log('Success:', values);
    onClose();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk = () => {
    if (formRef.current) {
      formRef.current.submit(); // 提交表单
    }
  };
  return (
    <Modal
      title="變更密碼"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      maskClosable={false}
      closable={false}
      okText={'送出'}
      cancelText={'取消'}
      style={{ height: 500 }}>
      <PasswordPage ref={formRef} onSubmit={onFinish} onFail={onFinishFailed} />
    </Modal>
  );
};


export default PasswordModal;