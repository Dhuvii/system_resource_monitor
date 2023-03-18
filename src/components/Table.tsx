import React from "react";
import parse from "html-react-parser";

export type Props<T extends string> = {
  title?: string;
  headings: T[];
  datas: {
    [heading in T]: {
      value: string;
      badge?: boolean;
    } & React.ComponentPropsWithoutRef<"span">;
  }[];
  classNames?: string;
} & React.ComponentPropsWithoutRef<"table">;

const Table = <T extends string>({
  title,
  headings = [],
  datas = [],
  classNames,
}: Props<T>) => {
  return (
    <div
      className={`${classNames} w-full h-full overflow-x-auto overflow-y-auto relative shadow-md rounded-lg`}
    >
      {title && (
        <div className="w-full py-1 px-3 bg-gray-100/[0.95] border border-b-0 rounded-t-xl shadow-inner flex items-center justify-center">
          <span className="text-gray-700 text-[10px] uppercase tracking-wider font-bold">
            {title}
          </span>
        </div>
      )}
      <table className="w-full h-full overflow-y-auto text-sm text-left text-gray-500 rounded-lg">
        <thead className="text-xs sticky top-0 text-white bg-[#222431] ">
          <tr>
            {headings.map((heading, idx) => (
              <th
                key={idx}
                scope="col"
                className="px-6 py-3 text-center whitespace-nowrap uppercase"
              >
                {heading.split("_").join(" ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {datas.map((data, idx) => (
            <tr key={idx} className="bg-white/5 border-b border-gray-700">
              {headings.map((key, idx) => (
                <td
                  key={idx}
                  className={`${
                    data[key].className && data[key].className
                  } px-6 py-4 border-r}`}
                >
                  {data[key].badge ? (
                    <span
                      className={`${
                        data[key].value.length > 1
                          ? " bg-blue-300 text-blue-900"
                          : "bg-yellow-300 text-yellow-900"
                      } p-1 px-2 rounded-md`}
                    >
                      {data[key].value}
                    </span>
                  ) : (
                    parse(data[key].value)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
