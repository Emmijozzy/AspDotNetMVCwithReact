import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UseFetch from "../Hooks/UseFetch";

const Delete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
      id: '',
      title: '',
      author: '',
      isbn: '',
      publicationDate: '',
      description: '',
      numberOfPages: '',
      genre: '',
      publisher: '',
      language: ''
  });

  const  {error, fetchData } = UseFetch()

  useEffect(() => {
    const getBook = async () => {
      await fetchData("BooksApi/"+id , { method: 'get'})
      .then((data) => {
        console.log(data);
        if (data) return data;
      })
      .then((initialData) => {
        setBook(initialData)
      })
      .catch(err => {
          console.log(error)
          console.error('There was an error fetching the book!', err);
      });
    }
    getBook();

  }, [id]);

  const handleDelete = () => {
    const deleteBook = async () => {
      await fetchData("BooksApi/"+id , { method: 'get'})
          .then(() => {
              navigate('/books');
          })
          .catch(error => {
              console.error('There was an error deleting the book!', error);
          });
    }

    deleteBook();

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
        <div className="max-w-3xl w-full bg-white p-6 shadow-md rounded-md">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-semibold text-red-700">Delete Book</h1>
                <p className="mt-1 text-base text-gray-700">Are you sure you want to delete this book? This action cannot be undone.</p>
            </div>
            <div>
                <h4 className="text-lg font-medium text-gray-800 border-b border-gray-300 pb-2">Book Details</h4>
                <dl className="mt-4 grid grid-cols-1 gap-2">
                    <div className="flex gap-2 py-2 border-b border-gray-200">
                        <dt className="text-gray-600">ID:</dt>
                        <dd className="text-gray-900 font-medium">{book.id}</dd>
                    </div>
                    <div className="flex gap-2 py-2 border-b border-gray-200">
                        <dt className="text-gray-600">Title:</dt>
                        <dd className="text-gray-900 font-medium">{book.title}</dd>
                    </div>
                    <div className="flex gap-2 py-2 border-b border-gray-200">
                        <dt className="text-gray-600">Author:</dt>
                        <dd className="text-gray-900 font-medium">{book.author}</dd>
                    </div>
                    <div className="flex gap-2 py-2 border-b border-gray-200">
                        <dt className="text-gray-600">ISBN:</dt>
                        <dd className="text-gray-900 font-medium">{book.isbn}</dd>
                    </div>
                    <div className="flex gap-2 py-2 border-b border-gray-200">
                        <dt className="text-gray-600">Publication Date:</dt>
                        <dd className="text-gray-900 font-medium">{book.publicationDate}</dd>
                    </div>
                    <div className="flex gap-2 py-2 border-b border-gray-200">
                        <dt className="text-gray-600">Description:</dt>
                        <dd className="text-gray-900 font-medium">{book.description}</dd>
                    </div>
                    <div className="flex gap-2 py-2 border-b border-gray-200">
                        <dt className="text-gray-600">Number of Pages:</dt>
                        <dd className="text-gray-900 font-medium">{book.numberOfPages}</dd>
                    </div>
                    <div className="flex gap-2 py-2 border-b border-gray-200">
                        <dt className="text-gray-600">Genre:</dt>
                        <dd className="text-gray-900 font-medium">{book.genre}</dd>
                    </div>
                    <div className="flex gap-2 py-2 border-b border-gray-200">
                        <dt className="text-gray-600">Publisher:</dt>
                        <dd className="text-gray-900 font-medium">{book.publisher}</dd>
                    </div>
                    <div className="flex gap-2 py-2 border-b border-gray-200">
                        <dt className="text-gray-600">Language:</dt>
                        <dd className="text-gray-900 font-medium">{book.language}</dd>
                    </div>
                </dl>
            </div>
            <div className="mt-6">
                <button onClick={handleDelete} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Delete Book
                </button>
                <div className="mt-3 text-center">
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      <Link to={`/Books`} >Back to List</Link>
                    </button>
                </div>
            </div>
        </div>
    </div>
);
}
export default Delete