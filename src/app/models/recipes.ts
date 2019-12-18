export interface IRecipeModel {
    title?: string;
    href?: string;
    ingredients?: string;
    thumbnail?: string;
    results?: any;
  }

export class RecipeModel implements IRecipeModel {
    constructor(
        public title?: string,
        public href?: string,
        public ingredients?: string,
        public results?: any,
        public thumbnail?: string
    ) {}
}
