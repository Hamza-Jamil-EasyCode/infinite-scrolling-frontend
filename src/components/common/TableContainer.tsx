// import React, { useEffect, useState } from "react";
// import filterImage from "../../assets/filter.png";
// import { findSortOrder } from "../helper/helper";

// interface ColumnDataModel {
//   title: string;
//   field: string;
//   filtering?: boolean;
//   isSort?: boolean;
//   component?: (rowData: any) => React.ReactNode;
// }

// type Props = {
//   data?: any;
//   isShowActionColumn?: boolean;
//   isFilter?: boolean;
//   columns: Array<ColumnDataModel>;
//   isSelection?: boolean;
//   selectHandler?: (allData: any) => void;
//   isShowFooter?: boolean;
//   rowsPerPage?: Array<number>;
//   defaultRows?: number;
//   indexing?: boolean;
// };

// const TableContainer = ({
//   isShowActionColumn,
//   isFilter,
//   data,
//   columns,
//   isSelection,
//   indexing,
//   selectHandler,
//   isShowFooter,
//   rowsPerPage,
//   defaultRows,
// }: Props) => {
//   const [filter, setFilter] = useState<{ [key: string]: any }>(() =>
//     columns.reduce((accumulator, value, index) => {
//       return { ...accumulator, [`${value.field}`]: "" };
//     }, {})
//   );
//   const [tableData, setTableData] = useState(data);
//   const [isAllSelect, setIsAllSelect] = useState<boolean>(false);
//   const [numberOfPages, setNumberOfPages] = useState<number>(defaultRows || 5);
//   const [pageNumber, setPageNumber] = useState<number>(1);
//   const [pageIndex, setPageIndex] = useState({
//     startIndex: pageNumber * numberOfPages - numberOfPages,
//     lastIndex: pageNumber * numberOfPages,
//   });

//   const selectAllRowsHandler = (filterData: any) => {
//     if (!isAllSelect) return;

//     const [...rest] = filterData;
//     const isAllSelected = rest.every((e: any) => e?.isSelected);

//     const updateList = rest.map((e: any) => {
//       e.isSelected = isAllSelected || e.isSelected;
//       return e;
//     });
//     setTableData(updateList);
//     selectHandler?.(updateList);
//   };

//   const dataPerPageManage = () => {
//     const startIndex = pageNumber * numberOfPages - numberOfPages;
//     const lastIndex = pageNumber * numberOfPages;

//     if (!data?.length) return;

//     setPageIndex({
//       startIndex,
//       lastIndex,
//     });
//     // const [...rest] = data;
//     // const updatedList = [...rest.slice(startIndex, lastIndex)];
//     // setTableData(updatedList);
//   };

//   const changeNumberOfPages = (e: any) => {
//     setNumberOfPages(e.target.value);
//     setPageNumber(1);
//   };

//   const previousHandler = () => setPageNumber(pageNumber - 1);
//   const nextHandler = () => setPageNumber(pageNumber + 1);

//   const onChangeFilterHandler = (e: any) => {
//     const value = e.target.value;
//     const name = e.target.name;
//     const { ...rest } = filter;
//     rest[name] = value;
//     setFilter(rest);

//     let filterData = data;
//     Object.keys(rest).forEach((e: any) => {
//       if (Object.values(rest).every((x) => !x)) return;

//       if (!rest[e]) return;

//       filterData = filterData.filter((a: any) =>
//         String(a[e].toLowerCase()).includes(String(rest[e].toLowerCase()))
//       );
//       return filterData;
//     });
//     setTableData(filterData);
//     selectAllRowsHandler(filterData);
//   };

//   const selectAllRows = (isAll: boolean) => {
//     setIsAllSelect(isAll);

//     const [...rest] = tableData;
//     // const isAllSelected = rest.every((e: any) => e?.isSelected);

//     const updateList = rest.map((e: any) => {
//       e.isSelected = isAll;
//       return e;
//     });

//     setTableData(updateList);
//     selectHandler?.(updateList.filter((e: any) => e?.isSelected));
//   };

//   const selectRowHandler = (index: number) => {
//     const [...rest] = tableData;
//     rest[index].isSelected = !rest[index]?.isSelected;
//     setTableData(rest);
//     setIsAllSelect(false);
//     selectHandler?.(rest.filter((e: any) => e?.isSelected));
//   };

//   const isBoolean = (value: string) =>
//     ["true", "false"].includes(value.toLowerCase()) ? `bool ${value}` : "";

//   const sorting = (col: ColumnDataModel) => {
//     const key: any =
//       (columns.length &&
//         columns.find((e: ColumnDataModel) => e.field === col.field)) ||
//       null;

//     const [...rest] = tableData;

//     const sortType = findSortOrder(rest.map((e: any) => e[key.field]));

//     const list: ColumnDataModel[] = rest.sort((a: any, b: any) =>
//       sortType === "ascending"
//         ? a[`${key.field}`] > b[`${key.field}`]
//           ? -1
//           : 1
//         : sortType === "descending"
//         ? a[`${key.field}`] < b[`${key.field}`]
//           ? -1
//           : 1
//         : a[`${key.field}`] < b[`${key.field}`]
//         ? -1
//         : 1
//     );

//     setTableData(list);
//   };

//   useEffect(() => {
//     dataPerPageManage();
//   }, [numberOfPages, pageNumber]);

//   useEffect(() => {
//     if (!isAllSelect) return;

//     (() => {
//       const [...rest] = tableData;
//       const updateList = rest.map((e: any) => {
//         e.isSelected = true;
//         return e;
//       });
//       setTableData(updateList);
//       selectHandler?.(updateList);
//     })();
//   }, [isAllSelect]);

