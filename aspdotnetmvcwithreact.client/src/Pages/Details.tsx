import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UseFetch from "../Hooks/UseFetch";

const Details = () => {
  const { id } = useParams();
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white p-8 shadow-md rounded-lg space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-900">Book Details</h1>
            </div>
            <div>
                <h4 className="mt-4 text-center text-xl font-semibold text-gray-700">Book Information</h4>
                <hr className="my-4 border-t border-gray-300" />
                <dl className="grid grid-cols-1 gap-6">
                    <div className="flex gap-2 border-b py-2">
                        <dt className="font-medium text-gray-600">ID:</dt>
                        <dd className="text-gray-900 font-semibold">{book.id}</dd>
                    </div>
                    <div className="flex gap-2 border-b py-2">
                        <dt className="font-medium text-gray-600">Title:</dt>
                        <dd className="text-gray-900 font-semibold">{book.title}</dd>
                    </div>
                    <div className="flex gap-2 border-b py-2">
                        <dt className="font-medium text-gray-600">Author:</dt>
                        <dd className="text-gray-900 font-semibold">{book.author}</dd>
                    </div>
                    <div className="flex gap-2 border-b py-2">
                        <dt className="font-medium text-gray-600">ISBN:</dt>
                        <dd className="text-gray-900 font-semibold">{book.isbn}</dd>
                    </div>
                    <div className="flex gap-2 border-b py-2">
                        <dt className="font-medium text-gray-600">Publication Date:</dt>
                        <dd className="text-gray-900 font-semibold">{book.publicationDate}</dd>
                    </div>
                    <div className="flex gap-2 border-b py-2">
                        <dt className="font-medium text-gray-600">Description:</dt>
                        <dd className="text-gray-900 font-semibold overflow-x-auto">{book.description}</dd>
                    </div>
                    <div className="flex gap-2 border-b py-2">
                        <dt className="font-medium text-gray-600">Number of Pages:</dt>
                        <dd className="text-gray-900 font-semibold">{book.numberOfPages}</dd>
                    </div>
                    <div className="flex gap-2 border-b py-2">
                        <dt className="font-medium text-gray-600">Genre:</dt>
                        <dd className="text-gray-900 font-semibold">{book.genre}</dd>
                    </div>
                    <div className="flex gap-2 border-b py-2">
                        <dt className="font-medium text-gray-600">Publisher:</dt>
                        <dd className="text-gray-900 font-semibold">{book.publisher}</dd>
                    </div>
                    <div className="flex gap-2 py-2">
                        <dt className="font-medium text-gray-600">Language:</dt>
                        <dd className="text-gray-900 font-semibold">{book.language}</dd>
                    </div>
                </dl>
                <div className="relative mt-6 flex justify-center items-center gap-4">
                    <button className="w-1/2 px-6 py-2 bg-slate-900 rounded-lg text-white hover:bg-slate-700">
                      <Link to={`/Books/Edit/${book.id}`}>
                            Edit
                      </Link>
                    </button>
                    <button className="w-1/2 px-6 py-2 bg-slate-900 rounded-lg text-white hover:bg-slate-700">
                      <Link to={`/Books`} >
                            Back
                      </Link>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
export default Details