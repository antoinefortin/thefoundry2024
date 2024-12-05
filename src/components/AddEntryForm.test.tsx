import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddEntryForm from './AddEntryForm';
import { addressBookService } from '../services/AddressBookService';

jest.spyOn(addressBookService, 'addEntry');

test('adds a new entry', () => {
  const { getByPlaceholderText, getByText } = render(<AddEntryForm />);
  const firstNameInput = getByPlaceholderText('First Name');
  const lastNameInput = getByPlaceholderText('Last Name');
  const addButton = getByText('Add Entry');

  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  fireEvent.click(addButton);

  expect(addressBookService.addEntry).toHaveBeenCalledWith(
    expect.objectContaining({ firstName: 'John', lastName: 'Doe' })
  );
});
