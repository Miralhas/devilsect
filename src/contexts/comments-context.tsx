'use client'

import { SortKey } from "@/lib/schemas/comment-params-schema";
import { PropsWithChildren, useState } from "react";
import { createContext } from "./create-context";
import { User } from "@/types/authentication";
import { useCurrentUserQuery } from "@/services/authentication/client-queries";

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
  const { data: user } = useCurrentUserQuery();


  const handleSort = (key: SortKey) => {
    setSort(key);
  }

  return (
    <ContextProvider value={{
      sort,
      handleSort,
      user,
    }}>
      {children}
    </ContextProvider>
  )
}

export const useCommentsContext = useContext;

