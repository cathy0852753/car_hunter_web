import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Table, Upload, Button } from 'antd';

class Manage extends React.PureComponent {
  componentDidMount = () => {

  };

  columns = [
    {
      title: '名稱',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Device_UUID',
      dataIndex: 'deviceUUID',
      key: 'deviceUUID',
      render: (text) => <span>{text}</span>
    },
    {
      title: '電話',
      dataIndex: 'phoneNum',
      key: 'phoneNum',
      render: (text) => <span>{text}</span>
    },
    {
      title: '狀態',
      dataIndex: 'state',
      key: 'state',
      render: (text) => <span>{text}</span>
    }
    ,
    {
      title: '',
      dataIndex: 'cancel',
      key: 'cancel',
      render: (text) => <span>{text}</span>
    }
  ];
  render () {
    return (
      <div style={{ margin: 10 }}>
        <div>
          <Upload>
            <Button icon={<UploadOutlined />}>上傳新車單</Button>
          </Upload>
          <div style={{ marginTop: 10 }}>
            已更新: 100000筆車單
          </div>
        </div>
        <div style={{ marginTop: 15 }}>
          <h3>使用者列表</h3>
          <Table
            columns={this.columns}
            style={{ height: 'calc(100vh - 265px)' }}
          >

          </Table>
        </div>

      </div>

    );
  }
}

export default Manage;