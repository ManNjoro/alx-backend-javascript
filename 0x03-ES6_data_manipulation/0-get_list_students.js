export default function getListStudents() {
  const students = [
    { id: 1, firstName: 'Guillaume', location: 'San Francisco' },
    { id: 2, firstName: 'James', location: 'Columbia' },
    { id: 5, firstName: 'Serena', location: 'San Francisco' },
  ];

  // Type-checking for each student object
  for (const student of students) {
    if (
      typeof student.id !== 'number'
            || typeof student.firstName !== 'string'
            || typeof student.location !== 'string'
    ) {
      throw new TypeError('Invalid student data types');
    }
  }

  return students;
}
