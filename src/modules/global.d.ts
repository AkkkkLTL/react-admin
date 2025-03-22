declare interface UserToken {
  accessToken?: string;
  refreshToken?: string;
}

declare interface UserInfo {
  id: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  role: Role;
  status?: BasicStatus;
  permissions?: Permission[];
}

declare interface Organization {
  id: string;
  name: string;
  status: BasicStatus;
  desc?: string;
  order?: number;
  children? :Organization[];
}

declare interface Permission {
  id: string;
  parentId: string;
  name: string;
  name: string;
  type: PermissionType;
  route: string;
  status?: BasicStatus;
  order?: number;
  icon?: string;
  component?: string;
  hide?: boolean;
  hideTab?: boolean;
  frameSrc?: URL;
  newFeature?: boolean;
  children?: Permission[];
}

declare interface Role {
  id: string;
  name: string;
  label: string;
  status: BasicStatus;
  order?: number;
  desc?: string;
  permissions?: Permission[];
}