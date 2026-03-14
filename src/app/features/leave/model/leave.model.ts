export interface leave{
    id:number;
    employeeId:number;
    employeeName:string;
    fromDate:string;
    toDate:string;
    duration:'full' | 'half';
    type:string;
    reason:string;
    status:'approved' | 'pending-manager' | 'pending-hr' | 'rejected';
}