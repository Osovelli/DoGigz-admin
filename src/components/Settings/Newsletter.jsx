import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import Table from '../Table';

// Sample newsletter data
const newsletterData = [
  {
    id: '101',
    title: 'How to survive "Emi Lo Kan" regime',
    status: 'Sent',
    dateSent: 'Oct 23 2024',
    scheduled: 'N/A',
    recipients: '8,254',
  },
  {
    id: '101',
    title: 'How to survive "Emi Lo Kan" regime',
    status: 'Sent',
    dateSent: 'Oct 23 2024',
    scheduled: 'N/A',
    recipients: '8,254',
  },
  {
    id: '101',
    title: 'How to survive "Emi Lo Kan" regime',
    status: 'Sent',
    dateSent: 'Oct 23 2024',
    scheduled: 'N/A',
    recipients: '8,254',
  },
  {
    id: '101',
    title: 'How to survive "Emi Lo Kan" regime',
    status: 'Sent',
    dateSent: 'Oct 23 2024',
    scheduled: 'N/A',
    recipients: '8,254',
  },
  {
    id: '101',
    title: 'How to survive "Emi Lo Kan" regime',
    status: 'Sent',
    dateSent: 'Oct 23 2024',
    scheduled: 'N/A',
    recipients: '8,254',
  },
  {
    id: '101',
    title: 'How to survive "Emi Lo Kan" regime',
    status: 'Sent',
    dateSent: 'Oct 23 2024',
    scheduled: 'N/A',
    recipients: '8,254',
  },
  {
    id: '101',
    title: 'How to survive "Emi Lo Kan" regime',
    status: 'Sent',
    dateSent: 'Oct 23 2024',
    scheduled: 'N/A',
    recipients: '8,254',
  },
  {
    id: '101',
    title: 'How to survive "Emi Lo Kan" regime',
    status: 'Sent',
    dateSent: 'Oct 23 2024',
    scheduled: 'N/A',
    recipients: '8,254',
  },
  {
    id: '101',
    title: 'How to survive "Emi Lo Kan" regime',
    status: 'Sent',
    dateSent: 'Oct 23 2024',
    scheduled: 'N/A',
    recipients: '8,254',
  },
  {
    id: '101',
    title: 'How to survive "Emi Lo Kan" regime',
    status: 'Sent',
    dateSent: 'Oct 23 2024',
    scheduled: 'N/A',
    recipients: '8,254',
  },
];

// Sample subscribers data
const subscribersData = [
  {
    id: '001',
    email: 'user1@example.com',
    name: 'John Doe',
    status: 'Active',
    dateJoined: 'Oct 10 2024',
    lastActivity: 'Oct 22 2024',
  },
  {
    id: '002',
    email: 'user2@example.com',
    name: 'Jane Smith',
    status: 'Active',
    dateJoined: 'Oct 12 2024',
    lastActivity: 'Oct 23 2024',
  },
  {
    id: '003',
    email: 'user3@example.com',
    name: 'Robert Johnson',
    status: 'Inactive',
    dateJoined: 'Sep 15 2024',
    lastActivity: 'Oct 01 2024',
  },
  {
    id: '004',
    email: 'user4@example.com',
    name: 'Emily Davis',
    status: 'Active',
    dateJoined: 'Oct 05 2024',
    lastActivity: 'Oct 21 2024',
  },
  {
    id: '005',
    email: 'user5@example.com',
    name: 'Michael Wilson',
    status: 'Active',
    dateJoined: 'Oct 18 2024',
    lastActivity: 'Oct 23 2024',
  },
];

const Newsletter = () => {
  const [activeTab, setActiveTab] = useState('newsletters');
  const navigate = useNavigate();

  // Newsletter table columns
  const newsletterColumns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'status', label: 'Status' },
    { key: 'dateSent', label: 'Date Sent' },
    { key: 'scheduled', label: 'Scheduled' },
    { key: 'recipients', label: 'Recipients' },
    { key: 'actions', label: '' },
  ];

  // Subscribers table columns
  const subscribersColumns = [
    { key: 'id', label: 'ID' },
    { key: 'email', label: 'Email' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'dateJoined', label: 'Date Joined' },
    { key: 'lastActivity', label: 'Last Activity' },
    { key: 'actions', label: '' },
  ];

  // Handle creating a new newsletter
  const handleCreateNewsletter = () => {
    navigate('/dashboard/settings/newsletter/create');
  };

  // Custom cell renderer for the table
  const renderCustomCell = (item, column) => {
    if (column?.key === 'status') {
      return (
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${item.status === 'Sent' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
          <span>{item.status}</span>
        </div>
      );
    }
    return null;
  };

  // Custom action renderer for the table
  const renderActions = (item) => {
    return (
      <div className="flex justify-end">
        <Button variant="link" className="text-primary">
          View
        </Button>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-8 border-b border-gray-200">
          <button
            className={`pb-4 px-1 ${
              activeTab === 'newsletters'
                ? 'border-b-2 border-black text-black font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('newsletters')}
          >
            Manage Newsletters
          </button>
          <button
            className={`pb-4 px-1 ${
              activeTab === 'subscribers'
                ? 'border-b-2 border-black text-black font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('subscribers')}
          >
            Manage Subscribers
          </button>
        </div>
        <Button
          onClick={handleCreateNewsletter}
          className="bg-black text-white rounded-full"
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Create Newsletter
        </Button>
      </div>

      {activeTab === 'newsletters' ? (
        <Table
          data={newsletterData}
          columns={newsletterColumns}
          renderCustomCell={renderCustomCell()}
          renderActions={renderActions}
          itemsPerPage={8}
          showSearch={true}
        />
      ) : (
        <Table
          data={subscribersData}
          columns={subscribersColumns}
          renderCustomCell={renderCustomCell}
          renderActions={renderActions}
          itemsPerPage={8}
          showSearch={true}
        />
      )}
    </div>
  );
};

export default Newsletter;