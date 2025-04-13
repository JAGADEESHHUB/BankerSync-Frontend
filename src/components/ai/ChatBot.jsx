import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Typography, Avatar, CircularProgress } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { chatWithAI } from '../../api/aiApi';
import QuickPrompts from './QuickPrompts';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handlePromptClick = (promptText) => {
    setInput(promptText);
    // Focus on the input field after setting the text
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithAI(input);
      const aiMessage = { text: response, sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      const errorMessage = { text: "Sorry, I couldn't process your request. Please try again.", sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      console.error('Error chatting with AI:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box sx={{ height: 'calc(100vh - 128px)', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 1,
            }}
          >
            {msg.sender === 'ai' && (
              <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>AI</Avatar>
            )}
            <Box
              sx={{
                maxWidth: '70%',
                p: 1,
                borderRadius: '8px',
                bgcolor: msg.sender === 'user' ? 'primary.light' : 'background.paper',
                color: msg.sender === 'user' ? 'white' : 'text.primary',
              }}
            >
              {msg.text}
            </Box>
            {msg.sender === 'user' && (
              <Avatar sx={{ ml: 1, bgcolor: 'secondary.main' }}>You</Avatar>
            )}
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
            <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>AI</Avatar>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            <Typography variant="body1" color="text.secondary">
              Typing...
            </Typography>
          </Box>
        )}
        <div ref={chatBottomRef} /> {/* Invisible element to help with scrolling */}
      </Box>
      <Box sx={{ p: 2 }}>
        <QuickPrompts onPromptClick={handlePromptClick} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          sx={{ mr: 1 }}
          inputRef={inputRef}
          InputProps={{
            sx: {
              '& input': {
                color: 'white'
              },
              '& input::placeholder': {
                color: 'white'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
              }
            }
          }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBot;