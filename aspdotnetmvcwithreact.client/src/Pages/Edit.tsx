import { Link } from "react-router-dom";
import UseEdit from "../Hooks/UseEdit";


const Edit = () => {

  const { handleChange, handleSubmit, values, errors } = UseEdit();

  console.log(values.author);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white p-8 shadow-md rounded-lg space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-900">Edit Book</h1>
                <h4 className="mt-2 text-sm text-gray-600">Modify the book details below</h4>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            onChange={handleChange}
                            value={values.title}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Title"
                        />
                        <span className="text-red-600 text-sm">{errors.title}</span>
                    </div>
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            onChange={handleChange}
                            value={values.author}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Author"
                        />
                        <span className="text-red-600 text-sm">{errors.author}</span>
                    </div>
                    <div>
                        <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">isbn</label>
                        <input
                            id="isbn"
                            name="isbn"
                            type="text"
                            onChange={handleChange}
                            value={values.isbn}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="ISBN"
                        />
                        <span className="text-red-600 text-sm">{errors.isbn}</span>
                    </div>
                    <div>
                        <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700">Publication Date</label>
                        <input
                            id="publicationDate"
                            name="publicationDate"
                            type="date"
                            onChange={handleChange}
                            // value={new Date(values.publicationDate).getDate()}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Publication Date"
                        />
                        <span className="text-red-600 text-sm">{errors.publicationDate}</span>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            onChange={handleChange}
                            value={values.description}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Description"
                        ></textarea>
                        <span className="text-red-600 text-sm">{errors.description}</span>
                    </div>
                    <div>
                        <label htmlFor="numberOfPages" className="block text-sm font-medium text-gray-700">Number of Pages</label>
                        <input
                            id="numberOfPages"
                            name="numberOfPages"
                            type="number"
                            onChange={handleChange}
                            value={values.numberOfPages}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Number of Pages"
                        />
                        <span className="text-red-600 text-sm">{errors.numberOfPages}</span>
                    </div>
                    <div>
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
                        <input
                            id="genre"
                            name="genre"
                            type="text"
                            onChange={handleChange}
                            value={values.genre}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Genre"
                        />
                        <span className="text-red-600 text-sm">{errors.genre}</span>
                    </div>
                    <div>
                        <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">Publisher</label>
                        <input
                            id="publisher"
                            name="publisher"
                            type="text"
                            onChange={handleChange}
                            value={values.publisher}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Publisher"
                        />
                        <span className="text-red-600 text-sm">{errors.publisher}</span>
                    </div>
                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                        <input
                            id="language"
                            name="language"
                            type="text"
                            onChange={handleChange}
                            value={values.language}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Language"
                        />
                        <span className="text-red-600 text-sm">{errors.language}</span>
                    </div>
                </div>
                <div className="mt-6">
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save Changes
                    </button>
                </div>
            </form>
            <div className="text-center mt-4">
                <Link to="/Books" className="text-sm text-indigo-600 hover:text-indigo-500">Back to List</Link>
            </div>
        </div>
    </div>
);

}
export default Edit
