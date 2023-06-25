const checkTextLength = (length: number) => (str: string) =>
  !!str.trim() && str.length < length;
  
export default checkTextLength;
