export interface IRecipeModel {
    ingredients?: string;
    searchString?: string;
    page?: number;
  }

export class RecipeModel implements IRecipeModel {
    constructor(
        public ingredients?: string,
        public searchString?: string,
        public page?: any
    ) {}
}
