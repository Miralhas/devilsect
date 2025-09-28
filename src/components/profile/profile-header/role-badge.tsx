import { Badge } from "@/components/ui/badge";
import { RoleStatus } from "@/types/authentication";
import { cn } from "@/utils/common-utils";

const roleClasses: Record<RoleStatus, string> = {
  Admin: "bg-primary/50 border-accent text-accent",
  Member: "bg-green-900/35 border-green-700 text-green-700"
}

const RoleBadge = ({ role, className }: { role: RoleStatus, className?: string }) => {

  return (
    <Badge className={cn(roleClasses[role], className)}>
      {role}
    </Badge>
  )
}

export default RoleBadge;
