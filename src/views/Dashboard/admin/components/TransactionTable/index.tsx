import { transactionList } from "@/api/remote-search";
import { Statistic, Table, TableProps } from "antd";
import { FC, useEffect, useState } from "react";

interface DataType {
  order_no:string;
  price: number;
  status:string;
}

const columns:TableProps<DataType>["columns"] = [
  {
    title: "Order_No",
    dataIndex: "order_no",
    key: "order_no",
    minWidth: 200
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 195,
    align: "center",
    render: (text) => <Statistic prefix="￥" value={text} valueStyle={{
      fontSize: "14px"
    }}/>
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
    align: "center"
  }
]

const TransactionTable:FC = () => {

  const [list, setList] = useState<DataType[]>();
  console.log("Table List:", list);

  useEffect(() => {
    transactionList().then(response => {
      setList(response.data.items.slice(0, 8));
    });
  }, [])

  return (
    <Table<DataType>
      tableLayout="auto"
      columns={columns}
      dataSource={list}
      pagination={{hideOnSinglePage:true}}
    />
  )
}

export default TransactionTable;