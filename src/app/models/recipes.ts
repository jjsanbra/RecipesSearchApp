export interface IRecipeModel {
    title?: string;
    href?: string;
    ingredients?: string;
    thumbnail?: string;
  }

export class RecipeModel implements IRecipeModel {
    constructor(
        public title?: string,
        public href?: string,
        public ingredients?: string,
        public thumbnail?: string
    ) {}
}
