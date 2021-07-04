export interface ValidatorMap {
  [validatorName: string]: { (value: any): string | null }[];
}
