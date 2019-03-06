import * as axios from "axios";
import { API_WORKFLOW_BASE, AUTH_CREDENTIAL } from "../../config";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json"
};

export const getWorkflows = async () => {
  const result = axios({
    method: "POST",
    url: `${API_WORKFLOW_BASE}/designer/read`,
    crossdomain: true,
    data: {
      auth: AUTH_CREDENTIAL
    },
    headers
  });

  return result;
};
