import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressEntry } from '../types/AddressEntry';

class AddressBookService {
  private entriesSubject = new BehaviorSubject<AddressEntry[]>([]);
  public entries$ = this.entriesSubject.asObservable();

  addEntry(entry: AddressEntry) {
    const currentEntries = this.entriesSubject.value;
    this.entriesSubject.next([...currentEntries, entry]);
  }

  removeEntry(id: string) {
    const updatedEntries = this.entriesSubject.value.filter(entry => entry.id !== id);
    this.entriesSubject.next(updatedEntries);
  }

  searchEntries(query: string) {
    return this.entries$.pipe(
      map((entries: AddressEntry[]) =>
        entries.filter(
          (entry: AddressEntry) =>
            entry.firstName.toLowerCase().startsWith(query.toLowerCase()) ||
            entry.lastName.toLowerCase().startsWith(query.toLowerCase())
        )
      )
    );
  }
  

  getEntriesSortedByFirstName() {
    return this.entries$.pipe(
      map((entries: AddressEntry[]) =>
        [...entries].sort((a, b) => a.firstName.localeCompare(b.firstName))
      )
    );
  }

  getEntriesSortedByLastName() {
    return this.entries$.pipe(
      map((entries: AddressEntry[]) =>
        [...entries].sort((a, b) => a.lastName.localeCompare(b.lastName))
      )
    );
  }
}

export const addressBookService = new AddressBookService();
