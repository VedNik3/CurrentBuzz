import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopicGrid from './TopicGrid';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import {API_END_POINT_USER, API_END_POINT_FRONTPAGE} from '../utils/constanta'


const Index = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [newlySelectedTopics, setNewlySelectedTopics] = useState([]);
    const [token, setToken] = useState();
    const [userrole, setUserrole] = useState();
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    const hasActiverootRun = useRef(false);

    const gottoken = localStorage.getItem('token');

    const handleCheckboxChange = (topic) => {
        setNewlySelectedTopics(prev => {
            const isAlreadySelected = prev.some(t => t.topic === topic);
            if (isAlreadySelected) {
                return prev.filter(t => t.topic !== topic);
            }
            return [...prev, { topic }];
        });
    };

    const handlesearch = async (query) => {
    try {
        // console.log(query);
        const response = await axios.post(`${API_END_POINT_USER}/search`,{query},{
            headers: {
                Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
             },
        })
        setArticles(response.data);
            // navigate('/newspage', {articles});
            navigate('/newspage', { state: { articles: response.data.articles } });
        toast.success('query searched');
    } catch (error) {
        toast.error('error searching query');
    }
    };

    const handleRemoveTopic = async (topicId) => {
        try {
            const response = await axios.post(`${API_END_POINT_USER}/remove`,{topicId}, {
                headers: {
                     Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
            });
            if (response.status === 200) {
                
                setSelectedTopics((prev) => prev.filter((topic) => topic._id !== topicId));
    
                toast.success('Topic removed successfully');
            }
   
        } catch (error) {
            console.error('Error Viewing', error);
            toast.error('Error removing topic');
        }
    };

    const handleViewTopic = async (topicName) => {
        
        try {
            const response = await axios.post(`${API_END_POINT_USER}/view`,{topicName}, {
                headers: {
                     Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
            });

            setArticles(response.data);
            navigate('/newspage', { state: { articles: response.data.articles } });
                  
        } catch (error) {
            console.error('Error Viewing', error);
            toast.error('Try after sometime');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUserrole(true);
        hasActiverootRun.current = false;
        window.location.reload();
    };

    useEffect(() => {
        if (!hasActiverootRun.current) {
            activeroot();
            hasActiverootRun.current = true;
           
        }
    }, []);

    useEffect(() => {
        
    }, [selectedTopics,newlySelectedTopics]);
    

    const activeroot = async () => {
        try {
            const response = await axios.get(`${API_END_POINT_FRONTPAGE}`);
            const guesttoken = response.data.token;
            setToken(guesttoken);
        } catch (error) {
            console.error('Error starting', error);
        }
    };

    const fetchIndexpagedata = async () => {
        try {
            if(gottoken != null){
                setToken(gottoken );
                
            };
            
            const response = await axios.get(`${API_END_POINT_USER}/index`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setTopics(response.data.topics);
            setSelectedTopics(response.data.selectedTopicArrays);
            setUserrole(response.data.userrole);
            
        } catch (error) {
            console.error('Error fetching index page data', error);
        }
    };

    useEffect(() => {
        fetchIndexpagedata();
    }, [token]);

    const handleTopicSubmit = async (e) => {
        e.preventDefault();
        if (userrole) {
            navigate('/signin');
            return;
        }
     try {
        
        const response = await axios.post(`${API_END_POINT_FRONTPAGE}/submit`,newlySelectedTopics, {
            headers: {
                 Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
        });

        if (response.status === 200) {
            await fetchIndexpagedata();
            setNewlySelectedTopics([]);
            toast.success('Topic added successfully');
            
          } else {
            console.error('Error: ', response.data.message);
          }
        
     } catch (error) {
        console.error('Error starting', error);
     }

    };

    return (
        //   navbar
        <div className="min-h-screen bg-gradient-to-b from-gray-200 via-gray-100 to-blue-100">
            <Navbar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handlesearch={handlesearch}
                userrole={userrole}
                handleLogout={handleLogout}
            />

           {/* sibebar */}
           <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
           <div className="flex flex-col md:flex-row gap-4 md:gap-6">
           <div className='md:sticky md:top-24 md:h-[calc(100vh-6rem)]'>
                    <Sidebar 
                        topics={topics}
                        selectedTopics={selectedTopics}
                        newlySelectedTopics={newlySelectedTopics}
                        handleTopicSubmit={handleTopicSubmit}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                    </div>
                  
                  {/*Topic grid */}
                    <main className="flex-1">
                        <TopicGrid 
                            selectedTopics={selectedTopics}
                            handleViewTopic={handleViewTopic}
                            handleRemoveTopic={handleRemoveTopic}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Index;