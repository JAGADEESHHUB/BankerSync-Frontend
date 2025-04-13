import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, Box } from '@mui/material';
import { Dashboard, People, AccountBalance, Chat, LightMode, DarkMode } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Sidebar.module.css';

const DRAWER_WIDTH = 240;

const sidebarItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Customers', icon: <People />, path: '/customers' },
  { text: 'Loans', icon: <AccountBalance />, path: '/loans' },
  { text: 'AI Chat', icon: <Chat />, path: '/ai-chat' },
];

const Sidebar = ({ open, closeSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useTheme();
  const isDarkMode = mode === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);
  
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: 'var(--main-container-bg)',
          color: 'var(--text-color)',
        },
      }}
    >
      <div className={styles.sidebarWrapper}>
        <Toolbar />
        <div className={styles.themeContainer}>
          <div
            className={styles.themeToggle}
            data-theme={isDarkMode ? 'dark' : 'light'}
            onClick={toggleTheme}
          >
            <div className={styles.themeType}>
              <LightMode sx={{ mr: 1 }} />
              Light
            </div>
            <div className={styles.themeType}>
              <DarkMode sx={{ mr: 1 }} />
              Dark
            </div>
            <div className={styles.themeSlider} />
          </div>
        </div>
        <Divider />
        <List>
          {sidebarItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                closeSidebar();
              }}
              className={`${styles.listItem} ${location.pathname === item.path ? styles.selected : ''}`}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;