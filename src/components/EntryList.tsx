import React, { useEffect, useState } from 'react';
import { addressBookService } from '../services/AddressBookService';
import { AddressEntry } from '../types/AddressEntry';

const EntryList: React.FC = () => {
  const [entries, setEntries] = useState<AddressEntry[]>([]);
  const [highlightField, setHighlightField] = useState<'firstName' | 'lastName' | null>(null);

  useEffect(() => {
    const subscription = addressBookService.entries$.subscribe(setEntries);
    return () => subscription.unsubscribe();
  }, []);

  const sortByFirstName = () => {
    setEntries((prevEntries) =>
      [...prevEntries].sort((a, b) => a.firstName.localeCompare(b.firstName))
    );
    setHighlightField('firstName');
  };

  const sortByLastName = () => {
    setEntries((prevEntries) =>
      [...prevEntries].sort((a, b) => a.lastName.localeCompare(b.lastName))
    );
    setHighlightField('lastName');
  };

  return (
    <div>
        
      <div style={{ marginBottom: '10px' }}>
        <button onClick={sortByFirstName} style={{ marginRight: '5px' }}>
          Sort by First Name
        </button>
        <button onClick={sortByLastName}>Sort by Last Name</button>
      </div>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {highlightField === 'firstName' ? (
              <>
                <span style={{ fontWeight: 'bold', color: 'blue' }}>{entry.firstName}</span>{' '}
                {entry.lastName}
              </>
            ) : highlightField === 'lastName' ? (
              <>
                <span style={{ fontWeight: 'bold', color: 'blue' }}>{entry.lastName}</span>{' '}
                {entry.firstName}
              </>
            ) : (
              <>
                {entry.firstName} {entry.lastName}
              </>
            )}
            {' - '}
            {entry.phoneNumber || 'No Phone'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryList;
