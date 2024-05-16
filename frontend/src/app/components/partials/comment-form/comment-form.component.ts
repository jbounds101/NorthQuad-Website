import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit {
    @Input() submitLabel!:string;
    @Input() hasCancelButton:boolean = false;
    @Input() initialText:string = '';

    @Output() handleSubmit = new EventEmitter<string>(); // The output of the textbox

    form!:FormGroup;

    constructor(private formBuilder:FormBuilder) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            title: [this.initialText, Validators.required]
        })
    }

    submit(): void{
        this.handleSubmit.emit(this.form.value.title);
    }
}
