const DoctorProfile = ({ doctors }) => {
return (
<article className="flex justify-center w-screen gap-10 flex-wrap">
    {doctors.map((doctor) => (
<div
          key={doctor.id}
          className="w-72 h-96 max-w-sm bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
>
<img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={doctor.image_link}
            alt="Image"
/>
<h5 className=" text-xl text-gray-900 font-semibold">
{doctor.name}
</h5>
<span
            className=" font-normal
              text-gray-600"
>
{doctor.speciality}
</span>
<div className="flex mt-4 space-x-3 md:mt-6 ">
<a
              href={`tel:${doctor.mobile_no}`}
              className="w-24 h-10 py-2 text-sm font-semibold text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
>
              Contact
</a>
<a
              href="#"
              className="w-24 h-10 py-2 text-sm font-semibold text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
>
              View Profile
</a>
</div>
<div className="mt-1 italic text-gray-500 text-sm font-normal">
{doctor.experience} Years of Experience
</div>
<div className="px-1 mt-2 text-gray-700 pl-4 w-5/6">
<h2 className=" text-base font-semibold font  w-full">Work Address</h2>
<p className="italic text-sm h-14 overflow-scroll">
{doctor.work_address}
</p>
</div>
</div>
))}
</article>
);
};
export default DoctorProfile;