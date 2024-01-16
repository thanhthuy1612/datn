import { LoadingOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Spin } from "antd";
import React from "react";
import { IProduct } from "../../interfaces/IRouter";
import { addListProduct, deleteProduct, getProductsByAccount, updateProduct } from "../../api/product";
import { IStateRedux } from "../../redux";
import { useSelector } from "react-redux";
import { CiPen, CiTrash } from "react-icons/ci";
import { removeUnnecessaryWhiteSpace } from "../../ultis";

const SettingCollection: React.FC = () => {
  const [listProduct, setListProduct] = React.useState<IProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [input, setInput] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);
  const [itemEdit, setItemEdit] = React.useState<IProduct>();

  const { account } = useSelector((state: { item: IStateRedux }) => state.item);
  const [form] = Form.useForm();

  const fetch = React.useCallback(async () => {
    setLoading(true)
    const result = await getProductsByAccount(account?.wallet ?? '');
    setListProduct(result ?? []);
    setLoading(false)
  }, [account?.wallet])

  React.useEffect(() => {
    fetch()
  }, [fetch])

  const handleEdit = async () => {
    setLoading(true)
    await updateProduct(itemEdit?._id ?? "", { name: removeUnnecessaryWhiteSpace(input), account: itemEdit?.account })
    fetch();
    setInput('');
    setIsModalOpen(false);
    setItemEdit(undefined);
  };

  const handleCancel = () => {
    setInput('');
    setIsModalOpen(false);
    setItemEdit(undefined);
  };

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

  const handleClickEdit = (item: IProduct) => () => {
    setItemEdit(item);
    setInput(item?.name ?? '')
    setIsModalOpen(true);
  }

  const handleClickDelete = (item: IProduct) => async () => {
    setLoading(true)
    const result = await deleteProduct(item._id ?? '')
    if (result.data) {
      fetch()
    }
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;
  const renderloading = () => (
    <div className="w-[100%] flex justify-center items-center p-[30px]">
      <Spin indicator={antIcon} />
    </div>
  );

  const renderListItem = () => (
    <div className="pb-[20px]">
      <p className="w-[200px] text-[20px] pb-[10px]">Sản phẩm của bạn</p>
      {loading ? <div className="w-[360px]">{renderloading()}</div> : <>{
        listProduct.length === 0 ?
          <p className="italic">Tài khoản không có sản phẩm</p> : listProduct.map(item => (
            <div key={item._id} className="flex my-[5px]">
              <p className="w-[200px]">{item.name}</p>
              <button onClick={handleClickEdit(item)} className="border-border border-[1px] p-[5px] rounded-[10px] shadow-md mr-[10px] hover:bg-hover"><CiPen /></button>
              <button onClick={handleClickDelete(item)} className="border-border border-[1px] p-[5px] rounded-[10px] shadow-md hover:bg-hover"><CiTrash /></button>
            </div>
          ))
      }
        <Modal title="Chỉnh sửa" open={isModalOpen} onOk={handleEdit} onCancel={handleCancel}>
          <div className="my-[30px]">
            <p className="mb-[5px]">Nhập tên sản phẩm thay đổi:</p>
            <Input placeholder={itemEdit?.name ?? ''} defaultValue={itemEdit?.name ?? ''} value={input} onChange={(e) => {
              setInput(e?.target.value)
            }} />
          </div>
        </Modal></>}
    </div>
  )
  const renderForm = () => (
    <Form
      name="dynamic_form_item"
      onFinish={onFinish}
      autoComplete="off"
      style={{ maxWidth: 600 }}
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
          Thêm
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
