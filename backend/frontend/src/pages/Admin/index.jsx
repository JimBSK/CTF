import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Input, Space, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import api from '../../api/admin';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      message.error('Ошибка загрузки пользователей');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Имя',
      dataIndex: 'username',
      key: 'username',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Поиск по имени"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={confirm}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button type="primary" onClick={confirm} icon={<SearchOutlined />} size="small">
            Поиск
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.username.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      render: role => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => banUser(record.id)}>Забанить</Button>
          <Button type="primary" onClick={() => makeAdmin(record.id)}>
            Сделать админом
          </Button>
        </Space>
      ),
    },
  ];

  const banUser = async (userId) => {
    await api.banUser(userId);
    message.success('Пользователь забанен');
    fetchUsers();
  };

  const makeAdmin = async (userId) => {
    await api.makeAdmin(userId);
    message.success('Права изменены');
    fetchUsers();
  };

  return (
    <div style={{ padding: 24 }}>
      <Table 
        columns={columns} 
        dataSource={users} 
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default AdminPanel;