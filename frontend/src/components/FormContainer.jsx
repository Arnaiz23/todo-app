const FormContainer = ({ handleSubmit, children, buttonTitle }) => {
  return (
    <form
      className="flex flex-col justify-center items-center gap-3 w-[90%]"
      onSubmit={handleSubmit}
    >
      {children}
      <button type="submit" className="bg-cyan-700 p-2 rounded">
        {buttonTitle}
      </button>
    </form>
  )
}

export default FormContainer
