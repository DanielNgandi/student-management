export const rankStudents = (students) => {
  const ranked = [...students]
    .sort((a, b) => b.average - a.average)
    .map((student, index) => ({
      ...student,
      position: index + 1,
    }));

  return ranked;
};

export default rankStudents;