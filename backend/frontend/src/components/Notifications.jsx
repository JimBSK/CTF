useEffect(() => {
    const ws = new WebSocket('wss://your-ctf-platform.com/notifications');
    
    ws.onmessage = (e) => {
      const notification = JSON.parse(e.data);
      toast(notification.message); // Используйте react-toastify
    };
  }, []);

useEffect(() => {
    const ws = new WebSocket('wss://your-ctf-platform.com/notifications');
    
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'new_flag') {
        toast.success(`Флаг принят! +${data.points} очков`);
      }
    };
  }, []);