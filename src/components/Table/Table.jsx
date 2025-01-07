import _ from "lodash";
import { useState } from "react";

import deleteIcon from "../../assets/icons/delete.svg";
import { deleteProduct } from "@/Api/product";
import { useDispatch } from "react-redux";
import { EditProduct } from "../EditProduct/EditProduct";
import { ViewProduct } from "../ViewProduct/ViewProduct";

function Table({ product = [] }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full">
      {isLoading && "deleting..."}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative">
          <thead className="text-xs border-b uppercase bg-appBg-dark text-appColor-light">
            <tr>
              <th scope="col" className="px-6 py-3">
                S/No
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                SKU
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Inventory
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total Value
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          {/* Product rows */}
          <tbody>
            {product &&
              product?.map((item, index) => (
                <tr
                  className="bg-appBg-dark border-b border-appBg-semilight hover:bg-appBg-light"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-appColor-light whitespace-nowrap dark:text-appColor-dark"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{item?.brand}</td>
                  <td className="px-6 py-4">{item?.sku}</td>
                  <td className="px-6 py-4">{item?.category}</td>
                  <td className="px-6 py-4">{item?.inventory}</td>
                  <td className="px-6 py-4">₹{item?.price}</td>
                  <td className="px-6 py-4">
                    ₹{item?.price * item?.inventory}
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    <ViewProduct id={item._id} />
                    <EditProduct id={item._id} />

                    <img
                      onClick={() => {
                        deleteProduct(item?._id, dispatch, setIsLoading);
                      }}
                      src={deleteIcon}
                      className={"w-4 h-4 cursor-pointer text-white "}
                      alt="Delete"
                    />
                  </td>
                </tr>
              ))}
            {_.isEmpty(product) && (
              <tr>
                <td colSpan="8" className="text-center">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
