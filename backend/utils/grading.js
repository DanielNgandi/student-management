const gradingScale = [
  { min: 80, grade: "A" },
  { min: 70, grade: "B" },
  { min: 60, grade: "C" },
  { min: 50, grade: "D" },
  { min: 0, grade: "E" },
];

export const calculateGrade = (score) => {
  const result = gradingScale.find((item) => score >= item.min);
  return result.grade;
};

export default calculateGrade;