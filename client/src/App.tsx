import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './styles/index.scss';

const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'default'>('default');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'default' | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        document.body.classList.toggle('light-theme', theme === 'light');
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'default' ? 'light' : 'default';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    return (
        <Router>
            <div className="layout">
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
                <Footer onThemeToggle={handleThemeToggle} />
            </div>
        </Router>
    );
};

export default App;