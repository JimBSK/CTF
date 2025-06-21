import AuthButton from './AuthButton';

const Header = () => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      background: '#001529',
      height: '64px'
    }}>
      <div style={{ color: 'white', fontSize: '1.2rem' }}>CTF Platform</div>
      <AuthButton /> {/* Добавляем кнопку входа */}
    </header>
  );
};