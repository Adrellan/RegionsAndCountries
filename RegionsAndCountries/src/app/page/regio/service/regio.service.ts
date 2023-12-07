import { Injectable } from '@angular/core';
import { BaseService } from '../../../service/base.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegioService {
  constructor(
    private baseService: BaseService,
  ) { 
  }
  
  TableConfig = [
    { key: 'Regid', text: '#', type: 'plain' },
    { key: 'Regname', text: 'Regio', type: 'text' },
  ]

  GetAll(): Observable<any[]> {
    return this.baseService.getAll("Regios");
  }

  Delete(ids: any): Observable<any[]> {
    return this.baseService.delete("Regios", ids);
  }

  getRegnameMap(): Observable<{ [key: number]: string }> {
    return this.baseService.getAll("Regios").pipe(
      map(regios => {
        const RegnameMap: { [key: number]: string } = {};
        regios.forEach(regio => {
          RegnameMap[regio.Regid] = regio.Regname;
        });
        return RegnameMap;
      })
    );
  }
}
