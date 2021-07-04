export interface ValidatorMap {
  [validatorName: string]: { (value: any): string | null }[];
}

export interface FormPageProps<PageValues = {}> {
  /** Map of field names to values */
  pageValues?: PageValues;
  /** Map of field names to validation errors for those values */
  pageValueValidationErrors?: Record<string, any>;
  /** Handler for when page's form values change */
  onPageValuesChange: (newPageValues: PageValues) => void;
}
