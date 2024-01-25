import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import React from "react";
import { IProduct } from "../../interfaces/IRouter";
import { addListProduct, deleteProduct, getProductsByAccount, updateProduct } from "../../api/product";
import { IStateRedux } from "../../redux";
import { useSelector } from "react-redux";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { removeUnnecessaryWhiteSpace } from "../../ultis";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: IProduct;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const SettingCollection: React.FC = () => {
  const [form] = Form.useForm();
  const [listProduct, setListProduct] = React.useState<IProduct[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [editingKey, setEditingKey] = React.useState<string>('');

  const { account } = useSelector((state: { item: IStateRedux }) => state.item);

  const isEditing = (record: IProduct) => record._id === editingKey;

  const fetch = React.useCallback(async () => {
    setLoading(true)
    const result = await getProductsByAccount(account?.wallet ?? '');
    setListProduct(result ?? []);
    setLoading(false)
  }, [account?.wallet])

  React.useEffect(() => {
    fetch()
  }, [fetch])

  const edit = (record: IProduct) => {
    form.setFieldsValue({ name: '', ...record });
    setEditingKey(record._id ?? "");
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IProduct;
      console.log(editingKey, row)
      const newData = [...listProduct];
      const index = newData.findIndex((item) => key === item._id);
      if (index > -1) {
        setLoading(true)
        await updateProduct(editingKey, { name: removeUnnecessaryWhiteSpace(row.name) })
        fetch();
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const handleDelete = async (id: string) => {
    setLoading(true)
    const result = await deleteProduct(id ?? '')
    if (result.data) {
      fetch()
    }
  }

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      width: '50%',
      editable: true,
    },
    {
      title: 'Sửa',
      dataIndex: 'edit',
      width: '25%',
      render: (_: any, record: IProduct) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record._id ?? "")} style={{ marginRight: 8 }}>
              Lưu
            </Typography.Link>
            <Popconfirm title="Hủy thay đổi" cancelText="" onConfirm={cancel}>
              <a>Hủy</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} title={`Xóa sản phẩm ${record.name}`} onClick={() => edit(record)}>
            Sửa
          </Typography.Link>
        );
      },
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      width: '25%',
      render: (_: any, record: IProduct) => {
        return <Typography.Link disabled={editingKey !== ''} title={`Xóa sản phẩm ${record.name}`} onClick={() => handleDelete(record._id ?? "")}>
          Xóa
        </Typography.Link>
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IProduct) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const onFinish = async (values: any) => {
    if (values.names.length > 0) {
      const result: IProduct[] = []
      values.names.map((item: string) => {
        const product = {
          name: removeUnnecessaryWhiteSpace(item),
          account: account?.wallet
        } as IProduct
        result.push(product)
      })
      setLoading(true)
      await addListProduct(result)
    }
    form.resetFields();
    fetch();
  };

  const renderListItem = () => (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        loading={loading}
        dataSource={loading ? [] : listProduct}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  )
  const renderForm = () => (
    <Form
      name="dynamic_form_item"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.List
        name="names"
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, _index) => (
              <Form.Item
                label='Sản phẩm mới'
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Vui lòng nhập giá trị khác rỗng",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="Nhập tên sản phẩm" style={{ width: '60%' }} />
                </Form.Item>
                <MinusCircleOutlined
                  className="dynamic-delete-button ml-[10px]"
                  onClick={() => remove(field.name)}
                />
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
                icon={<PlusOutlined />}
              >
                Thêm sản phẩm
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm vào danh sách
        </Button>
      </Form.Item>
    </Form>
  )
  return <>
    {renderListItem()}
    {renderForm()}
  </>
};

export default React.memo(SettingCollection);
