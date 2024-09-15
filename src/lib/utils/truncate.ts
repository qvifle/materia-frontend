const truncate = (string: string | undefined, maxLength: number) => {
  if (!string) {
    return { isTruncated: false, value: "" };
  }
  if (string.length > maxLength) {
    const truncatedArray = string.substring(0, maxLength).split(" ");
    truncatedArray.pop();
    const value = truncatedArray.join(" ") + "...";

    return { isTruncated: true, value: value };
  }
  return { isTruncated: false, value: string };
};

export default truncate;
