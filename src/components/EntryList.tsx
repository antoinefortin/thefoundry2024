import React, { useEffect, useState } from 'react';
import { addressBookService } from '../services/AddressBookService';
import { AddressEntry } from '../types/AddressEntry';
import styles from '../styles/EntryList.module.css'; // Import the CSS module

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

  const handleDelete = (id: string) => {
    addressBookService.deleteEntry(id); // Call the delete method in the service
  };

  return (
    <div className={styles.container}>
      <div>
        <button onClick={sortByFirstName} className={styles.sortButton}>
          Sort by First Name
        </button>
        <button onClick={sortByLastName} className={styles.sortButton}>
          Sort by Last Name
        </button>
      </div>
      <ul className={styles.entryList}>
        {entries.map((entry) => (
          <li key={entry.id} className={styles.entryItem}>
            <div className={styles.entryDetails}>
              {highlightField === 'firstName' ? (
                <>
                  <span className={styles.entryName}>{entry.firstName}</span> {entry.lastName}
                </>
              ) : highlightField === 'lastName' ? (
                <>
                  <span className={styles.entryName}>{entry.lastName}</span> {entry.firstName}
                </>
              ) : (
                <>
                  {entry.firstName} {entry.lastName}
                </>
              )}
              {' - '}
              {entry.phoneNumber || 'No Phone'}
            </div>
            <button onClick={() => handleDelete(entry.id)} className={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryList;
