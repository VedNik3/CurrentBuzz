import React from 'react';

const TopicGrid = ({ selectedTopics, handleViewTopic, handleRemoveTopic }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {selectedTopics.length > 0 ? (
                selectedTopics.map((topic) => (
                    <div
                        key={topic._id}
                        className="bg-blue-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                        <div className="relative">
                            <img
                                src={topic.imageurl}
                                alt={topic.topic}
                                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">{topic.topic}</h3>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleViewTopic(topic.topic)}
                                    className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleRemoveTopic(topic._id)}
                                    className="flex-1 px-4 py-2 bg-gray-400 text-white border border-gray-200 rounded-lg font-medium hover:bg-red-600 active:bg-red-700 transition-colors duration-200"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full flex items-center justify-center min-h-[200px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">No topics selected yet...</p>
                </div>
            )}
        </div>
    );
};

export default TopicGrid;