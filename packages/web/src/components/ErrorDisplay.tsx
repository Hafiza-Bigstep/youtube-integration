const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="items-center border p-3.5 rounded text-white-dark border-danger">
    <span className="ltr:pr-2 rtl:pl-2">
      <strong className="ltr:mr-2 rtl:ml-2">Danger!</strong>
      {message}
    </span>
  </div>
);

export default ErrorDisplay;
