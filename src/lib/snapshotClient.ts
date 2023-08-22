import snapshot from "@snapshot-labs/snapshot.js";

const hub = " https://testnet.snapshot.org "; // or https://testnet.snapshot.org for testnet
export const snapshotClient = new snapshot.Client712(hub);
