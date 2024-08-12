import * as yup from 'yup';

const bookSchema = yup.object().shape({
    title: yup.string()
        .required('Title is required')
        .max(200, 'Title cannot be longer than 200 characters'),
    author: yup.string()
        .trim()
        .required('Author is required')
        .max(150, 'Author name cannot be longer than 150 characters'),
    isbn: yup.string()
        .required('ISBN is required')
        .min(10, 'ISBN must be between 10 and 13 characters long')
        .max(13, 'ISBN must be between 10 and 13 characters long'),
    publicationDate: yup.date()
        .required('Publication Date is required'),
    description: yup.string()
        .max(1000, 'Description cannot be longer than 1000 characters'),
    numberOfPages: yup.number()
        .integer('Number of pages must be a positive number')
        .min(0, 'Number of pages must be a positive number')
        .required('Number of pages is required'),
    genre: yup.string()
        .required('Genre is required')
        .max(100, 'Genre cannot be longer than 100 characters'),
    publisher: yup.string()
        .max(100, 'Publisher name cannot be longer than 100 characters'),
    language: yup.string()
        .required('Language is required')
        .max(50, 'Language cannot be longer than 50 characters'),
});

export default bookSchema;