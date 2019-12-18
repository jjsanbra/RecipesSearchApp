import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecipesService } from 'src/app/services/recipes.service';
import { IRecipeModel, RecipeModel } from 'src/app/models/recipes';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public recipesSearchForm: FormGroup;
  public submitedForm: boolean;
  public recipes: any;

  constructor(
    private recipeService: RecipesService,
    private formBuilder: FormBuilder
    // private spinner: SpinnerService
  ) { 
    this.recipes = [];
    this.getRecipes();
   }

  ngOnInit() {
    this.createRecipesSearchForm();
  }


  private getRecipes(): void {
    this.recipeService.getAll()
      .subscribe(
        ( data ) => {
          this.recipes = data.body;
          // this.spinner.spin$.next( false );
          console.log( 'Recipes founded => ' , this.recipes );
        },
        ( error ) => {
          console.error( 'ERROR: ' , error );
        }
      );
  }

  private createRecipesSearchForm() {
    this.recipesSearchForm = this.formBuilder.group({
      ingredients: [ null ]
    });
  }

  private updateRecipesSearchForm(): IRecipeModel {
    return {
      ...new RecipeModel(),
      ingredients: this.recipesSearchForm.get(['ingredients']).value
    };
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
    // this.spinner.spin$.next( true );
    this.submitedForm = true;
    const search = this.updateRecipesSearchForm();
    this.subscribeToSearchRecipesResponse( this.recipeService.getByIngredients( search ) );
  }

  protected subscribeToSearchRecipesResponse( result: Observable<HttpResponse<IRecipeModel[]>> ) {
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

  protected onSendSuccess( data ) {
    // this.spinner.spin$.next( false );
    this.recipes = data;
    this.submitedForm = false;
    console.log( 'Sended => ' , data );
  }

  protected onSendError( result ) {
    // this.spinner.spin$.next( false );
    this.submitedForm = false;
    console.log( 'Error => ' , result );
  }

}
