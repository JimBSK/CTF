const [messages, setMessages] = useState([]);

useEffect(() => {
  const ws = new WebSocket('wss://your-ctf-platform.com/chat');
  
  ws.onmessage = (e) => {
    setMessages(prev => [...prev, JSON.parse(e.data)]);
  };
}, []);

const sendMessage = (text) => {
  ws.send(JSON.stringify({ text, user: currentUser }));
};