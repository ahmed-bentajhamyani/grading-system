import { Injectable, OnInit } from '@angular/core';
import { Answers } from './models/answers';

@Injectable({
  providedIn: 'root'
})
export class ServiceService implements OnInit {
  private storageKey = 'answers';
  answers: any;

  constructor() { }

  ngOnInit(): void {
  }

  setAnswers(answers: Answers) {
    localStorage.setItem(this.storageKey, JSON.stringify(answers));
  }

  getAnswers() {
    this.answers = localStorage.getItem(this.storageKey);
    return this.answers ? JSON.parse(this.answers) : null;
  }

  clearAnswers() {
    localStorage.removeItem(this.storageKey);
  }
}
