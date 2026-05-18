const initialsFor = (name = "Doctor") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const DoctorProfile = ({ doctors }) => {
  return (
    <article className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div className="h-24 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500" />
          <div className="-mt-14 flex flex-col items-center px-6 pb-6">
            {doctor.image_link ? (
              <img
                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                src={doctor.image_link}
                alt={`${doctor.name} profile`}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.nextSibling.style.display = "grid";
                }}
              />
            ) : null}
            <div
              className="hidden h-28 w-28 place-content-center rounded-full border-4 border-white bg-slate-800 text-3xl font-bold text-white shadow-lg"
              aria-label={`${doctor.name} initials`}
            >
              {initialsFor(doctor.name)}
            </div>

            <h2 className="mt-4 text-center text-2xl font-bold text-slate-900">
              {doctor.name}
            </h2>
            <span className="mt-1 rounded-full bg-cyan-50 px-4 py-1 text-sm font-semibold text-cyan-700">
              {doctor.speciality}
            </span>

            <div className="mt-5 grid w-full grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-2xl font-bold text-slate-900">
                  {doctor.experience}+
                </p>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Years exp.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-sm font-bold capitalize text-slate-900">
                  {doctor.sex}
                </p>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Provider
                </p>
              </div>
            </div>

            <div className="mt-5 w-full rounded-2xl border border-slate-100 p-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Work Address
              </h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-700">
                {doctor.work_address}
              </p>
            </div>

            <div className="mt-5 flex w-full gap-3">
              <a
                href={`tel:${doctor.mobile_no}`}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Call
              </a>
              <a
                href={doctor.profile_link || `tel:${doctor.mobile_no}`}
                target={doctor.profile_link ? "_blank" : undefined}
                rel={doctor.profile_link ? "noreferrer" : undefined}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Profile
              </a>
            </div>
          </div>
        </div>
      ))}
    </article>
  );
};

export default DoctorProfile;
