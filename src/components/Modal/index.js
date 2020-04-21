import React, { memo } from 'react';
import {
  Input,
  Modal,
  Form,
  Select,
  Switch,
  InputNumber,
  Upload,
  Button,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { closeModal } from '@actions';
import { useDispatch, useSelector } from 'react-redux';
import { type } from 'ramda';
const { Option } = Select;
const uploadURL = 'http://localhost:3000/api/v1/upload';

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
    offset: 2,
  },
  style: { marginBottom: '10px' },
};

export const CustomModal = memo(
  ({
    item,
    onOk,
    title,
    i18n,
    modalFields,
    modalInitialValues,
    ...modalProps
  }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { modalType, isModal } = useSelector((state) => state.modal);

    const fileOnChange = (file) => {
      console.log(file);
    };

    return (
      <Modal
        {...modalProps}
        visible={isModal}
        onCancel={() => dispatch(closeModal())}
        title={`${i18n._(modalType)}`}
        destroyOnClose={true}
        maskClosable={false}
        centered={true}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onOk(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          layout="horizontal"
          form={form}
          initialValues={modalInitialValues}
        >
          {modalFields.map((item) => {
            if (item.switch) {
              return (
                <Form.Item
                  name={item.name}
                  label={item.label}
                  {...formItemLayout}
                  key={item.id}
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              );
            }
            if (item.upload) {
              return (
                <Form.Item
                  name={item.name}
                  label={item.label}
                  {...formItemLayout}
                  key={item.id}
                >
                  <Upload
                    fileList={false}
                    multiple={false}
                    action={uploadURL}
                    onChange={fileOnChange}
                  >
                    <Button>
                      <UploadOutlined /> Upload
                    </Button>
                  </Upload>
                </Form.Item>
              );
            }
            return (
              <Form.Item
                name={item.name}
                label={item.label}
                {...formItemLayout}
                key={item.id}
                rules={item.rules}
              >
                {item.options ? (
                  <Select placeholder={i18n.t`Select a option`}>
                    {item.options.map((option, i) => {
                      const isObj = type(option) === 'Object';
                      return (
                        <Option key={i} value={isObj ? option._id : option}>
                          {isObj ? option.title : option}
                        </Option>
                      );
                    })}
                  </Select>
                ) : item.textArea ? (
                  <Input.TextArea autoSize={true} />
                ) : item.inputNumber ? (
                  <InputNumber disabled />
                ) : (
                  <Input
                    disabled={item.disable}
                    placeholder={item.placeholder}
                  />
                )}
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    );
  }
);
