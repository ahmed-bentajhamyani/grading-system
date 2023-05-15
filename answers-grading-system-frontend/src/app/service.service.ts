import { Injectable, OnInit } from '@angular/core';
import { Grade } from './models/grade';
import { Answer } from './models/answer';

@Injectable({
  providedIn: 'root'
})
export class ServiceService implements OnInit {
  private storageKey = 'answers';
  answers: any;

  constructor() { }

  ngOnInit(): void {
  }

  setAnswers(answers: Answer[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(answers));
  }

  getAnswers() {
    this.answers = localStorage.getItem(this.storageKey);
    return this.answers ? JSON.parse(this.answers) : null;
  }
}
