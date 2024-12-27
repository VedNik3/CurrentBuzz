import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_END_POINT_USER } from '../utils/constanta';
import { Menu, X, Globe, ChevronDown, Search } from 'lucide-react';

const Navbar = ({ handlesearch, userrole, handleLogout, showLanguage = true }) => {
    const navigate = useNavigate();
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const token = localStorage.getItem('token');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'de', name: 'German' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ja', name: 'Japanese' },
        { code: 'tr', name: 'Turkish' },
        { code: 'it', name: 'Italian' },
    ];

    const handleSignIn = () => {
        navigate('/signin');
        setIsMobileMenuOpen(false);
    };

    const backtoindex = () => {
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    const toggleLanguageDropdown = () => {
        setIsLanguageOpen(!isLanguageOpen);
    };

    const selectLanguage = async (lang) => {
        setSelectedLanguage(lang.code);
        const languagecode = lang.code;
        setIsLanguageOpen(false);
        try {
            const response = await axios.post(
                `${API_END_POINT_USER}/save-language`,
                { languagecode },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success('Language set successfully');
        } catch (error) {
            toast.error('Error setting language');
            console.log(error);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 border-b border-blue-100 shadow-lg">
            <div className="container mx-auto px-4 py-3">
                <nav className="flex items-center justify-between">
                    {/* Mobile Menu Button */}
                    <button 
                        className="lg:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6 text-blue-600" />
                        ) : (
                            <Menu className="h-6 w-6 text-blue-600" />
                        )}
                    </button>

                    {/* Logo */}
                    <div className="flex-1 flex justify-center lg:justify-start">
                        <svg viewBox="0 0 400 100" className="h-10 lg:h-12 cursor-pointer transform hover:scale-105 transition-transform duration-200" onClick={backtoindex}>
                            <rect x="10" y="20" width="380" height="60" rx="8" fill="#1E40AF" />
                            <path d="M50 30 L65 50 L55 50 L70 70 L45 45 L55 45 L40 30Z" fill="#FFD700" />
                            <text x="85" y="63" fontFamily="Arial" fontWeight="bold" fontSize="32" fill="white">CURRENTBUZZ</text>
                            <line x1="75" y1="40" x2="75" y2="60" stroke="#FFD700" strokeWidth="2" />
                        </svg>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {showLanguage && (
                            <div className="relative">
                                <button
                                    onClick={toggleLanguageDropdown}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                                >
                                    <Globe className="h-5 w-5" />
                                    <span>Languages</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                {isLanguageOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-blue-100 py-1">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => selectLanguage(lang)}
                                                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handlesearch(e.target.value);
                                    }
                                }}
                            />
                        </div>

                        {userrole ? (
                            <button 
                                onClick={handleSignIn} 
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                            >
                                Sign In
                            </button>
                        ) : (
                            <button 
                                onClick={handleLogout} 
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-4 space-y-4 bg-white rounded-lg border border-blue-100 p-4">
                        {showLanguage && (
                            <div className="border-b border-blue-100 pb-4">
                                <button
                                    onClick={toggleLanguageDropdown}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 font-medium"
                                >
                                    <Globe className="h-5 w-5" />
                                    <span>Languages</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                {isLanguageOpen && (
                                    <div className="mt-2 space-y-1 pl-7">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => selectLanguage(lang)}
                                                className="block w-full py-2 text-left text-gray-600 hover:text-blue-600 transition-colors"
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handlesearch(e.target.value);
                                            setIsMobileMenuOpen(false);
                                        }
                                    }}
                                />
                            </div>
                            
                            {userrole ? (
                                <button 
                                    onClick={handleSignIn} 
                                    className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                                >
                                    Sign In
                                </button>
                            ) : (
                                <button 
                                    onClick={handleLogout} 
                                    className="w-full px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;