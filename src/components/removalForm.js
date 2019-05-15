import React, { Component } from 'react';
import {
  Form, Input, Select, Button,
} from 'antd';

import PropTypes from 'prop-types';

const FormItem = Form.Item;
const { Option } = Select;

const reasons = [
  {
    value: '3 Price Strikes',
    label: '3 Price Strikes',
  },
  {
    value: 'Outsider Selling products',
    label: 'Outsider Selling products',
  },
  {
    value: 'Outsider Posting Random Things',
    label: 'Outsider Posting Random Things',
  },
];

class RemovalForm extends Component {
  state = {
    confirmDirty: false,
  };

  componentDidMount() {
    const { facebookLink, form } = this.props;
    form.setFieldsValue({
      facebook: facebookLink,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err) => {
      if (!err) {
        const { addRemoval } = this.props;
        addRemoval();
      }
    });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  //   saveFormRef = (formRef) => {
  //     this.formRef = formRef;
  //   };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const { changeName, changeReason } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 14,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Name " hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your name.',
              },
            ],
          })(<Input onChange={changeName} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Facebook " hasFeedback>
          {getFieldDecorator('facebook', {
            rules: [
              {
                required: true,
                message: 'Please input your facebook link.',
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Reason">
          {getFieldDecorator('reasons', {
            rules: [{ type: 'string', required: true, message: 'Please select a reason!' }],
          })(
            <Select onChange={changeReason}>
              {reasons.map(reason => (
                <Option value={reason.value}>{reason.label}</Option>
              ))}
            </Select>,
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Add Removal
          </Button>
        </FormItem>
      </Form>
    );
  }
}

RemovalForm.defaultProps = {
  facebookLink: '',
  setFieldsValue: () => {},
  addRemoval: () => {},
  changeName: () => {},
  changeReason: () => {},
  form: {},
};

RemovalForm.propTypes = {
  facebookLink: PropTypes.string,
  setFieldsValue: PropTypes.func,
  addRemoval: PropTypes.func,
  changeName: PropTypes.func,
  changeReason: PropTypes.func,
  form: PropTypes.shape,
};

const RemovalFormComponent = Form.create()(RemovalForm);

export default RemovalFormComponent;
