import { NavLink } from "react-router-dom";

export default function ItemList({ data, setCurrentItem, filteredItems }) {
  return (
    <div className="h-[60vh] overflow-auto border border-gray bg-light p-1 text-sm dark:bg-dark">
      <ul>
        {data.items.map((item) => (
          <li className="font-serif" key={item._id}>
            {filteredItems?.includes(item) && (
              <NavLink
                to={`/${item.slug.current}`}
                onClick={() => {
                  setCurrentItem(item);
                }}
                className={({ isActive }) =>
                  isActive ? "underline" : "hover:underline"
                }
              >
                <h3>{item.code}</h3>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
