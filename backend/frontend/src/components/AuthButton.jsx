import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';

const AuthButton = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Переход на страницу авторизации
  };

  return (
    <Button 
      type="primary" 
      icon={<LoginOutlined />}
      onClick={handleLoginClick}
      style={{ marginLeft: 'auto' }}
    >
      Вход
    </Button>
  );
};

export default AuthButton;