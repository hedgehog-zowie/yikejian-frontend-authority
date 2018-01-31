import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form, Row, Col, InputNumber, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './StoreProfile.less';

const FormItem = Form.Item;

const tabListNoTitle = [{
  key: '01',
  tab: '小睡',
}, {
  key: '02',
  tab: '按摩',
}];
const subTabListNoTitle = [{
  key: '20180101',
  tab: '20180101',
}, {
  key: '20180102',
  tab: '20180102',
}, {
  key: '20180103',
  tab: '20180103',
}, {
  key: '20180104',
  tab: '20180104',
}, {
  key: '20180105',
  tab: '20180105',
}];
const contentListNoTitle = {
  '01-20180101': <p>01-20180101 content</p>,
  '01-20180102': <p>01-20180102 content</p>,
  '01-20180103': <p>01-20180103 content</p>,
  '01-20180104': <p>01-20180104 content</p>,
  '01-20180105': <p>01-20180105 content</p>,
  '02-20180101': <p>02-20180101 content</p>,
  '02-20180102': <p>02-20180102 content</p>,
  '02-20180103': <p>02-20180103 content</p>,
  '02-20180104': <p>02-20180104 content</p>,
  '02-20180105': <p>02-20180105 content</p>,
};

@connect(state => ({
  store: state.store,
}))
class StoreProfile extends Component {
  state = {
    key: '01',
    subKey: '',
    disabled: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'store/fetchStore',
      type: 'store/fetchProduct',
      type: 'store/fetchDevice',
    });
  }

  onTabChange(key) {
    this.setState({ key: key });
  }

  onSubTabChange(subKey) {
    this.setState({ subKey: subKey });
  }

  // To generate mock Form.Item
  getFields() {
    const count = 100;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={4} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <FormItem label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              initialValue: i,
            })(
              <InputNumber min={0} max={4} disabled={this.state.disabled} placeholder="可预约次数" />
            )}
          </FormItem>
        </Col>
      );
    }
    return children;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { store: { devicesData, fetchDeviceLoading } } = this.props;
    return (
      <PageHeaderLayout title="预约管理">
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          onTabChange={(key) => this.onTabChange(key)}
        >
          <Card
            style={{ width: '100%' }}
            tabList={subTabListNoTitle}
            onTabChange={(key) => this.onSubTabChange(key)}
          >
            {contentListNoTitle[this.state.key + '-'+ this.state.subKey]}
            <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
              <Row gutter={8}>{this.getFields()}</Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit">提交</Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    重置
                  </Button>
          </Col>
        </Row>
            </Form>
          </Card>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default connect(state => ({
  collapsed: state.global.collapsed,
  submitting: state.store.submitting,
}))(Form.create()(StoreProfile));