//   return (
//     <div className="table_container">
//       <div className="table-content">
//         <table>
//           <thead>
//             <tr>
//               <div className="header">
//                 {indexing && (
//                   <th className="indexing">
//                     <h1>#</h1>
//                   </th>
//                 )}
//                 {isSelection && (
//                   <th className="selection">
//                     <input
//                       type="checkbox"
//                       name=""
//                       id=""
//                       checked={
//                         tableData?.length &&
//                         tableData?.every((e: any) => e.isSelected)
//                       }
//                       onChange={() => selectAllRows(!isAllSelect)}
//                     />
//                   </th>
//                 )}
//                 {columns?.length
//                   ? columns
//                       .filter((e) => e.title)
//                       .map((e: any, i: number) => (
//                         <th
//                           key={`table-head-${i}`}
//                           className={`head-${e?.title} header_name`}
//                         >
//                           <div className="header_name">
//                             <div className="table-column-title">{e?.title}</div>
//                             {e.isSort && (
//                               <i
//                                 className="fa-solid fa-sort"
//                                 onClick={() => sorting(e)}
//                               />
//                             )}
//                           </div>
//                         </th>
//                       ))
//                   : null}
//                 {isShowActionColumn && (
//                   <th key={`table-head-${data?.length}`}>
//                     <div className="table-column-title">Action</div>
//                   </th>
//                 )}
//               </div>
//             </tr>
//           </thead>
//           <tbody>
//             {/* <div className="rowBg"> */}
//             <tr>
//               <div className="rowBg">
//                 {indexing && (
//                   <td className="filter_indexing">
//                     <p>.</p>
//                   </td>
//                 )}
//                 {isSelection && <td className="selection"></td>}
//                 {isFilter && columns?.length
//                   ? columns.map((e: any, i: number) => (
//                       <td key={`table-filter-${i + 1}`}>
//                         {e.filtering ? (
//                           <div className="filter">
//                             <img src={filterImage} alt="f_image" />
//                             <input
//                               type="text"
//                               name={`${e.field}`}
//                               id={`${e.field}`}
//                               onChange={onChangeFilterHandler}
//                               dir="auto"
//                             />
//                           </div>
//                         ) : (
//                           <div className="no_data">
//                             <span>.</span>
//                           </div>
//                         )}
//                       </td>
//                     ))
//                   : null}
//               </div>
//             </tr>
//             {tableData?.length &&
//               tableData
//                 .filter(
//                   (e: any, i: number) =>
//                     i >= pageIndex.startIndex && i < pageIndex.lastIndex
//                 )
//                 .map((e: any, i: number) => (
//                   <tr key={`table-row-${i + 1}`}>
//                     <div className="rowBg">
//                       {indexing && (
//                         <td className="indexing">
//                           <h1>
//                             {numberOfPages * pageNumber -
//                               (numberOfPages - i) +
//                               1}
//                           </h1>
//                         </td>
//                       )}
//                       {isSelection && (
//                         <td className="selection">
//                           <input
//                             type="checkbox"
//                             checked={e?.isSelected}
//                             onChange={() =>
//                               selectRowHandler(i + pageIndex.startIndex)
//                             }
//                             id={`row-select-${i}`}
//                           />
//                         </td>
//                       )}
//                       {columns?.length
//                         ? columns.map((x: any, j: number) => (
//                             <>
//                               <td key={`table-row-data-${i + 1}`}>
//                                 {x?.component ? (
//                                   x.component(e)
//                                 ) : (
//                                   <div
//                                     className="table-row-data"
//                                     dir="auto"
//                                     title={
//                                       tableData[i + pageIndex.startIndex][
//                                         x?.field
//                                       ] || ""
//                                     }
//                                   >
//                                     <span
//                                       className={isBoolean(
//                                         String(
//                                           tableData[i + pageIndex.startIndex][
//                                             x?.field
//                                           ]
//                                         )
//                                       )}
//                                     >
//                                       {tableData[i + pageIndex.startIndex][
//                                         x?.field
//                                       ] || ""}
//                                     </span>
//                                   </div>
//                                 )}
//                               </td>
//                             </>
//                           ))
//                         : null}
//                     </div>
//                   </tr>
//                 ))}
//             {/* </div> */}
//           </tbody>
//         </table>
//       </div>
//       {isShowFooter && (
//         <div className="footer">
//           <button onClick={previousHandler} disabled={pageNumber === 1}>
//             Previous
//           </button>
//           <p>
//             Showing
//             <span>{pageNumber * numberOfPages - numberOfPages + 1}</span>-
//             <span>
//               {pageNumber * numberOfPages < data?.length
//                 ? pageNumber * numberOfPages
//                 : data?.length}
//             </span>
//             of
//             <span>{data?.length}</span>
//             <select
//               value={numberOfPages}
//               name=""
//               id=""
//               onChange={changeNumberOfPages}
//             >
//               {rowsPerPage?.length ? (
//                 <>
//                   {rowsPerPage.map((e) => (
//                     <option value={e}>{e}</option>
//                   ))}
//                 </>
//               ) : (
//                 <>
//                   <option value="5">5</option>
//                   <option value="10">10</option>
//                   <option value="20">20</option>
//                 </>
//               )}
//             </select>
//           </p>
//           <button
//             onClick={nextHandler}
//             disabled={pageNumber * numberOfPages < data?.length ? false : true}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TableContainer;

import React from "react";

type Props = {};

const TableContainer = (props: Props) => {
  return <div>TableContainer</div>;
};

export default TableContainer;
