const Header = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <a className="text-2xl font-bold text-gray-800" asp-area="" asp-controller="Home" asp-action="Index">Book Library</a>
        <div className="md:hidden">
            <button className="navbar-toggler focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
        {/* <div className="hidden md:flex space-x-4">
            <a className="nav-link text-gray-600 hover:text-gray-800" asp-area="" asp-controller="Home" asp-action="Index">Home</a>
            <a className="nav-link text-gray-600 hover:text-gray-800" asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
        </div>  */}
      </nav>
    </header>
  )
}
export default Header