import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQueryModel, QueryModel } from '../models/query.model';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../utils/request-util';
import { IRecipeModel } from '../models/recipe.model';
import { map } from 'rxjs/operators';

type EntityArrayResponseRecipeType = HttpResponse<IQueryModel[]>;


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  public resourceUrl = `${ environment.corsHelperURL }/${ environment.API_URL }`;

  constructor(
    protected http: HttpClient
  ) { }

  public getAll(): Observable<EntityArrayResponseRecipeType> {
    return this.http.get<IQueryModel[]>( `${ this.resourceUrl }`, { observe: 'response' });
  }

  public getBySearchText( searchText: string ): Observable<any> {
    return this.http.get<IQueryModel[]>( `${ this.resourceUrl }/?q=${searchText}`, { observe: 'response' });
  }

  public getByIngredients( ingredients: any ): Observable<any> {
    return this.http.get<IQueryModel[]>( `${ this.resourceUrl }/?i=${ingredients}`, { observe: 'response' });
  }

  public getByPage( page: any ): Observable<any> {
    return this.http.get<IQueryModel[]>( `${ this.resourceUrl }/?p=${page}`, { observe: 'response' });
  }
}
