const VISITOR_ACTUAL_URL = process.env.NEXT_PUBLIC_VISITOR_ACTUAL_URL as string;

export const getVisitorLatesEntryDate = async (): Promise<{ date: string }> => {
  try {
    const response = await fetch(VISITOR_ACTUAL_URL, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
