// src/components/UI/Input.jsx
export const Input = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
}) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-sm font-medium text-gray-300">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      className="w-full p-4 rounded-xl bg-[#1E1E24] border border-transparent focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all text-white placeholder:text-gray-600"
    />
  </div>
);
