import { Table, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DateFormatType, IHistory } from "../../interfaces/IRouter";
import Tippy from "@tippyjs/react/headless";
import React from "react";
import { dateFormat } from "../../ultis";

const TableList: React.FC<{ data: IHistory[]; loading: boolean }> = ({
  data,
  loading,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = async (placement: any, items: any) => {
    await navigator.clipboard.writeText(items);
    api.success({
      message: `COPY SUCCESS`,
      description: items,
      placement,
    });
  };

  const columns: ColumnsType<IHistory> = [
    {
      title: "Txn Hash",
      dataIndex: "hash",
      key: "hash",
      render: (text) => (
        <a className="hash" href={`https://testnet.bscscan.com/tx/${text}`}>
          {text.substring(0, 6)}...
          {text.substring(55)}
        </a>
      ),
    },
    {
      title: "Block",
      dataIndex: "blockNumber",
      key: "blockNumber",
    },
    {
      title: "Time",
      dataIndex: "timeStamp",
      key: "timeStamp",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        parseInt(a.timeStamp ?? "0") - parseInt(b.timeStamp ?? "0"),
      render: (time) => (
        <p>
          {dateFormat(new Date(parseInt(time) * 1000), DateFormatType.FullDate)}
        </p>
      ),
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (from) => (
        <Tippy
          interactive
          render={(attrs) => (
            <div
              className="border-border border-[1px] px-[20px] py-[5px] bg-white shadow-md rounded-[10px]"
              tabIndex={-1}
              {...attrs}>
              {from}
            </div>
          )}>
          <button
            className="cursor-pointer"
            onClick={() => openNotification("topRight", from)}>
            {from.substring(0, 6)}...
            {from.substring(38)}
          </button>
        </Tippy>
      ),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (to) => (
        <Tippy
          interactive={true}
          render={(attrs) => (
            <div
              className="border-border border-[1px] px-[20px] py-[5px] bg-white shadow-md rounded-[10px]"
              tabIndex={-1}
              {...attrs}>
              {to}
            </div>
          )}>
          <button
            className="cursor-pointer"
            onClick={() => openNotification("topRight", to)}>
            {to.substring(0, 6)}...
            {to.substring(38)}
          </button>
        </Tippy>
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) => <p>{parseInt(value) / 1000000000000000000} BNB</p>,
    },
    {
      title: "[Txn Fee]",
      dataIndex: "gasPrice",
      key: "gasPrice",
      render: (gasPrice) => <p>{parseInt(gasPrice) / 1000000000} Gwei</p>,
    },
    {
      title: "Success",
      dataIndex: "isError",
      key: "isError",
      render: (error) => (
        <>
          {parseInt(error) === 0 ? (
            <div className="border-border w-[80px] border-[1px] flex justify-center py-[5px] rounded-[10px] bg-green-50">
              Success
            </div>
          ) : (
            <div className="border-border w-[80px] border-[1px] flex justify-center py-[5px] rounded-[10px] bg-red-50">
              Error
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 8,
        }}
        style={{ width: "100%" }}
        loading={loading}
      />
    </>
  );
};

export default TableList;
