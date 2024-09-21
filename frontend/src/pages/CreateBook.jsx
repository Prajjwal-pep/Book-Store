import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    
    axios.post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred while creating the book. Please try again.', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <BackButton />
      <h1 className='text-4xl font-bold my-4 text-center'>Create Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border rounded-xl shadow-lg w-full max-w-md mx-auto bg-white p-6'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'>Title</label>
          <input 
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-200'
            placeholder='Enter book title'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'>Author</label>
          <input 
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-200'
            placeholder='Enter author name'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'>Publish Year</label>
          <input 
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-200'
            placeholder='Enter publish year'
          />
        </div>
        <button 
          className={`p-2 bg-sky-500 text-white rounded-lg transition duration-200 hover:bg-sky-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          onClick={handleSaveBook} 
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default CreateBook;
