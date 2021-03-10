const fetcher = async (input: RequestInfo, init?: RequestInit): Promise<unknown> => {
  const res = await fetch(input, init);
  return res.json();
};

export default fetcher;
