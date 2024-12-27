import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Sidebar = ({ topics, selectedTopics, newlySelectedTopics, handleTopicSubmit, handleCheckboxChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newlySelectedTopics.length === 0) {
            toast.error('Please select at least one topic');
            return;
        }
        handleTopicSubmit(e);
        setIsOpen(false);
    };

    return (
        <aside className="w-full md:w-64">
            {/* Mobile Toggle */}
            <div className="md:hidden mb-4">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                >
                    <span className="text-xl font-semibold">Topics</span>
                    {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
            </div>

            {/* Content - hidden on mobile unless toggled */}
            <form onSubmit={handleSubmit} className={`${isOpen ? 'block' : 'hidden'} md:block`}>
                <div className="bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100 p-4 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 hidden md:block">Topics</h2>
                    <div className="space-y-2 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
                        {topics.map((topic) => {
                            const isSelected = selectedTopics.some(
                                selectedTopic => selectedTopic.topic === topic.topic
                            );
                            const isNewlySelected = newlySelectedTopics.some(
                                newTopic => newTopic.topic === topic.topic
                            );
                            return (
                                <div key={topic._id} className="flex items-center py-2">
                                    {!isSelected ? (
                                        <>
                                            <input
                                                type="checkbox"
                                                id={topic.topic}
                                                name="topic"
                                                value={topic.topic}
                                                checked={isNewlySelected}
                                                onChange={() => handleCheckboxChange(topic.topic)}
                                                className="rounded border-gray-300 h-5 w-5"
                                            />
                                            <label htmlFor={topic.topic} className="ml-3 text-xl"
                                            style={{
                                                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)", 
                                              }}>
                                                {topic.topic}
                                            </label>
                                        </>
                                    ) : (
                                        <span className="text-gray-500 ml-5 text-base">
                                            {topic.topic}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 text-base font-medium"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </aside>
    );
};

export default Sidebar;