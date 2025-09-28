import { Role, RoleStatus, User } from "@/types/authentication";
import { DisplayStatus, NovelStatus } from "@/types/novel";

export const statusMap: Record<NovelStatus, DisplayStatus> = {
  COMPLETED: 'Completed',
  ON_GOING: "Ongoing"
};

export const roleMap: Record<Role, RoleStatus> = {
  ADMIN: "Admin",
  USER: "Member",
};

export const mapRoles = (roles: Role[]) => {
  if (roles.some(r => Role.ADMIN === r)) {
    return roleMap["ADMIN"];
  }

  return roleMap["USER"];
};
export const isAdminCheck = (user?: User) => user?.roles.some(r => r === Role.ADMIN);
