export const webhook = async (url: string, obj: any, key: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "secret-key": key,
      },
    });
    if (response.ok) {
      return response.status;
    }
    return response.status;
  } catch (error) {
    throw new Error(String(error));
  }
};
