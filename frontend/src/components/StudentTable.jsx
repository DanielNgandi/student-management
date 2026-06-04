export default function StudentTable({ students }) {
  return (
    <table border="1" width="100%" cellPadding="10">
      <thead>
        <tr>
          <th>Name</th>
          <th>Stream</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.stream?.name}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}