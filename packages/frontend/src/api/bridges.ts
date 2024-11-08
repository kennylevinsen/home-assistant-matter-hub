import {
  BridgeData,
  CreateBridgeRequest,
  UpdateBridgeRequest,
} from "@home-assistant-matter-hub/common";

export async function fetchBridges() {
  const res = await fetch(`/api/matter/bridges?_s=${Date.now()}`);
  const json = await res.json();
  return json as BridgeData[];
}

export async function createBridge(req: CreateBridgeRequest) {
  return fetch("/api/matter/bridges", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  }).then((res) => res.json() as Promise<BridgeData>);
}

export async function updateBridge(req: UpdateBridgeRequest) {
  return fetch(`/api/matter/bridges/${req.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  }).then((res) => res.json() as Promise<BridgeData>);
}

export async function deleteBridge(bridgeId: string) {
  await fetch(`/api/matter/bridges/${bridgeId}`, {
    method: "DELETE",
  });
}