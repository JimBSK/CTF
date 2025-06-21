import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Ошибка загрузки</h2>
          <p>Произошла непредвиденная ошибка</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '8px 16px', marginTop: '10px' }}
          >
            Обновить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;