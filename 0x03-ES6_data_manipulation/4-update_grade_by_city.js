export default function updateStudentGradeByCity(students, city, newGrades) {
  if (students instanceof Array && typeof city === 'string') {
    return students
      .filter((student) => student.location === city)
      .map((student) => {
        const matchingGrade = newGrades.find((grade) => grade.studentId === student.id);

        return {
          ...student,
          grade: matchingGrade ? matchingGrade.grade : 'N/A',
        };
      });
  }
  throw Error();
}
