import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Tasks.css';

const TaskDetail = () => {
  const { taskType } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [showSolution, setShowSolution] = useState(false);

  // Все задания с полной реализацией
  const tasks = {
    'sql-injection': {
      title: "SQL инъекция",
      description: "Обойдите аутентификацию с помощью SQL-инъекции",
      instructions: [
        "1. Введите SQL-команду в поле логина",
        "2. Пример: ' OR '1'='1",
        "3. Если система уязвима, вы получите доступ"
      ],
      solution: "Решение: ' OR 1=1 --",
      checkSolution: (input) => input.includes("' OR") || input.includes("1=1"),
      inputType: 'text'
    },
    'xss-attack': {
      title: "XSS атака",
      description: "Внедрите скрипт для вызова alert",
      instructions: [
        "1. Введите XSS-скрипт в поле комментария",
        "2. Если система уязвима, появится alert"
      ],
      solution: "Решение: <script>alert(1)</script>",
      checkSolution: (input) => input.includes('<script>'),
      inputType: 'textarea'
    },
    'csrf': {
      title: "CSRF эксплоит",
      description: "Создайте вредоносную форму для изменения данных",
      instructions: [
        "1. Создайте HTML-форму с действием на целевой сайт",
        "2. Добавьте скрытые поля с измененными данными",
        "3. Заманите жертву на вашу страницу"
      ],
      solution: `<form action="https://site.com/change-email" method="POST">
  <input type="hidden" name="email" value="hacker@example.com">
</form>`,
      checkSolution: (input) => input.includes('action="http'),
      inputType: 'textarea'
    },
    'bruteforce': {
      title: "Перебор паролей",
      description: "Подберите пароль администратора",
      instructions: [
        "1. Попробуйте стандартные пароли",
        "2. Пример: admin, password, 123456"
      ],
      solution: "Решение: admin123",
      checkSolution: (input) => input === 'admin123',
      inputType: 'password'
    },
    'lfi': {
      title: "LFI уязвимость",
      description: "Получите доступ к системным файлам",
      instructions: [
        "1. Используйте path traversal в параметре файла",
        "2. Если уязвимость есть, увидите содержимое файла"
      ],
      solution: "Решение: ../../../../etc/passwd",
      checkSolution: (input) => input.includes('../'),
      inputType: 'text'
    },
    'mitm': {
      title: "MITM атака",
      description: "Перехватите трафик между клиентом и сервером",
      instructions: [
        "1. Запустите сниффер (Wireshark, tcpdump)",
        "2. Найдите HTTP-запросы без шифрования",
        "3. Извлеките учетные данные из трафика"
      ],
      solution: "Используйте: tcpdump -i eth0 -A port 80",
      checkSolution: () => true,
      inputType: 'none'
    },
    'deserialization': {
      title: "Десериализация",
      description: "Эксплуатируйте уязвимость десериализации",
      instructions: [
        "1. Найдите точку ввода сериализованных данных",
        "2. Создайте вредоносный сериализованный объект",
        "3. Отправьте на сервер для выполнения кода"
      ],
      solution: "Пример: {\"key\":\"value\",\"__proto__\":{\"isAdmin\":true}}",
      checkSolution: (input) => input.includes('__proto__'),
      inputType: 'textarea'
    },
    'idor': {
      title: "IDOR уязвимость",
      description: "Получите доступ к чужим данным через ID подмену",
      instructions: [
        "1. Найдите параметр ID в URL или запросе",
        "2. Измените на ID другого пользователя",
        "3. Если нет проверок, получите чужие данные"
      ],
      solution: "Замените /user/123 на /user/456",
      checkSolution: (input) => input.match(/\d+/)?.[0] === '456',
      inputType: 'text'
    }
  };

  const currentTask = tasks[taskType];

  if (!currentTask) {
    return (
      <div className="task-not-found">
        <h2>Задание не найдено</h2>
        <button onClick={() => navigate('/tasks')}>Вернуться к списку</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTask.checkSolution(input)) {
      setResult('✅ Успех! Задание выполнено.');
    } else {
      setResult('❌ Неверное решение. Попробуйте еще.');
    }
  };

  const renderInput = () => {
    switch(currentTask.inputType) {
      case 'textarea':
        return (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите ваш эксплоит"
          />
        );
      case 'text':
      case 'password':
        return (
          <input
            type={currentTask.inputType}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Введите ${currentTask.title.toLowerCase()}`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="task-detail">
      <button className="back-button" onClick={() => navigate('/tasks')}>
        ← Назад к заданиям
      </button>

      <h1>{currentTask.title}</h1>
      <p className="task-description">{currentTask.description}</p>

      <div className="task-instructions">
        <h3>Инструкция:</h3>
        <ul>
          {currentTask.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>

      {currentTask.inputType !== 'none' && (
        <form onSubmit={handleSubmit} className="task-form">
          {renderInput()}
          <button type="submit">Проверить</button>
        </form>
      )}

      {result && <div className="task-result">{result}</div>}

      <div className="task-solution">
        <button 
          onClick={() => setShowSolution(!showSolution)}
          className="solution-button"
        >
          {showSolution ? 'Скрыть решение' : 'Показать решение'}
        </button>
        {showSolution && (
          <pre className="solution-content">
            {currentTask.solution}
          </pre>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;