import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { Note } from '../../model/note.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  notes: Note[] = [];
  selectedNote: Note | null = null;
  
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
    
    this.noteService.selectedNote$.subscribe(note => {
      this.selectedNote = note;
    });
  }

  selectNote(note: Note): void {
    this.noteService.selectNote(note);
  }

  createNewNote(): void {
    this.noteService.createNote({
      title: 'New Note',
      content: '# New Note\n\nStart writing here...'
    }).subscribe(newNote => {
      this.noteService.selectNote(newNote);
    });
  }
}
