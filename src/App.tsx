import React from 'react';
import AddEntryForm from './components/AddEntryForm';
import EntryList from './components/EntryList';
import SearchField from './components/SearchField';
import './styles/App.css';


const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>The Foundry Adress Book</h1>
      </header>
      <main className="app-main">
        <section className="form-section">
          <h2>Add New Contact</h2>
          <AddEntryForm />
        </section>
        <section className="list-section">
          <h2>Contact List</h2>
          <SearchField />
          <EntryList />
          
        </section>
      </main>
    </div>
  );
};

export default App;
