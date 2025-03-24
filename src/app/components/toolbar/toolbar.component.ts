import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { Note } from '../../model/note.model';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  selectedNote: Note | null = null;
  
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.selectedNote$.subscribe(note => {
      this.selectedNote = note;
    });
  }

  deleteNote(): void {
    if (this.selectedNote) {
      if (confirm('Are you sure you want to delete this note?')) {
        this.noteService.deleteNote(this.selectedNote.id).subscribe();
      }
    }
  }

  formatText(format: string): void {
    // This would be implemented with a rich text editor integration
    console.log(`Format: ${format}`);
  }
}