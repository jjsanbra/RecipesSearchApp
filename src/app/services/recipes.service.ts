import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipeModel } from '../models/recipes';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../utils/request-util';

type EntityArrayResponseRecipeType = HttpResponse<IRecipeModel[]>;


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  public resourceUrl = `${ environment.corsHelperURL }/${ environment.API_URL }`;

  constructor(
    protected http: HttpClient
  ) { }

  public getAll( req?: any ): Observable<EntityArrayResponseRecipeType> {
    const options = createRequestOption( req );
    return this.http.get<IRecipeModel[]>( `${ this.resourceUrl }`, { params: options,  observe: 'response' });
  }

  public getByIngredients( req?: any ): Observable<EntityArrayResponseRecipeType> {
    const options = createRequestOption( req );
    return this.http.get<IRecipeModel[]>( `${ this.resourceUrl }`, { params: options,  observe: 'response' });
  }
}
