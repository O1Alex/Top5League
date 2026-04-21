const sortPlayersByPosition = (players) => {
  const order = {
    PG: 1,
    SG: 2,
    SF: 3,
    PF: 4,
    C: 5
  };

  return [...players].sort(
    (a, b) => (order[a.position] ?? 99) - (order[b.position] ?? 99)
  );
};

export default sortPlayersByPosition;