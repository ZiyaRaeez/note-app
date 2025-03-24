import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Note } from '../../model/note.model';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit {
  selectedNote: Note | null = null;
  editedTitle: string = '';
  editedContent: string = '';
  
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.selectedNote$.subscribe(note => {
      this.selectedNote = note;
      if (note) {
        this.editedTitle = note.title;
        this.editedContent = note.content;
      }
    });
  }

  saveChanges(): void {
    if (this.selectedNote) {
      this.noteService.updateNote(this.selectedNote.id, {
        title: this.editedTitle,
        content: this.editedContent
      }).subscribe();
    }
  }

  onTitleChange(): void {
    this.saveChanges();
  }

  onContentChange(): void {
    this.saveChanges();
  }
}