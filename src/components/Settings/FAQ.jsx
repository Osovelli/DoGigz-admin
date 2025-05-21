import React, { useState } from 'react';
import { Button } from '../ui/button';
import CustomModal from '../CustomModal';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';

// Sample FAQ data
const initialFaqs = [
  {
    id: 1,
    question: 'Lorem ipsum dolor',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bibendum orci. Donec feugiat massa mi, at hendrerit mauris rutrum at. Lorem ipsum dolor sit amet,'
  },
  {
    id: 2,
    question: 'Lorem ipsum dolor',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bibendum orci. Donec feugiat massa mi, at hendrerit mauris rutrum at. Lorem ipsum dolor sit amet,'
  },
  {
    id: 3,
    question: 'Lorem ipsum dolor',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel augue sit amet est molestie viverra. Nunc quis bibendum orci. Donec feugiat massa mi, at hendrerit mauris rutrum at. Lorem ipsum dolor sit amet,'
  }
];

const FAQ = () => {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({ id: null, question: '', answer: '' });

  // Handle adding a new FAQ
  const handleAddFaq = () => {
    setCurrentFaq({ id: null, question: '', answer: '' });
    setIsAddModalOpen(true);
  };

  // Handle editing an existing FAQ
  const handleEditFaq = (faq) => {
    setCurrentFaq(faq);
    setIsEditModalOpen(true);
  };

  // Handle deleting an FAQ
  const handleDeleteFaq = (id) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  // Handle saving a new FAQ
  const handleSaveNewFaq = () => {
    if (currentFaq.question.trim() === '' || currentFaq.answer.trim() === '') {
      return; // Don't save empty FAQs
    }
    
    const newFaq = {
      id: faqs.length > 0 ? Math.max(...faqs.map(faq => faq.id)) + 1 : 1,
      question: currentFaq.question,
      answer: currentFaq.answer
    };
    
    setFaqs([...faqs, newFaq]);
    setIsAddModalOpen(false);
  };

  // Handle updating an existing FAQ
  const handleUpdateFaq = () => {
    if (currentFaq.question.trim() === '' || currentFaq.answer.trim() === '') {
      return; // Don't save empty FAQs
    }
    
    setFaqs(faqs.map(faq => 
      faq.id === currentFaq.id ? currentFaq : faq
    ));
    
    setIsEditModalOpen(false);
  };

  // Handle input changes in the modal forms
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFaq({
      ...currentFaq,
      [name]: value
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
        <Button 
          onClick={handleAddFaq}
          className="bg-black text-white rounded-full"
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Add FAQ
        </Button>
      </div>

      <div className="border border-gray-200 rounded-lg">
        {faqs.map((faq) => (
          <div key={faq.id} className="border-b border-gray-200 last:border-b-0">
            <div className="flex p-6">
              <div className="w-1/4 font-medium">
                {faq.question}
              </div>
              <div className="w-3/4 flex justify-between">
                <div className="text-gray-600 pr-4">
                  {faq.answer}
                </div>
                <div className="flex space-x-2 ml-4 flex-shrink-0">
                  <button 
                    onClick={() => handleEditFaq(faq)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteFaq(faq.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add FAQ Modal */}
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Add New FAQ</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              name="question"
              value={currentFaq.question}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter question"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer
            </label>
            <textarea
              name="answer"
              value={currentFaq.answer}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter answer"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button
              onClick={() => setIsAddModalOpen(false)}
              variant="outline"
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveNewFaq}
              className="bg-black text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </CustomModal>

      {/* Edit FAQ Modal */}
      <CustomModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Edit FAQ</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              name="question"
              value={currentFaq.question}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter question"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer
            </label>
            <textarea
              name="answer"
              value={currentFaq.answer}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter answer"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button
              onClick={() => setIsEditModalOpen(false)}
              variant="outline"
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateFaq}
              className="bg-black text-white"
            >
              Update
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default FAQ;
