import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tasks.css'; // Используем общий файл стилей

// Правильные пути к иконкам из папки assets/icons
import ShieldIcon from '../../assets/icons/shield.png';
import LockIcon from '../../assets/icons/lock.png.png'; // Обратите внимание на двойное .png
import CodeIcon from '../../assets/icons/code.png';
import BugIcon from '../../assets/icons/bug.png';
import NetworkIcon from '../../assets/icons/network.png';
import DatabaseIcon from '../../assets/icons/database.png';
import CookieIcon from '../../assets/icons/cookie.png';
import KeyIcon from '../../assets/icons/key.png';
import BookIcon from '../../assets/icons/book.png';
import CommunityIcon from '../../assets/icons/community.png';

const TasksList = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Все');

  // Массив всех задач
  const tasks = [
    {
      id: 1,
      title: "SQL инъекция",
      difficulty: "легкая",
      category: "web",
      description: "Обойдите аутентификацию с помощью SQL-инъекции",
      icon: DatabaseIcon,
      path: '/task/sql-injection'
    },
    {
      id: 2,
      title: "XSS атака",
      difficulty: "средняя",
      category: "web",
      description: "Внедрите скрипт для кражи cookie",
      icon: CodeIcon,
      path: '/task/xss-attack'
    },
    {
      id: 3,
      title: "MITM атака",
      difficulty: "сложная",
      category: "network",
      description: "Перехватите трафик между клиентом и сервером",
      icon: NetworkIcon,
      path: '/task/mitm'
    },
    {
      id: 4,
      title: "Перебор паролей",
      difficulty: "легкая",
      category: "auth",
      description: "Подберите пароль с помощью словарной атаки",
      icon: KeyIcon,
      path: '/task/bruteforce'
    },
    {
      id: 5,
      title: "LFI уязвимость",
      difficulty: "сложная",
      category: "web",
      description: "Получите доступ к системным файлам через уязвимость",
      icon: BugIcon,
      path: '/task/lfi'
    },
    {
      id: 7,
      title: "Десериализация",
      difficulty: "средняя",
      category: "app",
      description: "Эксплуатируйте уязвимость десериализации данных",
      icon: LockIcon,
      path: '/task/deserialization'
    },
    {
      id: 8,
      title: "IDOR уязвимость",
      difficulty: "легкая",
      category: "api",
      description: "Получите доступ к чужим данным через ID подмену",
      icon: ShieldIcon,
      path: '/task/idor'
    }
  ];

  // Функция фильтрации задач
  const getFilteredTasks = () => {
    switch(activeFilter) {
      case 'Web':
        return tasks.filter(task => task.category === 'web');
      case 'Сеть':
        return tasks.filter(task => task.category === 'network');
      case 'Аутентификация':
        return tasks.filter(task => task.category === 'auth');
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>Доступные задания</h1>
        <div className="tasks-filter">
          {['Все', 'Web', 'Сеть', 'Аутентификация'].map(filter => (
            <button
              key={filter}
              className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      <div className="tasks-list">
        {filteredTasks.map(task => (
          <div 
            key={task.id} 
            className="task-item"
            onClick={() => navigate(task.path)}
          >
            <img src={task.icon} alt="" className="task-icon" />
            
            <div className="task-content">
              <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <span className={`difficulty-badge ${task.difficulty}`}>
                  {task.difficulty}
                </span>
              </div>
              
              <p className="task-description">{task.description}</p>
              
              <div className="task-footer">
                <span className="task-category">
                  {task.category === 'web' && 'Web'}
                  {task.category === 'network' && 'Сеть'}
                  {task.category === 'auth' && 'Аутентификация'}
                </span>
                <span className="task-arrow">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;