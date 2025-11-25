import { type Role } from "#/entity";

export const DB_SYS_ROLE: Role[] = [
	{ 
        id: "role_admin_id", 
        name: "admin", 
        code: "SUPER_ADMIN" 
    },
	{ 
        id: "role_test_id", 
        name: "test", 
        code: "TEST" 
    },
];