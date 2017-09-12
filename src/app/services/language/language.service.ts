import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LanguageService {

    private _language: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor() {
        const previousLanguage = localStorage.getItem('Language');
        if (previousLanguage) {
            this._language.next(previousLanguage);
        }
    }

    get() {
        return new Observable<string>(fn => this._language.subscribe(fn));
    }

    set(l: string) {
        localStorage.setItem('Language', l);
        this._language.next(l);
    }
}
