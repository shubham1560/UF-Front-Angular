import { Component, OnInit, Inject } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import CodeTool from '@editorjs/code';
import List from '@editorjs/list';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editor-edit',
  templateUrl: './editor-edit.component.html',
  styleUrls: ['./editor-edit.component.scss']
})
export class EditorEditComponent implements OnInit {
  editor: EditorJS;

  constructor(
    public dialogRef: MatDialogRef<EditorEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
      this.initializeEditor();
  }

  initializeEditor() {
    console.log("editor initialization");
    console.log(this.data);
    
    
    this.editor = new EditorJS({

      holder: 'editorjs',

      data: this.data,

      placeholder: 'start typing here to add question details!',

      tools: {
        list: {
          class: List,
          inlineToolbar: true,
        },
        code: {
          class: CodeTool,
        },

      }
    })

    console.log(this.editor);
    
  }

}
