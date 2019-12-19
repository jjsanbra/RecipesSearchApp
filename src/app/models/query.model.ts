export interface IQueryModel {
    searchText?: string;
    ingredients?: string[];
    page?: number;
  }

export class QueryModel implements IQueryModel {
    constructor(
        public searchText?: string,
        public ingredients?: string[],
        public page?: any
    ) {}
}
