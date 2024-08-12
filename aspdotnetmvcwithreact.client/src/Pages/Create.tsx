import UseCreate from "../Hooks/UseCreate";


const Create = () => {
  
  const {handleChange, handleSubmit, values, errors} = UseCreate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-10 bg-white p-8 shadow-lg rounded-lg">
          <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900">Add a New Book</h1>
              <p className="mt-2 text-lg text-gray-600">Fill in the details to create a new book entry</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                  <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                          id="title"
                          name="title"
                          type="text"
                          onChange={handleChange}
                          value={values.title}
                          className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Book Title"
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
                          className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Author Name"
                      />
                      <span className="text-red-600 text-sm">{errors.author}</span>
                  </div>
                  <div>
                      <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">ISBN</label>
                      <input
                          id="isbn"
                          name="isbn"
                          type="text"
                          onChange={handleChange}
                          value={values.isbn}
                          className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="ISBN Number"
                      />
                      <span className="text-red-600 text-sm">{errors.isbn}</span>
                  </div>
                  <div>
                      <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700">Publication Date</label>
                      <input
                          id="publicationDate"
                          name="publicationDate"
                          type="Date"
                          onChange={handleChange}
                          value={values.publicationDate}
                          className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="YYYY-MM-DD"
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
                          className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Brief description of the book"
                      ></textarea>
                      <span className="text-red-600 text-sm">{errors.description}</span>
                  </div>
                  <div>
                      <label htmlFor="numberOfPages" className="block text-sm font-medium text-gray-700">Number of Pages</label>
                      <input
                          id="numberOfPages"
                          name="numberOfPages"
                          type="text"
                          onChange={handleChange}
                          value={values.numberOfPages}
                          className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Total pages"
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
                          className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Book Genre"
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
                          className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Publisher Name"
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
                          className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Language"
                      />
                      <span className="text-red-600 text-sm">{errors.language}</span>
                  </div>
              </div>
              <div>
                  <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <svg className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                          </svg>
                      </span>
                      Create Book
                  </button>
              </div>
          </form>
          <div className="text-center mt-6">
              <a href="/books" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Back to List</a>
          </div>
      </div>
    </div>
  )
}
export default Create