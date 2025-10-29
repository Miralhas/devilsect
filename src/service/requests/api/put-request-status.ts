import { Action } from "@/types/request";

export const putRequestStatus = async ({ action, id }: { action: Action, id: number }) => {
  const res = await fetch(`/api/requests/action/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ action })
  });
  if (!res.ok) throw new Error("Failed to put request status");
}