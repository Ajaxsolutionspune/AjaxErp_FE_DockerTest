import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Screen, ScreenEntity } from '../../Module/Masters/Screen.model';

@Injectable()
export class ScreenService {
    str: string;
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
    }
    getScreens(): Observable<ScreenEntity[]> {
        return this.httpClient.get<ScreenEntity[]>(this.str + '/Screen/getList'
        , this.env.httpOptions);
    }

    fillDrpScreens(): Observable<ScreenEntity[]> {
        return this.httpClient.get<ScreenEntity[]>(this.str +
            '/Screen/getList?status=1'
        , this.env.httpOptions);
    }
    getScreen(screenCode: string): Observable<ScreenEntity> {
        return this.httpClient.get<ScreenEntity>(this.str + '/Screen/' + screenCode
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }
    Save(saveEntityObj: ScreenEntity): Observable<string> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.httpClient.post<string>(this.str + '/Screen', saveEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    Update(updateEntityObj: ScreenEntity): Observable<ScreenEntity> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post<ScreenEntity>(this.str + '/Screen', updateEntityObj
        , this.env.httpOptions).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}