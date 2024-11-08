import { TableProps, Table as AntdTable, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { DataType } from "./types";
import { getList } from "@/api/table";
import { FieldTimeOutlined } from "@ant-design/icons";

const Table:FC = () => {

  const [data, setData] = useState<DataType[]>();

  const columns:TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author"
    },
    {
      title: "Pageviews",
      dataIndex: "pageviews",
      key: "pageviews",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_,{status}) => {
        let color = "grey";

        switch(status) {
          case "published":
            color = "success"; break;
          case "draft":
            color = "gray"; break;
          case "deleted":
            color = "red"; break;
        }

        return (
          <Tag color={color}>{status.toUpperCase()}</Tag>
        )
      }
    },
    {
      title: "Display_time",
      dataIndex: "display_time",
      key: "display_time",
      render: (text) => {
        return (
          <>
            <FieldTimeOutlined />{text}
          </>
        )
      }
    }
  ];

  useEffect(() => {
    getList().then(response => {
      setData(response.data.items);
    });
  }, []);

  console.log("Tabel List", data);

  return (
    <div className="app-container">
      <AntdTable columns={columns} dataSource={data} rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  )
}

export default Table;