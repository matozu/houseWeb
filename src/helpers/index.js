export const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );

export const groupMessages = (messages, username) => {
  const result = {};
  messages.map((m) => {
    if (m.from != username) {
      result[m.from] = [...(result[m.from] || []), m];
    } else {
      result[m.to] = [...(result[m.to] || []), m];
    }
  });
  return result;
};
