const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto h-20">
      <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          &copy; 2024 - Book Library - <a className="text-blue-500 hover:text-blue-700" asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
      </div>
    </footer>
  )
}
export default Footer