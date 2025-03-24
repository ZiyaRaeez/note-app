import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NoteListComponent } from '../note-list/note-list.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { NoteEditorComponent } from '../note-editor/note-editor.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NoteListComponent,
    ToolbarComponent,
    NoteEditorComponent
  ],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  isSidebarVisible: boolean = true;
  isNoteListVisible: boolean = false;
  
  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  
  toggleNoteList(): void {
    this.isNoteListVisible = !this.isNoteListVisible;
  }
}
