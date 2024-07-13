import React from 'react';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { Table, Upload, Button, message, Spin, Modal } from 'antd';
import { saveAs } from 'file-saver';

import { getBingoData, getUserData, uploadFile, setUserAuth } from '../resource';
import { getToken, setToken, setUUid } from './localStorage';
import { errorType, warnType } from '../common/common';
import './managePage.css';

class Manage extends React.PureComponent {
  state = {
    data: [],
    token: '',
    isLoading: false,
    count: {},
    error: false,
  };
  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = async () => {
    const token = getToken();
    const result = await getUserData(token);
    if (result['status'] > 0) {
      this.setState({
        data: result['data'],
        token
      });
    } else if (result['status'] < 0) {
      this.setState({
        error: true
      });
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
            if (!warnType.includes(result['status'])) {
              window.location.href = '/';
            }
          }
        },
      });
    } else {
      window.location.href = '/';
    }

  };

  handleDownload = async () => {
    const response = await getBingoData(this.state.token);
    let filename = 'bingo-file.dbf';
    // 使用 file-saver 保存文件
    saveAs(response.data, filename);
  };

  handleUpload = async (file) => {
    const type = file.name.split('.')[1];
    if (type !== 'dbf') {
      message.warning('請重新上傳副檔名為dbf的檔案');
      return false;
    }
    this.setState({ isLoading: true });
    const result = await uploadFile(this.state.token, file);

    if (result['status'] > 0) {
      message.success('上傳成功');
      this.setState({
        count: result['data'],
        isLoading: false
      });
      return false;
    } else {
      message.warning(result['data']);
      console.log('err', result['data']);
      this.setState({ isLoading: false });
    }
    return false;
  };

  hundleAuth = async (record, type) => {
    const { uuid } = record;
    this.setState({ isLoading: true });
    const result = await setUserAuth(this.state.token, uuid, type);
    if (result['status'] > 0) {
      message.success('更新成功');
      this.fetchData();
    } else {
      message.warning(result['data']);
      console.log('err', result['data']);
    }
    this.setState({ isLoading: false });
  };

  columns = [
    {
      title: '名稱',
      dataIndex: 'nick',
      key: 'nick',
      width: 250,
      render: (text) => <span>{text}</span>
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Device_UUID',
      dataIndex: 'uuid',
      key: 'uuid',
      width: 350,
      render: (text) => <span style={{ width: 330, display: 'inline-flex', whiteSpace: 'pre', wordWrap: 'break-word', wordBreak: 'break-word' }}>{text}</span>
    },
    {
      title: '電話',
      dataIndex: 'cell',
      key: 'cell',
      width: 150,
      render: (text) => <span>{text}</span>
    },
    {
      title: 'App 授權',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 150,
      render: (text, record) => {
        return (
          <React.Fragment>
            {text > 0 ? (<span> 已授權 </span>) : (
              <Button onClick={() => this.hundleAuth(record, 1)}>待認證</Button>
            )}
          </React.Fragment>
        );
      }
    }
    ,
    {
      title: '',
      dataIndex: 'cancel',
      key: 'cancel',
      align: 'center',
      width: 150,
      render: (_, record) => {
        if (record.status > 0) {
          return (
            <Button onClick={() => this.hundleAuth(record, -1)}>取消授權</Button>
          );
        } else {
          return null;
        }

      }
    }
  ];
  render () {
    const { data, isLoading, count, error } = this.state;
    console.log(error);
    return (
      <React.Fragment>
        <Spin spinning={isLoading} size="large" tip="更新檔案中...">
          <div style={{ margin: 20 }} className='mask'>
            <div style={{ display: 'flex' }}>
              <div className='grid-div'>
                <Upload
                  showUploadList={false}
                  accept='.dbf'
                  beforeUpload={this.handleUpload}
                >
                  <Button icon={<UploadOutlined />} disabled={error}>上傳新車單</Button>
                </Upload>
                {count['insert_rows'] !== undefined ? (
                  <span style={{ marginLeft: 8 }}>
                    已更新: {count['insert_rows']}筆車單
                  </span>
                ) : null}

              </div>
              <div className='grid-div'>
                <Button icon={<DownloadOutlined />} disabled={error} onClick={this.handleDownload}>下載當月Bingo車輛</Button>
              </div>
            </div>

            <div className='user-lists'>
              <h3>使用者列表</h3>
              <Table
                size='small'
                rowKey={(record => record.uuid)}
                columns={this.columns}
                style={{ height: 'calc(100vh - 215px)' }}
                dataSource={data}
                scroll={{ x: '1000', y: 'calc(100vh - 315px)' }}
                pagination={false}
                bordered
                footer={(e) => { return (<span>未授權：{e.filter(d => d.status <= 0)?.length || 0}，已授權：{e.filter(d => d.status > 0)?.length || 0}</span>); }}
              />
            </div>
          </div>
        </Spin>
      </React.Fragment>


    );
  }
}

export default Manage;