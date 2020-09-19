import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenService } from '../../Services/Masters/ScreenService';
import { ScreenEntity } from '../../Module/Masters/Screen.model';

@Injectable()

export class ScreenListResolverService implements Resolve<ScreenEntity[]> {
    constructor(private screenService: ScreenService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ScreenEntity[]> {
        return this.screenService.getScreens();
    }

}
