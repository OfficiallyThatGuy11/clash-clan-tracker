import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() placeholder: string;
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  updateValueFromEvent(event: any): void {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }

  resetValue(): void {
    this.value = '';
    this.valueChange.emit(this.value);
  }
}
