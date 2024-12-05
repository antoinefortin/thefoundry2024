import { BehaviorSubject, Observable } from 'rxjs';
import { AddressEntry } from '../types/AddressEntry';

class AddressBookService {
  private entriesSubject = new BehaviorSubject<AddressEntry[]>([]);
  public entries$ = this.entriesSubject.asObservable();

  addEntry(entry: AddressEntry) {
    const currentEntries = this.entriesSubject.getValue();
    this.entriesSubject.next([...currentEntries, entry]);
  }

  deleteEntry(id: string) {
    const currentEntries = this.entriesSubject.getValue();
    const updatedEntries = currentEntries.filter((entry) => entry.id !== id);
    this.entriesSubject.next(updatedEntries);
  }

  searchEntries(query: string): Observable<AddressEntry[]> {
    const lowerCaseQuery = query.toLowerCase();
    return new BehaviorSubject(
      this.entriesSubject
        .getValue()
        .filter(
          (entry) =>
            entry.firstName.toLowerCase().includes(lowerCaseQuery) ||
            entry.lastName.toLowerCase().includes(lowerCaseQuery)
        )
    ).asObservable();
  }
}

export const addressBookService = new AddressBookService();
