import { Component, OnInit, Inject } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import CodeTool from '@editorjs/code';
import List from '@editorjs/list';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommunityService } from 'src/app/services/community/community.service';

@Component({
  selector: 'app-editor-edit',
  templateUrl: './editor-edit.component.html',
  styleUrls: ['./editor-edit.component.scss']
})
export class EditorEditComponent implements OnInit {
  editor: EditorJS;

  constructor(
    public dialogRef: MatDialogRef<EditorEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private community: CommunityService
  ) { 
  }

  table_id;
  table_name;
  editor_data;

  ngOnInit(): void {
      this.initializeEditor();
      this.table_id = this.data.table_id;
      this.table_name = this.data.table_name;
  }

  initializeEditor() {
    // console.log("editor initialization");
    // console.log(this.data);
    
    
    this.editor = new EditorJS({

      holder: 'editorjs',

      data: this.data.editor_data,

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


  save() {
    this.editor.save().then((outputData: any) => {
      console.log(outputData);
      var editor_data = JSON.stringify(outputData.blocks);
      this.community.postEditorData(this.table_id, this.table_name, editor_data).subscribe(
        result=>{
          // console.log(result);
          this.dialogRef.close({block_data: editor_data});
        }, error =>{

        }
      )
    })
  }


}
