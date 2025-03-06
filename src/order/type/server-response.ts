type ChildrenNode = {
  content?: string;
  children?: Record<string, ChildrenNode>[];
};

export interface ServerResponse {
  Result: {
    children: Record<string, ChildrenNode>[];
  };
}
