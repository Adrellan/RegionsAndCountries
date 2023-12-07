import { Injectable } from '@angular/core';
import { BaseService } from '../../../service/base.service';
import { Observable, forkJoin, map } from 'rxjs';
import { RegioService } from '../../regio/service/regio.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(
    private baseService: BaseService,
    private regioService: RegioService
  ) { 
  }
  
  TableConfig = [
    { key: 'Ctyid', text: '#', type: 'plain' },
    { key: 'Ctyname', text: 'City', type: 'text' },
    { key: 'Ctyregid', text: 'Regio', type: 'select' },
  ];

  GetAll(): Observable<any[]> {
    return this.baseService.getAll("Countries");
  }

  Delete(ids: any): Observable<any[]> {
    return this.baseService.delete("Countries", ids);
  }


  GetCtyregidOptions(){
    return this.baseService.getAll("Regios").pipe(
      map(areas => areas.map(area => ({ value: area.Regid, text: area.Regname })))
    );
  }

  MapCtyregidToRegname(countries: any[]): Observable<any[]> {
    return this.regioService.getRegnameMap().pipe(
      map(regnameMap => {
        return countries.map(country => {
          const regname = regnameMap[country.Ctyregid] || country.Ctyregid;
          return {
            ...country,
            Ctyregid: regname
          };
        });
      })
    );
  }
  
  GetCtyregidByRegname(Regname: string): Observable<number | null> {
    return this.baseService.getAll("Regios").pipe(
      map(regios => {
        const filteredRegio = regios.find(regio => regio.Regname === Regname);
        return filteredRegio ? filteredRegio.Regid : null;
      })
    );
  }
}
