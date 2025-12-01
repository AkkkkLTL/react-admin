import { type Permission } from "#/entity";

export const DB_SYS_PERMISSION:Permission[] = [
    {
        id: "permission_create",
        name: "permission-create",
        code: "permission:create",
    },
    { 
        id: "permission_read", 
        name: "permission-read", 
        code: "permission:read" 
    },
	{ 
        id: "permission_update", 
        name: "permission-update", 
        code: "permission:update" 
    },
	{ 
        id: "permission_delete", 
        name: "permission-delete", 
        code: "permission:delete" 
    },
];