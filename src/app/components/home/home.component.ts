import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RecipesService } from 'src/app/services/recipes.service';
import { IQueryModel } from 'src/app/models/query.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { SpinnerService } from 'src/app/services/spinner.service';
import { IRecipeModel } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public recipesSearchForm: FormGroup;
  public submitedForm: boolean;
  public recipesFeatured: any;
  public recipesFinded: IRecipeModel[];
  public urlTest: any;

  constructor(
    private recipeService: RecipesService,
    private formBuilder: FormBuilder,
    private spinner: SpinnerService
  ) {
    this.recipesFeatured = [];
    this.recipesFinded = [];
    this.getRecipes();
    this.spinner.spin$.next( true );
   }

  ngOnInit() {
    this.createRecipesSearchForm();
  }


  private getRecipes(): void {
    this.recipeService.getAll()
      .subscribe(
        ( data ) => {
          this.recipesFeatured = data.body;
          this.spinner.spin$.next( false );
          console.log( 'Recipes founded => ' , this.recipesFeatured );
        },
        ( error ) => {
          console.error( 'ERROR: ' , error );
        }
      );
  }

  private createRecipesSearchForm() {
    this.recipesSearchForm = this.formBuilder.group({
      searchText: [ '', [] ]
    });
  }

  public onSubmit() {
    if ( this.recipesSearchForm.valid ) {
      this.setSearchRecipes();
    } else {
      this.submitedForm = false;
      return false;
    }
  }

  private setSearchRecipes() {
    this.spinner.spin$.next( true );
    this.submitedForm = true;
    const searchText = this.recipesSearchForm.get(['searchText']).value;
    console.log( searchText );
    this.subscribeToSearchRecipesResponse( this.recipeService.getBySearchText( searchText ) );
  }

  protected subscribeToSearchRecipesResponse( result: Observable<HttpResponse<IQueryModel[]>> ) {
    result.subscribe(
      ( data: any ) => {
        console.log( 'Success =>' , data );
        this.onSendSuccess( data.body );
      },
      ( data: any ) => {
        console.log( 'Error =>' , data );
        this.onSendError( data.body );
      });
  }

  protected onSendSuccess( data: any ) {
    this.spinner.spin$.next( false );
    this.recipesFinded = data.results;
    this.submitedForm = false;
    console.log( 'Sended => ' , data );
  }

  protected onSendError( result: any ) {
    this.spinner.spin$.next( false );
    this.submitedForm = false;
    console.log( 'Error => ' , result );
  }

}
