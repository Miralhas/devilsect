'use client'

import { SortKey } from "@/lib/schemas/search-params/comment-params-schema";
import { User } from "@/types/authentication";
import { PropsWithChildren, useState } from "react";
import { createContext } from "./create-context";
import { useAuthContext } from "./use-auth-context";

type CommentsState = {
  sort: SortKey;
  user: User | undefined;
};

type CommentsActions = {
  handleSort: (key: SortKey) => void;
};

const initialValues: CommentsState = {
  sort: SortKey.NEWEST,
  user: undefined,
};

const { ContextProvider, useContext } = createContext<CommentsState & CommentsActions>();

export const CommentsProvider = ({ children }: PropsWithChildren) => {
  const [sort, setSort] = useState<SortKey>(initialValues["sort"]);
  const { authState } = useAuthContext();


  const handleSort = (key: SortKey) => {
    setSort(key);
  }

  return (
    <ContextProvider value={{
      sort,
      handleSort,
      user: authState?.user,
    }}>
      {children}
    </ContextProvider>
  )
}

export const useCommentsContext = useContext;

