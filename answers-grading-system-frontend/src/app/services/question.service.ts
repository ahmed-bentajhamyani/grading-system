import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answers } from '../models/answers';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl = "http://localhost:8000";

  constructor(private httpClient: HttpClient, private apollo: Apollo) { }

  getQuestions() {
    this.apollo
      .watchQuery({
        query: gql`
          query { 
            questions{ 
              questionId 
              question 
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        // console.log(result.data?.questions);
      });
  }

  getAnswers() {
    return this.httpClient.get<Answers>(`${this.apiUrl}/answers`);
  }

  sendAnswers(answers: any) {
    return this.httpClient.post(`${this.apiUrl}/answers`, answers);
  }
}