import React, { useState } from "react";

import useTable from "../../../hooks/useTable.js";
import "../table.css";
import TableFooter from "../TableFooter";


const printMediaUrls = (data) =>{
   if(data.media_urls!==undefined){
      return(
        data.media_urls.map(item=>(<ol><li><p><a href={item} target="_blank" className="">{item}</a></p></li></ol>))
        )
    }else{
       return("")
   }
}

const printImageToText = (data) =>{
   if(data.image_to_text!==undefined){
       return(
        data.image_to_text.image_captioning.map(item=>(<ol><li><p><a target="_blank" className="">{item}</a></p></li></ol>))
       )
       
   }else{
       return("")
   }
}

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  
  
  return (
    <>
      <table className="table" id="tabella">
        <thead className="tableRowHeader">
          <tr>
            <th className="tableHeader">Username</th>
            <th className="tableHeader">Image</th>
            <th className="tableHeader">Caption</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((data) => (
            <tr className="tableRowItems" >
              <td className="tableCell">{data.author_username}</td>
              <td className="tableCell">{printMediaUrls(data)} </td>
              <td className="tableCell">{printImageToText(data)} </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;