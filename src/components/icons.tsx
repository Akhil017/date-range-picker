type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  prev: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-chevron-left"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  next: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-chevron-right"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
};
