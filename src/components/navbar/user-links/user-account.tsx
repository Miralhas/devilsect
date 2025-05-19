import { User } from "@/types/authentication";
import UserAccountDropdown from "./user-account-dropdown";

const UserAccount = async ({ user }: { user: User }) => {
  return <UserAccountDropdown user={user} />
}

export default UserAccount;
