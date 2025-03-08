import { memo } from "react";

export const StandardIcon = memo(function StandardIcon(props: { [key: string]: string | number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
      viewBox="0 0 252 252"
      {...props}
    >
      <path
        fill="currentColor"
        d="M170.938 71.313c13.826 12.147 23.737 28.773 25.285 47.368 1.13 20.96-3.172 39.766-17.145 56.085-13.743 14.776-31.652 23.415-51.854 24.262-11.903.217-22.39-2.118-33.224-7.028l-2.836-1.273c-16.703-8.28-28.567-23.803-34.852-41.102-5.346-17.285-4.905-36.792 3.317-53.113L61 94l1.34-2.543c9.751-17.423 25.327-28.478 44.097-34.394 22.854-5.007 46.123-.087 64.5 14.25Z"
      />
      <path
        fill="currentColor"
        d="m197 41 2.578 2.078c21.684 18.41 33.82 45.243 37.11 73.11 2.366 30.03-6.347 60.671-25.985 83.8-20.552 23.19-48.126 37.058-79.103 39.176-30.518 1.495-58.992-8.477-81.85-28.726A1169.688 1169.688 0 0 1 45 206l-1.828-1.598c-18.05-16.49-29.094-44.805-30.293-68.828-1.194-32.654 8.306-61.926 30.719-86.101C84.758 7.108 151.45 3.685 197 41ZM59 63l-2.465 2.434c-17.204 17.91-24.057 42.13-23.75 66.414C33.386 152.093 42.018 171.645 55 187l2.313 2.918c13.455 16.092 35.951 26.209 56.39 28.8 25.186 2.15 50.14-4.272 69.809-20.542C200.778 183.186 212.68 162.72 216 140c1.765-28.065-4.029-52.575-22.629-74.406-17.026-18.626-40.356-29.117-65.398-30.797C101.593 34.372 77.469 44.32 59 63Z"
      />
  </svg>
  );
});
