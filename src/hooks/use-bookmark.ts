import { useAddBookmark } from "@/service/library/mutations/use-add-bookmark";
import { useRemoveBookmark } from "@/service/library/mutations/use-remove-bookmark";
import { capitalize } from "@/utils/string-utils";
import { MutateOptions } from "@tanstack/react-query";
import { toast } from "sonner";

type ToggleParams =
  | { action: "ADD", options?: MutateOptions<void, Error, string, unknown> | undefined, props: { title: string, slug: string } }
  | { action: "REMOVE", options?: MutateOptions<void, Error, number, unknown> | undefined, props: { id: number, title: string } }

type States = {
  isPending: boolean;
};

type Actions = {
  onBookmark: (params: ToggleParams) => void;
}

type Options = {
  shouldToast: boolean;
}

const defaultOptions: Options = {
  shouldToast: true,
}

const addToast = {
  success: (title: string) => {
    toast.success(`Added ${capitalize(title)} to the bookmarks!`, { position: "top-center" });
  },
  error: (title: string) => {
    toast.error(`There was a problem bookmarking ${capitalize(title)}! Try again later.`, { position: "top-center" });
  }
}

const removeToast = {
  success: (title: string) => {
    toast.success(`Removed ${capitalize(title)} from bookmarks!`, { position: "top-center" });
  },
  error: () => {
    toast.error("There was a problem removing the bookmark! Try again later.", { position: "top-center" });
  }
}

export const useBookmark = (opts = defaultOptions): States & Actions => {
  const removeMutation = useRemoveBookmark();
  const addMutation = useAddBookmark();
  const { shouldToast } = opts;

  const onBookmark = (params: ToggleParams) => {
    switch (params.action) {
      case "ADD": {
        return addMutation.mutate(params.props.slug, {
          ...params.options,
          onSuccess: (a, b, c, d) => {
            params.options?.onSuccess && params.options.onSuccess(a, b, c, d);
            shouldToast && addToast.success(params.props.title);
          },
          onError: (a, b, c, d) => {
            params.options?.onError && params.options.onError(a, b, c, d);
            shouldToast && addToast.error(params.props.title);
          }
        });
      }

      case "REMOVE": {
        return removeMutation.mutate(params.props.id, {
          ...params.options,
          onSuccess: (a, b, c, d) => {
            params.options?.onSuccess && params.options.onSuccess(a, b, c, d);
            shouldToast && removeToast.success(params.props.title);
          },
          onError: (a, b, c, d) => {
            params.options?.onError && params.options.onError(a, b, c, d);
            shouldToast && removeToast.error();
          }
        });
      }
    }
  }

  const isPending = addMutation.isPending || removeMutation.isPending;

  return { onBookmark, isPending }
}