import footer_logo from "../img/footerimg.svg";
export default function Footer() {
return (
<footer className="bg-white dark:bg-gray-900">
<div className="mx-auto w-full max-w-7xl p-4 py-6 lg:p-8">
<div className="md:flex md:justify-between">
<div className="mb-6 md:mb-0">
<a href="" className="flex items-center">
<img src={footer_logo} className="h-8 mr-3" alt="Flowbite Logo" />
<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Medware
</span>
</a>
</div>
<div className="grid grid-cols-2 gap-12 sm:gap-8 sm:grid-cols-3">
<div>
<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Follow us
</h2>
<ul className="text-gray-600 dark:text-gray-400 fo">
<li className="mb-4">
<a href="" className="hover:underline ">
                    Github
</a>
</li>
<li>
<a href="" className="hover:underline">
                    Discord
</a>
</li>
</ul>
</div>
<div>
<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
</h2>
<ul className="text-gray-600 dark:text-gray-400 fo">
<li className="mb-4">
<a href="#" className="hover:underline">
                    Privacy Policy
</a>
</li>
<li>
<a href="#" className="hover:underline">
                    Terms 
&amp; Conditions
</a>
</li>
</ul>
</div>
</div>
</div>
<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
<div className="sm:flex sm:items-center sm:justify-between mx-auto w-full max-w-7xl p-4 py-6 lg:p-8">
<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            ©
2023{" "}
<a href="" className="hover:underline">
              Medware™
</a>
. All Rights Reserved.
</span>
<div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
<a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
>
<svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
>
<path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.261c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.987C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
/>
</svg>
<span className="sr-only">Facebook page</span>
</a>
<a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
>
<svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
>
    <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.05 1.637.217 2.022.36a4.11 4.11 0 011.487.967 4.11 4.11 0 01.967 1.487c.143.385.31.958.36 2.022C22 9.216 22.013 9.57 22.013 12s-.013 2.784-.06 3.808c-.05 1.064-.217 1.637-.36 2.022a4.11 4.11 0 01-.967 1.487 4.11 4.11 0 01-1.487.967c-.385.143-.958.31-2.022.36C14.784 22 14.43 22.013 12 .013s-2.784-.013-3.808-.06c-1.064-.05-1.637-.217-2.022-.36a4.11 4.11 0 01-1.487-.967A4.11 4.11 0 01-.967 19c-.143-.385-.31-.958-.36-2.022C0 14.784-.013 14.43-.013 12s .013-2.784 .06-3.808c .05-1 .217-1 .36-2 .143-.385 .31-.958 .967-1 .487A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .11A4 .110zM10.315 8a4.11 4.11 0 100 8.22 4.11 4.11 0 000-8.22zm1.77-2.29a1.51 1.51 0 11-3.02 0 1.51 1.51 0 013.02 0z"
                  clipRule="evenodd"
/>
</svg>
<span className="sr-only">Instagram page</span>
</a>
<a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
>
<svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
>
<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646A4.118 4.118 0 0021.447 4c-.797.473-1.68.816-2.624 1A4.107 4.107 0 0014.847 4c-3.179 0-5.515 2.966-5.515 6.623a4.644 4.644 0 001.094 3.07A4.093 4.093 0 012 .923v.052a6.635 6.635 0 005.325-2C6.29 9.42 5.64 7.95 5.64 6c0-1.47 .523-2.75 1.382-3.717a5.904 5.904 0 0116 .002c-.86 .967 -1.382 2.248 -1.382 3.717z" />
</svg>
<span className="sr-only">Twitter page</span>
</a>
<a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
>
<svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
>
<path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.175 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.787.606-3.373-1.343-3.373-1.343-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032 .892 1.528 2.341 1.086 2.91 .83 .092-.644 .35-1.086 .636-1.336-2.22-.252-4.555-1.11-4.555-4.945 0-1.092 .39-1.984 1.032-2.683-.103-.253-.448-1.27 .098-2.647 0 0 .844-.27 2.77 1.032a9.66 9.66 0 012..52-.338c .856 .004 1..713 .116 2..52 .338a3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..87A3..870zM8 ..29 16 ..251a4 ..11 4 ..11 0 100 -8 ..22 4 ..11 4 ..11 0 000 8 ..22zm1 ..77 -2 ..29a1 ..51 1 ..51 0 11 -3 ..02 0a1 ..51 1 ..51 0 013 ..02z"
                  clipRule="evenodd"
                  />
</svg>
<span className="sr-only">GitHub account</span>
</a>
<a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
>
<svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
>
<path
                  fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-1.99 15c-.54 0-.98-.44-.98-.98s.44-.98.98-.98c.54 0 .98.44.98.98s-.44.98-.98.98zm0-1.96c-.54 0-.98-.44-.98-.98s.44-.98.98-.98c.54 0 .98.44.98.98s-.44.98-.98.98zm3.99 1.96c-.54 0-.98-.44-.98-.98s.44-.98.98-.98c.54 0 .98.44.98.98s-.44.98-.98.98zm0-1.96c-.54 0-.98-.44-.98-.98s.44-.98.98-.98c.54 0 .98.44 .98.98s-.44.98-.98.98zM12 7c-.54 0-.98-.44-.98-.98s.44-.98.98-.98c.54 0 .98.44.98.98s-.44.98-.98.98z"
                  clipRule="evenodd"
/>
</svg>
<span className="sr-only">Dribbble account</span>
</a>
</div>
</div>
</div>
</footer>
);
}