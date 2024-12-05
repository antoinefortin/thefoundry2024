import React, { useState, useEffect } from 'react';
import { addressBookService } from '../services/AddressBookService';
import { AddressEntry } from '../types/AddressEntry';
import styles from '../styles/SearchField.module.css';

const SearchField: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState<AddressEntry[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredEntries([]);
      return;
    }

    const subscription = addressBookService
      .searchEntries(query)
      .subscribe(setFilteredEntries);

    return () => subscription.unsubscribe();
  }, [query]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      <ul className={styles.list}>
        {filteredEntries.map((entry) => (
          <li key={entry.id} className={styles.listItem}>
            {entry.firstName} {entry.lastName} - {entry.phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchField;
