type Call = {
  args: string[];
  func_selector: string;
  target: string;
  value: number;
};

type Proposal = {
  calls: Call[];
  dst_chain: string;
};

export type Events = {
  "proposal/execute": {
    data: {
      proposals: Proposal[];
      src_chain: string;
      run_at: string;
    };
  };
};
