import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Note } from '../model/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [
    {
      id: '1',
      title: 'Welcome to Notes App',
      content: '# Welcome to Notes App \n\nThis is your first note. You can edit it or create a new one.',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['welcome']
    },
    {
      id: '2',
      title: 'Getting Started',
      content: '# Getting Started\n\n1. Click on a note in the sidebar to open it\n2. Use the toolbar to format your text\n3. Create new notes with the + button',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['tutorial']
    }
  ];

  private selectedNoteSubject = new BehaviorSubject<Note | null>(null);
  selectedNote$ = this.selectedNoteSubject.asObservable();

  constructor() { }

  getNotes(): Observable<Note[]> {
    return of(this.notes);
  }

  getNote(id: string): Observable<Note | undefined> {
    const note = this.notes.find(n => n.id === id);
    return of(note);
  }

  createNote(note: Partial<Note>): Observable<Note> {
    const newNote: Note = {
      id: Date.now().toString(),
      title: note.title || 'Untitled',
      content: note.content || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      parentId: note.parentId,
      tags: note.tags || []
    };
    
    this.notes.push(newNote);
    return of(newNote);
  }

  updateNote(id: string, changes: Partial<Note>): Observable<Note | undefined> {
    const index = this.notes.findIndex(n => n.id === id);
    if (index !== -1) {
      const updatedNote = {
        ...this.notes[index],
        ...changes,
        updatedAt: new Date()
      };
      this.notes[index] = updatedNote;
      
      if (this.selectedNoteSubject.value?.id === id) {
        this.selectedNoteSubject.next(updatedNote);
      }
      
      return of(updatedNote);
    }
    return of(undefined);
  }

  deleteNote(id: string): Observable<boolean> {
    const initialLength = this.notes.length;
    this.notes = this.notes.filter(n => n.id !== id);
    
    if (this.selectedNoteSubject.value?.id === id) {
      this.selectedNoteSubject.next(null);
    }
    
    return of(initialLength !== this.notes.length);
  }

  selectNote(note: Note | null): void {
    this.selectedNoteSubject.next(note);
  }
}