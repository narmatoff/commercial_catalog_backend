type ChildrenNode = { children: GenericNode[] };

export type ContentNode = { content: string };
export type GenericNode = Record<string, ContentNode | ChildrenNode>;
export type DsServerApiResponse = {
  Result: {
    children: GenericNode[];
  };
};
