import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private infoUpdateSubject = new Subject<Info>();
  infoUpdate = this.infoUpdateSubject.asObservable();

  publishInfoEvent(info: Info): void {
    this.infoUpdateSubject.next(info);
  }

}

export class Info {
  hostname: string;
}
