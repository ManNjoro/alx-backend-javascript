export default function getStudentIdsSum(students) {
  if (students instanceof Array) {
    return students.reduce((total, current) => total + current.id, 0);
  }
  throw TypeError();
}
