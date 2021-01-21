import { Component, OnInit , OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import plugins from "./plugins";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  editor = new Editor();

  @Input() inputModel = '';
  @Output() inputModelChange = new EventEmitter<string>();

  uploadedImagePath='';

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


  ngOnInit(): void {
    this.editor = new Editor({
      plugins
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  myCustomFunction(e: any){
    console.log(e);
  }

}
