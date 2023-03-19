const CpuIcon = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24">
      <rect x="0" y="0" fill="none" stroke="none" />
      <path fill="currentColor" d="M9 9h6v6H9z" />
      <path
        fill="currentColor"
        d="M20 6c0-1.103-.897-2-2-2h-2V2h-2v2h-4V2H8v2H6c-1.103 0-2 .897-2 2v2H2v2h2v4H2v2h2v2c0 1.103.897 2 2 2h2v2h2v-2h4v2h2v-2h2c1.103 0 2-.897 2-2v-2h2v-2h-2v-4h2V8h-2V6zM6 18V6h12l.002 12H6z"
      />
    </svg>
  );
};

const MemoryIcon = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24">
      <rect x="0" y="0" fill="none" stroke="none" />
      <path
        fill="currentColor"
        d="M15 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V7l-5-5zm-6 8H7V6h2v4zm3 0h-2V6h2v4zm3 0h-2V6h2v4z"
      />
    </svg>
  );
};

const NetworkIcon = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24">
      <rect x="0" y="0" fill="none" stroke="none" />
      <path
        fill="currentColor"
        d="M2.1 11.1L0 9q2.3-2.35 5.375-3.675T12 4q.6 0 1.2.037t1.2.113l-1.5 2.9Q12.6 7 12.412 7H12Q9.1 7 6.562 8.088T2.1 11.1Zm4.25 4.25l-2.1-2.15q1.4-1.4 3.213-2.212t3.937-.938L9.8 13.3q-.975.3-1.85.813t-1.6 1.237Zm4.95 4.5q-.75-.275-1.163-1.038T10.1 17.3l6-12.2q.1-.2.288-.263t.412.013q.2.075.3.25t.05.4L13.9 18.65q-.2.825-1 1.15t-1.6.05Zm6.35-4.5q-.15-.15-.325-.3t-.375-.3l.8-3.15q.525.375 1.038.763t.962.837l-2.1 2.15Zm4.25-4.25q-.75-.75-1.612-1.375T18.45 8.6l.7-3q1.35.65 2.575 1.5T24 9l-2.1 2.1Z"
      />
    </svg>
  );
};

const BatteryIcon = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24">
      <rect x="0" y="0" fill="none" stroke="none" />
      <path
        fill="currentColor"
        d="M10 14.725q0 .575.213 1.088t.612.912l.225.225q.275.275.688.275t.712-.275q.3-.3.3-.712t-.3-.713l-.225-.225q-.125-.125-.175-.263T12 14.75q0-.175.05-.312t.175-.263l.95-.95q.4-.4.613-.9t.212-1.05q0-.575-.212-1.087t-.613-.913l-.25-.25q-.3-.3-.7-.288t-.7.313q-.275.3-.288.7t.288.7l.225.225q.125.125.188.262t.062.313q0 .15-.063.288t-.187.262l-.925.95q-.4.4-.613.9T10 14.725ZM8 22q-.425 0-.713-.288T7 21V5q0-.425.288-.713T8 4h2V3q0-.425.288-.713T11 2h2q.425 0 .713.288T14 3v1h2q.425 0 .713.288T17 5v16q0 .425-.288.713T16 22H8Z"
      />
    </svg>
  );
};

const GraphDownIcon = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 16 16">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 0h1v15h15v1H0V0Zm10 11.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-1 0v2.6l-3.613-4.417a.5.5 0 0 0-.74-.037L7.06 8.233L3.404 3.206a.5.5 0 0 0-.808.588l4 5.5a.5.5 0 0 0 .758.06l2.609-2.61L13.445 11H10.5a.5.5 0 0 0-.5.5Z"
      />
    </svg>
  );
};

const GraphUpIcon = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 16 16">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"
      />
    </svg>
  );
};

export {
  CpuIcon,
  MemoryIcon,
  NetworkIcon,
  BatteryIcon,
  GraphUpIcon,
  GraphDownIcon,
};
