import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, DatePicker, Spin } from 'antd';
import { BarChart, PieChart } from '../../components/Charts';
import api from '../../api/statistics';
import { useTheme } from '../../context/ThemeContext';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Statistics = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('week');
  const [dates, setDates] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    fetchStats();
  }, [timeRange, dates, theme]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const params = {
        range: timeRange,
        start_date: dates[0]?.format('YYYY-MM-DD'),
        end_date: dates[1]?.format('YYYY-MM-DD'),
        theme: theme.mode
      };
      const stats = await api.getStatistics(params);
      setData(stats);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, background: theme.palette.background.default }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Select
            value={timeRange}
            onChange={setTimeRange}
            style={{ width: 200 }}
          >
            <Option value="day">За день</Option>
            <Option value="week">За неделю</Option>
            <Option value="month">За месяц</Option>
            <Option value="custom">Выбрать даты</Option>
          </Select>
        </Col>
        {timeRange === 'custom' && (
          <Col span={12}>
            <RangePicker 
              onChange={setDates} 
              style={{ width: '100%' }}
            />
          </Col>
        )}
      </Row>

      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card 
              title="Решенные задачи по категориям"
              style={{ background: theme.palette.cardBackground }}
            >
              <PieChart 
                data={data.category_stats} 
                title="Распределение по категориям"
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card 
              title="Активность пользователей"
              style={{ background: theme.palette.cardBackground }}
            >
              <BarChart 
                data={data.user_activity} 
                title="Активность по дням"
              />
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default Statistics;