import DynamicBlurImage from "@/components/dynamic-blur-image";
import { env } from "@/env";
import { UserInfoReadOnly } from "@/types/authentication";
import { cn } from "@/utils/common-utils";

const ReadOnlyUserImage = ({ user }: { user: UserInfoReadOnly }) => {
  return (
    <div className={cn("rounded-full size-32 md:size-36 aspect-square overflow-hidden relative")}>
      <DynamicBlurImage
        src={`${env.NEXT_PUBLIC_BASE_URL}/users/${user.id}/image`}
        fill={false}
        width={144}
        height={144}
        alt="User Image"
        priority
        className="opacity-90 object-center object-cover w-full h-auto inline-block"
        default={`https://static.devilsect.com/yin-yang.png`}
        mask="circle"
        mtrim
      />
    </div>
  )
}

export default ReadOnlyUserImage;
