import Rating from "@mui/material/Rating";
import RatingLabel from "./rating-label";

const RatingLoader = () => {
  return (
    <div className="flex gap-1 items-center ml-1">
      <Rating
        defaultValue={5}
        precision={0.5}
        max={5}
        slotProps={{ icon: { className: "text-[#D3AF37] animate-pulse" } }}
        sx={{ fontSize: "1.65rem" }}
        readOnly
      />
      <RatingLabel size={0} value={5} className="animate-pulse" />
    </div>
  )
}

export default RatingLoader;
