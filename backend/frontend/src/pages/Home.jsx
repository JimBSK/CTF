import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Импортируем изображения
import shieldIcon from '../assets/icons/shield.png';
import communityIcon from '../assets/icons/community.png';
import bookIcon from '../assets/icons/book.png';
import heroBg from '../assets/images/hero-bg.jpg';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
    import('../utils/scrollAnimation').then(module => {
      module.initScrollAnimations();
    });
  }, []);

  const handleStartCompetition = () => {
    // Можно добавить дополнительную логику перед переходом
    navigate('/tasks');
    
    // Альтернативно: показать модальное окно с пояснением для демо-режима
    // alert('Это демонстрационный режим с тестовыми заданиями');
  };

  return (
    <div className={`home-container ${loaded ? 'loaded' : ''}`}>
      {/* Герой-секция с фоновым изображением */}
      <header 
        className="hero-section"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroBg})` }}
      >
        <div className="hero-content">
          <h1 className="title">CTF Platform</h1>
          <p className="subtitle">Проверь свои навыки кибербезопасности</p>
          <div className="cta-buttons">
            <button 
              className="primary-btn"
              onClick={handleStartCompetition}
            >
              Начать соревнование
            </button>
            <button 
              className="secondary-btn"
              onClick={() => navigate('/login')}
            >
              Войти в систему
            </button>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="code-animation">
            {/* Анимированный код для эффекта "хакинга" */}
            <pre>{`
              > Загрузка CTF-задач...
              > Найдено уязвимостей: 127
              > Анализ системы...
              [=====>] 100%
              > Готов к испытаниям!
            `}</pre>
          </div>
        </div>
      </header>

      {/* Секция преимуществ */}
      <section className="features-section">
        <h2>Почему наша платформа?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-container">
              <img 
                src={shieldIcon} 
                alt="Безопасность" 
                className="feature-icon"
              />
            </div>
            <h3>Реальные задачи</h3>
            <p>Актуальные уязвимости и сценарии из практики</p>
          </div>
          
          <div className="feature-card">
            <div className="icon-container">
              <img 
                src={communityIcon} 
                alt="Сообщество" 
                className="feature-icon"
              />
            </div>
            <h3>Сообщество</h3>
            <p>Общайтесь с другими участниками и экспертами</p>
          </div>
          
          <div className="feature-card">
            <div className="icon-container">
              <img 
                src={bookIcon} 
                alt="Обучение" 
                className="feature-icon"
              />
            </div>
            <h3>Обучение</h3>
            <p>Пошаговые руководства и разборы решений</p>
          </div>
        </div>
      </section>

      {/* Секция статистики */}
      <section className="stats-section">
        <div className="stat-item">
          <span className="stat-number">100+</span>
          <span className="stat-label">Задач</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">Участников</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Доступ</span>
        </div>
      </section>
    </div>
  );
}