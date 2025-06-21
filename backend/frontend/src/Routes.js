import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';


// Удаляем дублирующийся импорт и используем lazy-загрузку
const TasksList = lazy(() => import('./pages/Tasks/TasksList'));
const TaskDetail = lazy(() => import('./pages/Tasks/TaskDetail'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<TasksList />} />
      <Route path="/tasks/:id" element={<TaskDetail />} />
      <Route path="/task/:taskType" element={<TaskDetail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}