import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [cards, setCards] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch cards from the backend when the component mounts
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cards');
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit new card to the backend
      const newCard = { title, description };
      const response = await axios.post('http://localhost:4000/api/cards', newCard);

      // Update the cards state with the newly added card
      setCards([...cards, response.data]);

      // Reset form fields and hide the form
      setTitle('');
      setDescription('');
      setShowForm(false);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">

        {/* navbar section */}
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Abstract | Help Center</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gray-800 px-4 py-2 rounded"
        >
          Submit a request
        </button>
      </header>
        
        {/* main section */}
      <main className="flex-grow bg-gray-100 text-center py-10">
        <h2 className="text-3xl font-semibold mb-6">How can we help?</h2>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/2 p-3 rounded border border-gray-300"
          />
        </div>

        {/* Overlay Form */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md relative w-96">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold mb-4">Submit a Request</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-left mb-2 font-medium">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded border border-gray-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-left mb-2 font-medium">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 rounded border border-gray-300"
                    rows="4"
                    required
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
         
         {/* Cards section  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-5xl mx-auto">
          {filteredCards.length > 0 ? (
            filteredCards.map((card, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))
          ) : (
            <p className='text-center mt-5'>No results found</p>
          )}
        </div>
        
      </main>

      {/* footer section  */}
      <footer className="bg-black text-white p-6 text-sm">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h4 className="font-bold mb-2">Abstract</h4>
            <ul>
              <li>Branches</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Help Center</li>
              <li>Release Notes</li>
              <li>Status</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Community</h4>
            <ul>
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>Facebook</li>
              <li>Dribbble</li>
              <li>Podcast</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Legal</li>
            </ul>
            <div className="mt-4">
              <p>Contact Us</p>
              <p>info@abstract.com</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>© Copyright 2022 Abstract Studio Design, Inc. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
