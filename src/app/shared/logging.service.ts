import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assignmentName:string, action:string) {
    // action = ajouté, modifié, supprimé, etc.

    console.log(`LOGGING SERVICE : ${assignmentName} ${action}`);
  }
}
