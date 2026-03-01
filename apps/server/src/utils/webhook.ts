export const webhook_fn = async (url: string, method: string) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.status;
    return data;
  } catch (error) {
    throw new Error(String(error));
  }
};
