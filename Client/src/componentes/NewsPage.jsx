import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_END_POINT_USER } from '../utils/constanta';
import Navbar from './Navbar';

const NewsPage = () => {
    const location = useLocation();
    const { articles } = location.state;
    const [searchQuery, setSearchQuery] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userrole, setUserrole] = useState();
    const navigate = useNavigate();

    const handlesearch = async (query) => {
        try {
            const response = await axios.post(`${API_END_POINT_USER}/search`, 
                {query},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            navigate('/newspage', { state: { articles: response.data.articles } });
            toast.success('Query searched');
        } catch (error) {
            toast.error('Error searching query');
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUserrole(true);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Navbar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handlesearch={handlesearch}
                userrole={false}
                handleLogout={handleLogout}
                showLanguage={false}
            />

            <main className="container mx-auto px-4 py-8 md:py-12">
                {articles && articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                                {article.image && (
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                                    </div>
                                )}
                                <article className="p-6">
                                    <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                                        {article.title}
                                    </h2>
                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        {article.description}
                                    </p>
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-gray-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                                    >
                                        Read more
                                    </a>
                                </article>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-[400px] bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg font-medium">
                            No news available at the moment. Please check back later.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default NewsPage;