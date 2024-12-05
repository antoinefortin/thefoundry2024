import React, { useState } from 'react';
import { addressBookService } from '../services/AddressBookService';
import styles from '../styles/AddEntryForm.module.css';

const AddEntryForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validatePhoneNumber = (number: string): boolean => {
    if (!number) {
      setPhoneError(null); // No phone number, no error
      return true;
    }

    const isValidFormat = /^[\d\s()+-]*$/.test(number); // Allow digits, spaces, +, -, (, and )
    const digitCount = number.replace(/\D/g, '').length; // Count only digits

    if (!isValidFormat) {
      setPhoneError('Phone number can only contain digits, spaces, +, -, (, and ).');
      return false;
    } else if (digitCount < 10) {
      setPhoneError('Phone number must contain at least 10 digits.');
      return false;
    }

    setPhoneError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Validate phone number only if it's provided
    if (validatePhoneNumber(phoneNumber)) {
      addressBookService.addEntry({
        id: Date.now().toString(),
        firstName,
        lastName,
        phoneNumber: phoneNumber || undefined, // Store as undefined if empty
      });

      // Reset form
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setPhoneError(null);
      setFormSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className={styles.input}
      />
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        className={styles.input}
      />
      <input
        placeholder="Phone Number (Optional)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className={`${styles.input} ${formSubmitted && phoneError ? styles.inputError : ''}`}
      />
      {formSubmitted && phoneError && <div className={styles.error}>{phoneError}</div>}
      <button
        type="submit"
        className={styles.button}
        disabled={!firstName || !lastName} // Remove phone number check
      >
        Add Entry
      </button>
    </form>
  );
};

export default AddEntryForm;
