export interface user{
    id:number;
    name:string;
    email:string;
    role:'admin' | 'manager' | 'employee' | 'hr';
}