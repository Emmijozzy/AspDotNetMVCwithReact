import { useEffect, useState } from "react"
import UseFetch from "../Hooks/UseFetch"
import { Link } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  genre: string;
  isbn: string;
  language: string;
  numberOfPage:number;
  publisher: string;
  publicationDate: string;
}

const Index = () => {
  const {data, error, fetchData} = UseFetch()
  const [loading, setLoading] = useState(false)

  let content;
  console.log("Call book")
 
  useEffect( () => {
    const getBook = async () => {
      setLoading(true)
      await fetchData("BooksApi", { method: 'get'})
      setLoading(false)
    }  
    getBook();
    
  }, [])

  if (loading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error: {error as string}</div>;
  } else if (data && Object.keys(data).length >= 1) {
    const books = data as unknown as Book[];
    content =  (
          <>
            <div className="mt-12">
              <p className="text-lg font-semibold text-slate-900">Book List</p>
              <Link to="/Books/create" className="mt-4 inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">Create New</Link>
            </div>
      
            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Id</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Author</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ISBN</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Publication Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Number of Pages</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Genre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Publisher</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Language</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                       {books ? 
                        books.map((item) => (
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.author}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.isbn}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.publicationDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.numberOfPage}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.genre}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.publisher}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.language}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link to={`/Books/Edit/${item.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link> |
                                <Link to={`/Books/Details/${item.id}`}  className="text-indigo-600 hover:text-indigo-900">Details</Link> |
                                <Link to={`/Books/Delete/${item.id}`}  className="text-indigo-600 hover:text-indigo-900">Delete</Link>
                            </td>
                          </tr>
                        )) : ""
                       }
                    </tbody>
                </table>
            </div>
          </>
        );
  } else {
    content = <div>No data available</div>;
  }


  // if (!loading && books.length >= 0) {
  //   content =
  // }

  return content
}
export default Index