export default function getStudentsByLocation(students, city) {
  if (students instanceof Array && typeof city === 'string') {
    return students.filter((student) => student.location === city);
  }
  throw TypeError();
}
