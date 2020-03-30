export class User {
    id: number;
    code: string;
    username: string;
    salt: string;
    password: string;
    email: string;
    active: string;
    full_name: string;
    gender: string;
    birth_date: Date;
    address: string;
    current_address: string;
    description: string;
    position_id: number;
    role_id: number;
    job_title_id: number;
    department_id: number;
    manager: string;
    login_count: number;
    created_by: number;
    created_date: Date;
    updated_by: number;
    updated_date: Date;
}