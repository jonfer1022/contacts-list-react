import { readCacheEmployeeNote } from '../../../graphql/container/query/notes';

export const updateNotes = (cache, createOneEmployeeNote, employeeId) => {
  const queryCache = readCacheEmployeeNote(employeeId);
  const data = cache.readQuery(queryCache);
  if (createOneEmployeeNote) {
    cache.writeQuery({
      ...queryCache,
      data: {
        employeeNotes: [createOneEmployeeNote, ...data.employeeNotes]
      }
    });
  }
};

export const deleteNote = (cache, deleteOneEmployeeNote, employeeId) => {
  const queryCache = readCacheEmployeeNote(employeeId);
  const data = cache.readQuery(queryCache);
  if (deleteOneEmployeeNote) {
    cache.writeQuery({
      ...queryCache,
      data: {
        employeeNotes: data.employeeNotes.filter(
          note => note.id !== deleteOneEmployeeNote.id
        )
      }
    });
  }
};
