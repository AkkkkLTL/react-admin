import { faker } from "@faker-js/faker";

export const DB_SYS_ROLE_PERMISSION = [
	{ 
        id: faker.string.uuid(), 
        roleId: "role_admin_id", 
        permissionId: "permission_create" 
    },
	{ 
        id: faker.string.uuid(), 
        roleId: "role_admin_id", 
        permissionId: "permission_read" 
    },
	{ 
        id: faker.string.uuid(), 
        roleId: "role_admin_id", 
        permissionId: "permission_update" 
    },
	{ 
        id: faker.string.uuid(), 
        roleId: "role_admin_id", 
        permissionId: "permission_delete" 
    },
	{ 
        id: faker.string.uuid(), 
        roleId: "role_test_id", 
        permissionId: "permission_read" 
    },
	{ 
        id: faker.string.uuid(), 
        roleId: "role_test_id", 
        permissionId: "permission_update" 
    },
];