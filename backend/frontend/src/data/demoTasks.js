// src/data/demoTasks.js
export const demoTasks = [
  {
    id: 1,
    title: "SQL инъекция",
    description: "Взломайте форму входа с помощью SQL-инъекции",
    difficulty: "легкая",
    category: "web",
    flag: "CTF{sql_inject}",
    solution: "' OR 1=1 --"
  },
  {
    id: 2,
    title: "XSS атака",
    description: "Внедрите скрипт для вызова alert",
    difficulty: "средняя",
    category: "web",
    flag: "CTF{xss_attack}",
    solution: "<script>alert(1)</script>"
  }
];