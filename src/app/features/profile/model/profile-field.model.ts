export type FieldType = 'text' | 'date' | 'textarea' | 'checkbox' | 'radio' | 'select' | 'number' | 'email' | 'fiel';
export interface ProfileSection {
  sectionName: string;
  fields: ProfileField[];
}

export interface ProfileField {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  option?: string[];
}