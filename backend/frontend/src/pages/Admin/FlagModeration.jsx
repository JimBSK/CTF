import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Modal, Badge } from 'antd';
import api from '../../api/moderation';

const FlagModeration = () => {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    setLoading(true);
    try {
      const data = await api.getPendingFlags();
      setFlags(data);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (flagId) => {
    await api.approveFlag(flagId);
    message.success('Флаг подтверждён');
    fetchFlags();
  };

  const handleReject = async (flagId) => {
    Modal.confirm({
      title: 'Отклонить флаг?',
      content: 'Укажите причину отклонения:',
      onOk: async (reason) => {
        await api.rejectFlag(flagId, reason);
        message.success('Флаг отклонён');
        fetchFlags();
      },
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Пользователь',
      dataIndex: 'user',
      key: 'user',
      render: user => user.username,
    },
    {
      title: 'Задача',
      dataIndex: 'challenge',
      key: 'challenge',
      render: challenge => challenge.title,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Badge 
          status={status === 'approved' ? 'success' : 'warning'} 
          text={status === 'pending' ? 'На проверке' : 'Подтверждён'}
        />
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            onClick={() => handleApprove(record.id)}
            disabled={record.status !== 'pending'}
          >
            Подтвердить
          </Button>
          <Button 
            danger
            onClick={() => handleReject(record.id)}
            disabled={record.status !== 'pending'}
          >
            Отклонить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={flags}
      loading={loading}
      rowKey="id"
      title={() => <h3>Модерация флагов</h3>}
    />
  );
};

export default FlagModeration;