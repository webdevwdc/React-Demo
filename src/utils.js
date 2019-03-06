export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const createData = (name, description, date, status) => {
  return { id: uuidv4(), name, description, date, status };
};

export const getHeaders = ["form name", "form description", "form date"];

const { NODE_ENV } = process.env;

export const isDev = (NODE_ENV === 'development' || NODE_ENV === 'dev');

export const render = component => () => component;

export const isOnline = window.navigator.onLine;